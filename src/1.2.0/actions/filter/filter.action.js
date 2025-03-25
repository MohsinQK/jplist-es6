/**
 * filter action
 */
class FilterAction{

    /**
     * text filter
     * this filter returns all items that contains the specified text in the given path
     * @param {Array.<HTMLElement>} items
     * @param {string} text
     * @param {string=} path - any CSS selector or empty value meaning the whole element
     * @param {string=} mode - contains (default), startsWith, endsWith, equal
     * @param {string=} ignoreRegex - optional regex that defines what characters should be ignored
     * @return {Array.<HTMLElement>} filtered items
     */
    static textFilter(items, text, path='', mode = 'contains', ignoreRegex = ''){

        const filtered = [];

        if(!items) return [];

        if(path === 'default') return items;

        const formattedText = text.replace(new RegExp(ignoreRegex, 'ig'), '').toLowerCase().trim();

        for(let item of items){

            const elements = path ? item.querySelectorAll(path) : [item];

            if(!elements) continue;

            let shouldBeAdded = false;

            for(let el of elements){

                const elText = el.textContent.replace(new RegExp(ignoreRegex, 'ig'), '').toLowerCase().trim();

                switch(mode){

                    case 'startsWith':{

                        if(elText.startsWith(formattedText)){
                            shouldBeAdded = true;
                        }

                        break;
                    }

                    case 'endsWith':{

                        if(elText.endsWith(formattedText)){
                            shouldBeAdded = true;
                        }

                        break;
                    }

                    case 'equal':{

                        if(elText === formattedText){
                            shouldBeAdded = true;
                        }
                        break;
                    }

                    default:{

                        //contains
                        if(elText.indexOf(formattedText) !== -1){
                            shouldBeAdded = true;
                        }

                        break;
                    }
                }

                if(shouldBeAdded) break;
            }

            if(shouldBeAdded){
                filtered.push(item);
            }
        }

        return filtered;
    }

    /**
     * path filter
     * only items with the given path are returned
     * @param {Array.<HTMLElement>} items
     * @param {string=} path - any CSS selector or empty value meaning the whole element
     * @param {boolean} isInverted - if true, return all items that DON'T contain the specified path
     * @return {Array.<HTMLElement>} filtered items
     */
    static pathFilter(items, path='', isInverted = false){

        const filtered = [];

        if(!items) return [];

        if(path === 'default' || !path) return items;

        for(let item of items){

            const el = item.querySelector(path);

            if(el && !isInverted || !el && isInverted){
                filtered.push(item);
            }
        }

        return filtered;
    }

    /**
     * check if n is a number
     * @param {*} n
     * @returns {boolean}
     */
    static isNumeric(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * range filter
     * return only elements that satisfy the following condition:
     * all numbers in the element's content are in the following range: min <= from <= (all numbers in the element) <= to <= max
     * @param {Array.<HTMLElement>} items
     * @param {string=} path - any CSS selector or empty value meaning the whole element
     * @param {number} from
     * @param {number} to
     * @param {number=} min
     * @param {number=} max
     * @return {Array.<HTMLElement>} filtered items
     */
    static rangeFilter(items, path='', from, to, min = from, max = to){

        const filtered = [];

        if(!items) return [];

        if(path === 'default') return items;

        from = Math.max(from, min);
        to = Math.min(to, max);

        for(let item of items){

            const itemElements = path ? item.querySelectorAll(path) : [item];

            if(!itemElements) continue;

            //find all numbers within the element
            const numbers = [];

            for(let el of itemElements){

                const num = Number(el.textContent.trim().replace(/[^-0-9.]+/g,''));

                if(!isNaN(num)){
                    numbers.push(num);
                }
            }

            if(numbers.length > 0){

                //find max and min number of all found within the element numbers
                const maxNumber = Math.max.apply(Math, numbers);
                const minNumber = Math.min.apply(Math, numbers);

                let shouldBeAdded = true;

                if(FilterAction.isNumeric(from) && from > minNumber){
                    shouldBeAdded = false;
                }

                if(FilterAction.isNumeric(to) && maxNumber > to){
                    shouldBeAdded = false;
                }

                if(shouldBeAdded){
                    filtered.push(item);
                }
            }
        }

        return filtered;
    }

    /**
     * calculate distance between two points using Haversine formula
     * @param {number} lat1 - latitude of point 1
     * @param {number} lng1 - longitude of point 1
     * @param {number} lat2 - latitude of point 2
     * @param {number} lng2 - longitude of point 2
     * @return {number} distance in kilometers
     */
    static calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        return distance;
    }

    /**
     * format distance for display
     * @param {number} distance - distance in kilometers
     * @return {string} formatted distance
     */
    static formatDistance(distance) {
        if (distance < 1) {
            // Convert to meters if less than 1 km
            return Math.round(distance * 1000) + ' m';
        } else {
            // Display in km with no decimal places
            return Math.round(distance) + ' km';
        }
    }

    /**
     * distance filter
     * filter and sort items based on distance from user's location
     * @param {Array.<HTMLElement>} items
     * @param {string} latPath - CSS selector for elements containing latitude attribute
     * @param {string} lngPath - CSS selector for elements containing longitude attribute
     * @param {string} latAttr - attribute name that contains latitude value
     * @param {string} lngAttr - attribute name that contains longitude value
     * @param {number|null} maxDistance - maximum distance in kilometers (optional)
     * @param {number|null} userLat - user's latitude
     * @param {number|null} userLng - user's longitude
     * @param {string} distanceDisplayPath - CSS selector for element where distance will be displayed
     * @return {Array.<HTMLElement>} filtered and sorted items
     */
    static distanceFilter(items, latPath, lngPath, latAttr, lngAttr, maxDistance, userLat, userLng, distanceDisplayPath) {
        if (!items || !userLat || !userLng) return items;

        // Array to store items with their distances
        const itemsWithDistance = [];

        for (let item of items) {
            // Get elements containing lat/lng attributes
            const latElements = latPath ? item.querySelectorAll(latPath) : [item];
            const lngElements = lngPath ? item.querySelectorAll(lngPath) : [item];

            if (!latElements.length || !lngElements.length) continue;

            // Get lat/lng values from attributes
            const lat = parseFloat(latElements[0].getAttribute(latAttr));
            const lng = parseFloat(lngElements[0].getAttribute(lngAttr));

            if (isNaN(lat) || isNaN(lng)) continue;

            // Calculate distance
            const distance = FilterAction.calculateDistance(userLat, userLng, lat, lng);

            // Skip items beyond max distance if specified
            if (maxDistance !== null && distance > maxDistance) continue;

            // Store formatted distance on the item for display
            item.distance = distance;
            item.formattedDistance = FilterAction.formatDistance(distance);

            // Update distance display element if specified
            if (distanceDisplayPath) {
                const displayElements = item.querySelectorAll(distanceDisplayPath);
                for (let displayEl of displayElements) {
                    displayEl.textContent = item.formattedDistance;
                    displayEl.style.display = 'inline-block'; // Show the element
                }
            }

            itemsWithDistance.push({
                item: item,
                distance: distance
            });
        }

        // Sort by distance (ascending)
        itemsWithDistance.sort((a, b) => a.distance - b.distance);

        // Return sorted items
        return itemsWithDistance.map(itemObj => itemObj.item);
    }
}

export default FilterAction;