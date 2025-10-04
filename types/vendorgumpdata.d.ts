// This object was undocumented, but derived from UOC editor testing

/**
 * Interface that represents the return type of Gump.waitForVendorGumpData()
 * @note Creates intelligence, but should not be directly referenced in the _library or scripts
 */
declare interface VendorGumpData {
    type: 'buy' | 'sell';
    vendor: Mobile;
    items: VendorPropertyData[];
}