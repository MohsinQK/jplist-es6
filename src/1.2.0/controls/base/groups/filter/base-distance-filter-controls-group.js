import BaseControlsGroup from '../base-controls-group';
import BaseDistanceFilterControl from '../../controls/filter/base-distance-filter.control';

/**
 * represents a group of distance filter controls with the same data-name and data-group attributes
 */
class BaseDistanceFilterControlsGroup extends BaseControlsGroup{

    /**
     * add control to the group
     * @param {BaseControl} control
     * @return {BaseDistanceFilterControl|null}
     */
    addControl(control){

        if(control.name !== this.name || control.group !== this.group){
            return null;
        }

        const baseDistanceFilterControl = new BaseDistanceFilterControl(control.element);

        this.controls.push(baseDistanceFilterControl);

        return baseDistanceFilterControl;
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
                options.push({
                    latPath: control.latPath,
                    lngPath: control.lngPath,
                    latAttr: control.latAttr,
                    lngAttr: control.lngAttr,
                    maxDistance: control.maxDistance,
                    userLat: control.userLat,
                    userLng: control.userLng,
                    distanceDisplayPath: control.distanceDisplayPath,
                    or: control.or
                });
            }
        }

        return options;
    }
}

export default BaseDistanceFilterControlsGroup;
