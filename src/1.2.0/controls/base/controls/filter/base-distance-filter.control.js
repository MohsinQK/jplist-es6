import BaseControl from '../base.control';

/**
 * base distance filter control
 */
class BaseDistanceFilterControl extends BaseControl{

    /**
     * constructor
     * @param {HTMLElement} element
     */
    constructor(element){
        super(element);

        if(element){

            /**
             * css selector for elements containing latitude attribute
             * @type {string}
             */
            this.latPath = (element.getAttribute('data-lat-path') || '').trim();

            /**
             * css selector for elements containing longitude attribute
             * @type {string}
             */
            this.lngPath = (element.getAttribute('data-lng-path') || '').trim();

            /**
             * attribute name that contains latitude value
             * @type {string}
             */
            this.latAttr = (element.getAttribute('data-lat-attr') || 'data-lat').trim();

            /**
             * attribute name that contains longitude value
             * @type {string}
             */
            this.lngAttr = (element.getAttribute('data-lng-attr') || 'data-lng').trim();

            /**
             * maximum distance in kilometers (optional)
             * @type {number|null}
             */
            this.maxDistance = element.getAttribute('data-max-distance') ? 
                Number(element.getAttribute('data-max-distance')) : null;

            /**
             * optional "OR" logic property, used to combine different filter controls with "OR" logic instead of "AND"
             * @type {string|null}
             */
            this.or = element.getAttribute('data-or') || null;

            /**
             * css selector for element where distance will be displayed
             * @type {string}
             */
            this.distanceDisplayPath = (element.getAttribute('data-distance-display') || '').trim();

            /**
             * user's latitude
             * @type {number|null}
             */
            this.userLat = null;

            /**
             * user's longitude
             * @type {number|null}
             */
            this.userLng = null;

            /**
             * user's address
             * @type {string}
             */
            this.userAddress = '';
        }
    }

    /**
     * get distance filter options used in FilterAction.distanceFilter method
     * @return {object} options
     */
    getDistanceFilterOptions(){
        return {
            latPath: this.latPath,
            lngPath: this.lngPath,
            latAttr: this.latAttr,
            lngAttr: this.lngAttr,
            maxDistance: this.maxDistance,
            userLat: this.userLat,
            userLng: this.userLng,
            userAddress: this.userAddress,
            distanceDisplayPath: this.distanceDisplayPath,
            or: this.or
        };
    }

    /**
     * check if current control has the same properties like the specified control
     * @param {BaseDistanceFilterControl} control
     * @return {boolean}
     */
    isEqualTo(control){
        return this.latPath === control.latPath && 
               this.lngPath === control.lngPath && 
               this.latAttr === control.latAttr && 
               this.lngAttr === control.lngAttr && 
               this.maxDistance === control.maxDistance &&
               this.userLat === control.userLat &&
               this.userLng === control.userLng;
    }
}

export default BaseDistanceFilterControl;
