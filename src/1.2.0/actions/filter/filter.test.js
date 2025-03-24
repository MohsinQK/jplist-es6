import FilterAction from './filter.action';

/**
 * generate html element for the specified markup
 * @param {string} markup
 * @returns {HTMLElement}
 */
const generateHTMLElement = (markup) => {
    const div = document.createElement('div');
    div.innerHTML = markup.trim();
    return div.firstChild;
};

describe('Filter Action', () => {

    describe('Text Filter', () => {

        it('if no params -> return an empty array', () => {

            const res = FilterAction.textFilter();
            expect(res).toEqual([]);
        });

        it('return the same items for the path = default', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.textFilter(items, 'a', 'default');
            expect(res).toEqual(items);
        });

        it('contains mode', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'a', '.title');
            expect(res).toEqual([item1, item3]);
        });

        it('contains mode with multiple elements', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                    <p class="title">rrr</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">kkk</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'a', '.title');
            expect(res).toEqual([item1, item3]);
        });

        it('contains mode with multiple elements #2', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">rrr</p>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">kkk</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">ttt</p>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'a', '.title');
            expect(res).toEqual([item1, item3]);
        });

        it('startsWith mode', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">kaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'a', '.title', 'startsWith');
            expect(res).toEqual([item3]);
        });

        it('startsWith mode with multiple elements', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">kaa</p>
                    <p class="title">bbb</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">bbb</p>
                    <p class="title">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                    <p class="title">bbb</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'a', '.title', 'startsWith');
            expect(res).toEqual([item3]);
        });

        it('startsWith mode with multiple elements #2', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">kaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">bbb</p>
                    <p class="title">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'a', '.title', 'startsWith');
            expect(res).toEqual([item3]);
        });

        it('endsWith mode', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'b', '.title', 'endsWith');
            expect(res).toEqual([item2]);
        });

        it('endsWith mode with multiple elements', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                    <p class="title">ttt</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">ttt</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                    <p class="title">ttt</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'b', '.title', 'endsWith');
            expect(res).toEqual([item2]);
        });

        it('endsWith mode with multiple elements #2', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">ttt</p>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">ttt</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">ttt</p>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'b', '.title', 'endsWith');
            expect(res).toEqual([item2]);
        });

        it('equal mode', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'bbb', '.title', 'equal');
            expect(res).toEqual([item2]);
        });

        it('equal mode with multiple elements', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                    <p class="title">ooo</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">ooo</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                    <p class="title">ooo</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'bbb', '.title', 'equal');
            expect(res).toEqual([item2]);
        });

        it('equal mode with multiple elements #2', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">ooo</p>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                    <p class="title">ooo</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">ooo</p>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'bbb', '.title', 'equal');
            expect(res).toEqual([item2]);
        });

        it('empty path -> the whole item', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bb</p>b
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">abc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, 'bbb', '', 'equal');
            expect(res).toEqual([item2]);
        });

        it('regex', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">12aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">gg 12bb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">44abc 66</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.textFilter(items, '12', '.title', 'equal', '[a-zA-Z ]');
            expect(res).toEqual([item1, item2]);
        });
    });

    describe('Path Filter', () => {

        it('if no params -> return an empty array', () => {

            const res = FilterAction.pathFilter();
            expect(res).toEqual([]);
        });

        it('return the same items for the path = default', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.pathFilter(items, 'default');
            expect(res).toEqual(items);
        });

        it('return the same items for the empty path', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.pathFilter(items, '');
            expect(res).toEqual(items);
        });

        it('.title path', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="desc">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">ccc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.pathFilter(items, '.title');
            expect(res).toEqual([item1, item3]);
        });

        it('.title path for the inverted filter', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="desc">bbb</p>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <p class="title">ccc</p>
                </div>
            `);

            const items = [item1, item2, item3];

            const res = FilterAction.pathFilter(items, '.title', true);
            expect(res).toEqual([item2]);
        });
    });

    describe('Range Filter', () => {

        it('if no params -> return an empty array', () => {

            const res = FilterAction.rangeFilter();
            expect(res).toEqual([]);
        });

        it('return the same items for the path = default', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aaa 1</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">bbb 2</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, 'default', 100, 150);
            expect(res).toEqual(items);
        });


        it('return 1 item, path = .title, [1, 11]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 1, 11);
            expect(res).toEqual([item1]);
        });

        it('return 1 item, path = .title, [11, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 11, 20);
            expect(res).toEqual([item2]);
        });

        it('return 1 item, path = .title, [12, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 12, 20);
            expect(res).toEqual([item2]);
        });

        it('return 2 items, path = .title, [0, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 0, 20);
            expect(res).toEqual([item1, item2]);
        });


        it('return 1 item, path = .title, [1.1, 10.5]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10.5</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12.7</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 1.1, 10.5);
            expect(res).toEqual([item1]);
        });

        it('return 1 item, path = .title, [1.5, 11.3]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10.5</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12.2</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 1.5, 11.3);
            expect(res).toEqual([item1]);
        });

        it('return 1 item, path = .title, [11.4, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">11.4</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 11.4, 20);
            expect(res).toEqual([item2]);
        });

        it('return 2 items, path = .title, [0, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10.6</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12.5</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 0, 20);
            expect(res).toEqual([item1, item2]);
        });


        it('return 1 item, path = .title, [1, 10], regex', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">aa 10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12 bb</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 1, 10);
            expect(res).toEqual([item1]);
        });

        it('return 1 item, path = .title, [1, 11], regex', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">cc10cc</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">asd12asd</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 1, 11);
            expect(res).toEqual([item1]);
        });

        it('return 1 item, path = .title, [11, 20], regex', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">a 10dd</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">dd 12a</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 11, 20);
            expect(res).toEqual([item2]);
        });

        it('return 1 item, path = .title, [12, 20], regex', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">yy10yy</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">yy12yy</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 12, 20);
            expect(res).toEqual([item2]);
        });

        it('return 2 items, path = .title, [0, 20], regex', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">a10 yy</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">t 12dd</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 0, 20);
            expect(res).toEqual([item1, item2]);
        });


        it('return 1 item, path is empty -> search in whole element, [1, 11]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    10
                </div>
            `);

            const item2 = generateHTMLElement(`
                12
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '', 1, 11);
            expect(res).toEqual([item1]);
        });

        it('return 1 item, path is empty -> search in whole element, [11, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    10
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    12
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '', 11, 20);
            expect(res).toEqual([item2]);
        });

        it('return 1 item, path is empty -> search in whole element, [12, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p>10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="aaa">12</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '', 12, 20);
            expect(res).toEqual([item2]);
        });

        it('return 2 items, path is empty -> search in whole element, [0, 20]', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <span>10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    12
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '', 0, 20);
            expect(res).toEqual([item1, item2]);
        });


        it('multiple numbers, .title, first of items is not in the range -> return an empty array', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                    <p class="title">20</p>
                </div>
            `);

            const items = [item1];

            const res = FilterAction.rangeFilter(items, '.title', 1, 11);
            expect(res).toEqual([]);
        });

        it('multiple numbers, .title, second of items is not in the range -> return an empty array', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">20</p>
                    <p class="title">10</p>
                </div>
            `);

            const items = [item1];

            const res = FilterAction.rangeFilter(items, '.title', 1, 11);
            expect(res).toEqual([]);
        });

        it('multiple numbers, .title, both items is not in the range -> return an empty array', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">20</p>
                    <p class="title">15</p>
                </div>
            `);

            const items = [item1];

            const res = FilterAction.rangeFilter(items, '.title', 1, 11);
            expect(res).toEqual([]);
        });

        it('multiple numbers -> all items are in the range, .title', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                    <p class="title">20</p>
                </div>
            `);

            const items = [item1];

            const res = FilterAction.rangeFilter(items, '.title', 1, 22);
            expect(res).toEqual([item1]);
        });

        it('multiple numbers -> items are in boundary, .title', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                    <p class="title">20</p>
                </div>
            `);

            const items = [item1];

            const res = FilterAction.rangeFilter(items, '.title', 10, 20);
            expect(res).toEqual([item1]);
        });


        it('from != min', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                </div>
            `);

            const items = [item1];

            const res = FilterAction.rangeFilter(items, '.title', 1, 11, 5, 20);
            expect(res).toEqual([item1]);
        });

        it('to != max', () => {

            const item1 = generateHTMLElement(`
                <div>
                    <p class="title">10</p>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <p class="title">12</p>
                </div>
            `);

            const items = [item1, item2];

            const res = FilterAction.rangeFilter(items, '.title', 1, 15, 11, 20);
            expect(res).toEqual([item2]);
        });

    });

    describe('Distance Filter Tests', () => {

        /**
         * Helper function to generate HTML element
         * @param {string} html
         * @returns {HTMLElement}
         */
        const generateHTMLElement = (html) => {
            const div = document.createElement('div');
            div.innerHTML = html.trim();
            return div.firstChild;
        };

        it('should format distances correctly', () => {
            // Test distances less than 1km (should be in meters)
            expect(FilterAction.formatDistance(0.1)).toBe('100m');
            expect(FilterAction.formatDistance(0.5)).toBe('500m');
            expect(FilterAction.formatDistance(0.99)).toBe('990m');

            // Test distances 1km or greater (should be in km with no decimal places)
            expect(FilterAction.formatDistance(1)).toBe('1km');
            expect(FilterAction.formatDistance(1.4)).toBe('1km');
            expect(FilterAction.formatDistance(1.6)).toBe('2km');
            expect(FilterAction.formatDistance(5.3)).toBe('5km');
            expect(FilterAction.formatDistance(10.7)).toBe('11km');
        });

        it('should calculate distances correctly using Haversine formula', () => {
            // New York to Los Angeles (approx. 3935 km)
            const nyLat = 40.7128;
            const nyLng = -74.0060;
            const laLat = 34.0522;
            const laLng = -118.2437;

            const distance = FilterAction.calculateDistance(nyLat, nyLng, laLat, laLng);

            // Allow for small rounding differences
            expect(distance).toBeGreaterThan(3900);
            expect(distance).toBeLessThan(4000);
        });

        it('should filter and sort items by distance', () => {
            // Create test items with lat/lng data
            const item1 = generateHTMLElement(`
                <div>
                    <span class="lat" data-lat="40.7128"></span>
                    <span class="lng" data-lng="-74.0060"></span>
                    <div class="distance"></div>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <span class="lat" data-lat="34.0522"></span>
                    <span class="lng" data-lng="-118.2437"></span>
                    <div class="distance"></div>
                </div>
            `);

            const item3 = generateHTMLElement(`
                <div>
                    <span class="lat" data-lat="41.8781"></span>
                    <span class="lng" data-lng="-87.6298"></span>
                    <div class="distance"></div>
                </div>
            `);

            const items = [item1, item2, item3];
            
            // User location: Washington DC
            const userLat = 38.9072;
            const userLng = -77.0369;
            
            // Filter and sort by distance
            const result = FilterAction.distanceFilter(
                items,
                '.lat',
                '.lng',
                'data-lat',
                'data-lng',
                null,
                userLat,
                userLng,
                '.distance'
            );
            
            // Expected order based on actual distances from DC:
            // NY (item1) ~ 328km, Chicago (item3) ~ 958km, LA (item2) ~ 3700km
            expect(result.length).toBe(3);
            
            // Check that distance display elements were updated
            for (let item of result) {
                const distanceEl = item.querySelector('.distance');
                expect(distanceEl.textContent).not.toBe('');
                expect(distanceEl.style.display).toBe('inline-block');
            }
            
            // Check that the first item has NY coordinates (closest to DC)
            const firstItemLat = result[0].querySelector('.lat').getAttribute('data-lat');
            expect(firstItemLat).toBe('40.7128'); // NY latitude
        });

        it('should filter out items beyond max distance', () => {
            // Create test items with lat/lng data
            const item1 = generateHTMLElement(`
                <div>
                    <span class="lat" data-lat="40.7128"></span>
                    <span class="lng" data-lng="-74.0060"></span>
                    <div class="distance"></div>
                </div>
            `);

            const item2 = generateHTMLElement(`
                <div>
                    <span class="lat" data-lat="34.0522"></span>
                    <span class="lng" data-lng="-118.2437"></span>
                    <div class="distance"></div>
                </div>
            `);

            const items = [item1, item2];

            // User location: Washington DC
            const userLat = 38.9072;
            const userLng = -77.0369;

            // Filter with max distance of 500km (should exclude LA which is ~3700km away)
            const result = FilterAction.distanceFilter(
                items,
                '.lat',
                '.lng',
                'data-lat',
                'data-lng',
                500, // Max distance in km
                userLat,
                userLng,
                '.distance'
            );

            // Only NY should be within 500km of DC
            expect(result.length).toBe(1);

            // Check that the remaining item has NY coordinates
            const latEl = result[0].querySelector('.lat');
            expect(latEl.getAttribute('data-lat')).toBe('40.7128');
        });

        it('should handle items with missing or invalid coordinates', () => {
            // Create test items with valid and invalid lat/lng data
            const validItem = generateHTMLElement(`
                <div>
                    <span class="lat" data-lat="40.7128"></span>
                    <span class="lng" data-lng="-74.0060"></span>
                    <div class="distance"></div>
                </div>
            `);

            const missingLatItem = generateHTMLElement(`
                <div>
                    <div class="distance"></div>
                </div>
            `);

            const invalidLatItem = generateHTMLElement(`
                <div>
                    <span class="lat" data-lat="invalid"></span>
                    <span class="lng" data-lng="-87.6298"></span>
                    <div class="distance"></div>
                </div>
            `);

            const items = [validItem, missingLatItem, invalidLatItem];
            
            // User location
            const userLat = 38.9072;
            const userLng = -77.0369;
            
            // Filter and sort by distance
            const result = FilterAction.distanceFilter(
                items,
                '.lat',
                '.lng',
                'data-lat',
                'data-lng',
                null,
                userLat,
                userLng,
                '.distance'
            );
            
            // Check that only the valid item is included
            // The function should filter out items with missing or invalid lat/lng
            expect(result.includes(validItem)).toBe(true);
            expect(result.includes(missingLatItem)).toBe(false);
            expect(result.includes(invalidLatItem)).toBe(false);
        });
    });


});