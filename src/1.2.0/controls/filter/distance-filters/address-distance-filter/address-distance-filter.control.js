import BaseDistanceFilterControlsGroup from '../../../base/groups/filter/base-distance-filter-controls-group';
import BaseDistanceFilterControl from '../../../base/controls/filter/base-distance-filter.control';

/**
 * address distance filter control
 */
class AddressDistanceFilterControl extends BaseDistanceFilterControlsGroup{

    /**
     * constructor
     * @param {string} group
     * @param {string} name
     * @param {Array.<BaseControl>=} controls
     * @param {Map|null=} deepLinkParams - structure: [groupName, [{key, value}, ...]], ...
     */
    constructor(group, name, controls = [], deepLinkParams = null){
        super(group, name, controls, deepLinkParams);
        
        this.geocodeApiKey = '';
        this.debounceTimeout = null;
        this.debounceDelay = 500; // 500ms debounce delay
    }

    /**
     * add control to the group
     * @param {BaseControl} control
     * @return {BaseDistanceFilterControl|null}
     */
    addControl(control){

        if(control.name !== this.name || control.group !== this.group){
            return null;
        }

        // Create a new BaseDistanceFilterControl
        const baseDistanceFilterControl = new BaseDistanceFilterControl(control.element);

        // Get API key from data-api-key attribute
        this.geocodeApiKey = control.element.getAttribute('data-api-key') || '';

        // Find the address input element
        baseDistanceFilterControl.addressInput = control.element.querySelector('[data-type="address-input"]');
        
        // Find the loading indicator
        baseDistanceFilterControl.loadingIndicator = control.element.querySelector('.loading-indicator');

        // Add event listener for address input changes
        if(baseDistanceFilterControl.addressInput){
            baseDistanceFilterControl.addressInput.addEventListener('input', this.onAddressInputChange.bind(this, baseDistanceFilterControl));
        }

        // Add the control to the group
        this.controls.push(baseDistanceFilterControl);

        return baseDistanceFilterControl;
    }

    /**
     * handle address input change
     * @param {BaseDistanceFilterControl} control
     * @param {Event} e
     */
    onAddressInputChange(control, e){
        const address = e.target.value.trim();
        
        // Clear any existing timeout
        if(this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        
        if(address){
            // Set a new timeout for debouncing
            this.debounceTimeout = setTimeout(() => {
                this.geocodeAddress(address, control);
            }, this.debounceDelay);
        }
        else{
            // Clear coordinates if address is empty
            for(let ctrl of this.controls){
                ctrl.userLat = null;
                ctrl.userLng = null;
                ctrl.userAddress = '';
            }
            
            // Hide all distance display elements
            this.hideDistanceDisplayElements();
            
            // Refresh the content
            if(window.jplist){
                window.jplist.refresh(this.group, control);
            }
        }
    }

    /**
     * hide all distance display elements
     */
    hideDistanceDisplayElements(){
        for(let control of this.controls){
            const distanceDisplayPath = control.element.getAttribute('data-distance-display');
            if(distanceDisplayPath){
                const items = document.querySelectorAll(`[data-jplist-group="${this.group}"] [data-jplist-item]`);
                for(let item of items){
                    const displayElements = item.querySelectorAll(distanceDisplayPath);
                    for(let displayEl of displayElements){
                        displayEl.textContent = '';
                        displayEl.style.display = 'none';
                    }
                }
            }
        }
    }

    /**
     * geocode address to coordinates
     * @param {string} address
     * @param {BaseDistanceFilterControl} control
     */
    geocodeAddress(address, control){
        if(!address || !this.geocodeApiKey) return;
        
        // Show loading indicator
        if(control.loadingIndicator) {
            control.loadingIndicator.style.display = 'block';
        }
        
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.geocodeApiKey}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Hide loading indicator
                if(control.loadingIndicator) {
                    control.loadingIndicator.style.display = 'none';
                }
                
                if(data.status === 'OK' && data.results && data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    
                    // Update all controls in the group with the new coordinates
                    for(let ctrl of this.controls){
                        ctrl.userLat = location.lat;
                        ctrl.userLng = location.lng;
                        ctrl.userAddress = address;
                    }
                    
                    // Refresh the content
                    if(window.jplist){
                        window.jplist.refresh(this.group, control);
                    }
                } else {
                    // Handle geocoding error silently
                }
            })
            .catch(() => {
                // Hide loading indicator
                if(control.loadingIndicator) {
                    control.loadingIndicator.style.display = 'none';
                }
                // Handle fetch error silently
            });
    }

    /**
     * restore control state from the deep link value
     * @param {BaseDistanceFilterControl} control
     */
    restoreFromDeepLink(control) {
        if(control.id) {
            const deepLinkParam = this.deepLinkParams.find(param => param.key === control.id);
            
            if(deepLinkParam) {
                const address = decodeURIComponent(deepLinkParam.value);
                
                if(control.addressInput) {
                    control.addressInput.value = address;
                }
                
                this.geocodeAddress(address, control);
            }
        }
    }

    /**
     * get distance filter options from all controls in the group
     * @return {Array.<object>} distance filter options
     */
    getDistanceFilterOptions(){
        let options = [];
        
        for(let control of this.controls){
            // Only add options if we have valid coordinates
            if(control.userLat && control.userLng){
                const latPath = control.element.getAttribute('data-lat-path');
                const lngPath = control.element.getAttribute('data-lng-path');
                const latAttr = control.element.getAttribute('data-lat-attr');
                const lngAttr = control.element.getAttribute('data-lng-attr');
                const distanceDisplayPath = control.element.getAttribute('data-distance-display');
                
                if(latPath && lngPath && latAttr && lngAttr){
                    options.push({
                        latPath: latPath,
                        lngPath: lngPath,
                        latAttr: latAttr,
                        lngAttr: lngAttr,
                        userLat: control.userLat,
                        userLng: control.userLng,
                        distanceDisplayPath: distanceDisplayPath
                    });
                }
            }
        }
        
        return options;
    }
}

export default AddressDistanceFilterControl;
