// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Client/
// Status: Initial AI conversion from documentation, refined and UOC verified

/** 
 * Interface that represents the array type return from client.getItemOPL()
 * @note this object was partially documented but unnamed and should not be directly referenced in the _library or scripts
 */
declare interface ObjectPropertyData {
    name: string;
    serial: number;
    graphic: number;
    hue: number;
    amount: number;    
    data: null | string;
    isPartialHue: boolean;
    properties: VendorItemProperty[]; // Also unnamed and recycled for DRY purposes
}