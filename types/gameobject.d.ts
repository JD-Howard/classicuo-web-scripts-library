// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/GameObject/
// Status: Initial AI conversion from documentation, audited, refined


/**
 * Base interface for all game and gump entities that can be uniquely identified.
 * This serves as the identification mechanism for all instance objects in ClassicUO
 */
declare interface GameObject {
            
    /**
     * Gets the object type name; IE: Item, Mobile
     */
    readonly _tag: string;

    /**
     * Gets the serial number of the game object
     */
    readonly serial: number;
    
}

