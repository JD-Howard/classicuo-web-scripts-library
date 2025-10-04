// This object was undocumented, but derived from UOC editor testing

/**
 * Interface that represents the array type return from Gump.waitForVendorGumpData().items[#].properties
 * @note Creates intelligence, but should not be directly referenced in the _library or scripts
 */
declare interface VendorItemProperty extends VendorItemPropValue {
    values: VendorItemPropValue[];
}