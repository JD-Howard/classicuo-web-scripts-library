// This object was undocumented, but derived from UOC editor testing

/**
 * Interface that represents the array type return from Gump.waitForVendorGumpData().items[#].properties[#]
 * @note Creates intelligence, but should not be directly referenced in the _library or scripts
 */
declare interface VendorItemPropValue {
    id: number;
    order: number;

    /**
     * Can be the name of the item property with some odd syntax representing the value too, but
     * also could be a clean number value of a parent VendorItemProperty object.
     */
    text: string;
}