// This object was undocumented, but derived from UOC editor testing

/**
 * Interface that represents the return from client.getStatic() & client.getTile()
 * @note Creates intelligence, but should not be directly referenced in the _library or scripts
 */
declare interface TileInfo {
            
    /**
     * Graphic ID of the target
     */
    readonly graphic: number;

    /**
     * Contains undocumented state information about the tile
     * NOTE: this provides more information when client.getStatic() is used.
     */
    readonly flags: number;
    
}

