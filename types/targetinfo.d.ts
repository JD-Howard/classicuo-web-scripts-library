// Implied by documentation at: https://classicuo.org/scripting/namespaces/Target/
// This object was undocumented, but derived from UOC editor testing

/**
 * Interface for target information that represents the return of target.query()
 * @note This object was undocumented, but was named and can be used in the _library or scripts
 */
declare interface TargetInfo {

    
    /**
     * Serial number of the targeted object (if type is Entity)
     */
    readonly serial: number;
    
    /**
     * X coordinate of the target
     */
    readonly x: number;
    
    /**
     * Y coordinate of the target
     */
    readonly y: number;
    
    /**
     * Z coordinate of the target
     */
    readonly z: number;
    
    /**
     * Graphic ID of the target
     */
    readonly graphic: number;
    
    /**
     * Hue ID of a targeted Item
     */
    readonly hue: number;
}

