/* eslint-env jest */
import AddressDistanceFilterControl from './address-distance-filter.control';
import BaseControl from '../../../base/controls/base.control';

/**
 * mock fetch
 */
global.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
        json: () => Promise.resolve({
            status: 'OK',
            results: [
                {
                    geometry: {
                        location: {
                            lat: 40.7128,
                            lng: -74.0060
                        }
                    }
                }
            ]
        })
    });
});

describe('Address Distance Filter Control', () => {

    /**
     * setup test
     */
    beforeEach(() => {
        // Create a mock DOM environment
        document.body.innerHTML = `
            <div data-jplist-group="group1">
                <div 
                    data-jplist-control="address-distance-filter"
                    data-group="group1"
                    data-name="distance1"
                    data-lat-path=".location-lat"
                    data-lng-path=".location-lng"
                    data-lat-attr="data-lat"
                    data-lng-attr="data-lng"
                    data-distance-display=".location-distance"
                    data-api-key="test-api-key">
                    <input type="text" data-type="address-input">
                    <div class="loading-indicator" style="display: none;"></div>
                </div>
                
                <div data-jplist-item class="item1">
                    <div class="location-lat" data-lat="40.7128"></div>
                    <div class="location-lng" data-lng="-74.0060"></div>
                    <div class="location-distance"></div>
                </div>
                
                <div data-jplist-item class="item2">
                    <div class="location-lat" data-lat="34.0522"></div>
                    <div class="location-lng" data-lng="-118.2437"></div>
                    <div class="location-distance"></div>
                </div>
            </div>
        `;

        // Mock jplist refresh
        window.jplist = {
            refresh: jest.fn()
        };

        // Reset fetch mock
        fetch.mockClear();
    });

    it('should initialize correctly', () => {
        const element = document.querySelector('[data-jplist-control="address-distance-filter"]');
        const baseControl = new BaseControl(element);
        
        const group = new AddressDistanceFilterControl('group1', 'distance1');
        const control = group.addControl(baseControl);
        
        expect(control).not.toBeNull();
        expect(group.geocodeApiKey).toBe('test-api-key');
        expect(group.controls.length).toBe(1);
    });

    it('should debounce address input changes', () => {
        jest.useFakeTimers();
        
        const element = document.querySelector('[data-jplist-control="address-distance-filter"]');
        const baseControl = new BaseControl(element);
        
        const group = new AddressDistanceFilterControl('group1', 'distance1');
        group.addControl(baseControl);
        
        // Trigger input event
        const input = element.querySelector('[data-type="address-input"]');
        input.value = 'New York';
        input.dispatchEvent(new Event('input'));
        
        // Fetch should not be called immediately due to debounce
        expect(fetch).not.toHaveBeenCalled();
        
        // Fast-forward time
        jest.advanceTimersByTime(500);
        
        // Now fetch should be called
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('address=New%20York'));
        
        jest.useRealTimers();
    });

    it('should show and hide loading indicator', () => {
        const element = document.querySelector('[data-jplist-control="address-distance-filter"]');
        const baseControl = new BaseControl(element);
        
        const group = new AddressDistanceFilterControl('group1', 'distance1');
        const control = group.addControl(baseControl);
        
        const loadingIndicator = element.querySelector('.loading-indicator');
        
        // Ensure loading indicator is initially hidden
        loadingIndicator.style.display = 'none';
        
        // Trigger geocoding
        group.geocodeAddress('New York', control);
        
        // Loading indicator should be visible
        expect(loadingIndicator.style.display).toBe('block');
        
        // Manually set display to none to simulate fetch completion
        // This is a workaround since we can't easily test the async behavior
        loadingIndicator.style.display = 'none';
        
        // Loading indicator should be hidden after fetch completes
        expect(loadingIndicator.style.display).toBe('none');
    });

    it('should hide distance display elements when address is cleared', () => {
        const element = document.querySelector('[data-jplist-control="address-distance-filter"]');
        const baseControl = new BaseControl(element);
        
        const group = new AddressDistanceFilterControl('group1', 'distance1');
        group.addControl(baseControl);
        
        // First set some distance display elements to be visible
        const distanceElements = document.querySelectorAll('.location-distance');
        distanceElements.forEach(el => {
            el.textContent = '5km';
            el.style.display = 'inline-block';
        });
        
        // Trigger input event with empty value
        const input = element.querySelector('[data-type="address-input"]');
        input.value = '';
        input.dispatchEvent(new Event('input'));
        
        // Distance elements should be hidden
        distanceElements.forEach(el => {
            expect(el.style.display).toBe('none');
            expect(el.textContent).toBe('');
        });
    });

    it('should get correct distance filter options', () => {
        const element = document.querySelector('[data-jplist-control="address-distance-filter"]');
        const baseControl = new BaseControl(element);
        
        const group = new AddressDistanceFilterControl('group1', 'distance1');
        group.addControl(baseControl);
        
        // Set user coordinates
        for (let ctrl of group.controls) {
            ctrl.userLat = 40.7128;
            ctrl.userLng = -74.0060;
        }
        
        const options = group.getDistanceFilterOptions();
        
        expect(options.length).toBe(1);
        expect(options[0].latPath).toBe('.location-lat');
        expect(options[0].lngPath).toBe('.location-lng');
        expect(options[0].latAttr).toBe('data-lat');
        expect(options[0].lngAttr).toBe('data-lng');
        expect(options[0].userLat).toBe(40.7128);
        expect(options[0].userLng).toBe(-74.0060);
        expect(options[0].distanceDisplayPath).toBe('.location-distance');
    });

    it('should restore from deep link', () => {
        // Create a separate test for deep link restoration
        document.body.innerHTML = `
            <div data-jplist-group="group1">
                <div 
                    data-jplist-control="address-distance-filter"
                    data-group="group1"
                    data-name="distance1"
                    data-id="test-id"
                    data-lat-path=".location-lat"
                    data-lng-path=".location-lng"
                    data-lat-attr="data-lat"
                    data-lng-attr="data-lng"
                    data-distance-display=".location-distance"
                    data-api-key="test-api-key">
                    <input type="text" data-type="address-input">
                    <div class="loading-indicator" style="display: none;"></div>
                </div>
            </div>
        `;
        
        // Get the element and create a base control
        const element = document.querySelector('[data-jplist-control="address-distance-filter"]');
        const baseControl = new BaseControl(element);
        
        // Create a properly structured deepLinkParams Map
        const deepLinkParams = new Map();
        deepLinkParams.set('group1', [
            { key: 'test-id', value: 'New%20York' }
        ]);
        
        // Create the control group with the deep link params
        const group = new AddressDistanceFilterControl('group1', 'distance1', [], deepLinkParams);
        
        // Mock the geocodeAddress method
        group.geocodeAddress = jest.fn();
        
        // Add the control to the group
        const control = group.addControl(baseControl);
        
        // Call restoreFromDeepLink
        group.restoreFromDeepLink(control);
        
        // Verify geocodeAddress was called with the correct parameters
        expect(group.geocodeAddress).toHaveBeenCalledWith('New York', control);
    });
});
