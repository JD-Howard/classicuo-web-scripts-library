// This object was undocumented, but derived from UOC editor testing

/**
 * Interface that represents the return from client.getTerrainList()
 * @note Creates intelligence, but should not be directly referenced in the _library or scripts
 */
declare interface TerrainInfo extends TileInfo {
            
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
     * Returns true when it is your object is a basic land tile
     */
    readonly isLand: boolean;
    
}

