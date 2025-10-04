// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Entity/
// Status: Initial AI conversion from documentation, audited, refined, and partially verified in UOC

/**
 * Base interface for all game Item and Mobile entities
 */
declare interface Entity extends GameObject {
    
    /**
     * Gets the direction of the entity as a number, if it has one.
     * Compare using the Directions enum.
     * Returns 0 if the client does not know or the entity is no longer on screen.
     * @example
     * const entity = client.findObject(0x991);
     * if (entity) {
     *   if (entity.direction === Directions.North) {
     *     console.log(`${entity.name} is facing North`);
     *   } else {
     *     console.log(Directions[entity.direction]); // Prints the directions name, e.g. East
     *   }
     * }
     */
    readonly direction: Directions | number;
    
    /**
     * Gets the graphic id of the entity.
     * Returns 0 if entity is no longer on screen.
     * @example
     * console.log(player.graphic); // e.g. 400
     */
    readonly graphic: number;
    
    /**
     * Gets the (health) hit points of the entity.
     * Returns 0 if the client does not know or the entity is no longer on screen.
     * @example
     * const entity = client.findObject(0x991);
     * if (entity) {
     *   console.log(entity.hits);
     * }
     */
    readonly hits: number;

    /**
     * Gets the max (health) hit points of the entity.
     * Returns 0 if the client does not know or the entity is no longer on screen.
     * @example
     * const entity = client.findObject(0x991);
     * if (entity) {
     *   console.log(entity.maxHits);
     * }
     */
    readonly maxHits: number;
    
    /**
     * Gets the hue/color of the entity.
     * Returns 0 if entity is no longer on screen.
     * @example
     * const entity = client.findObject(player.equippedItems.robe);
     * if (entity) {
     *   console.log(entity.name);
     * }
     */
    readonly hue: number;
    
    /**
     * Gets whether the entity is hidden
     */
    readonly isHidden: boolean;
        
    /**
     * Gets the name of the entity.
     * Returns an empty string if not known to the client yet.
     * @example
     * const entity = client.findObject(player.equippedItems.robe);
     * if (entity) {
     *   console.log(entity.name);
     * }
     */
    readonly name: string;

    /**
     * Gets the current east/west X coordinate of the entity. 
     * Returns 0 if entity is no longer on screen.
     * @example
     * const entity = client.findObject(player); // Replace with any other entity serial
     * console.log(entity.x);
     */
    readonly x: number;
    
    /**
     * Gets the current north/south Y coordinate of the entity.
     * Returns 0 if entity is no longer on screen.
     * @example
     * const entity = client.findObject(player);
     * console.log(entity.y);
     */
    readonly y: number;
    
    /**
     * Gets the current Z elevation coordinate of the entity.
     * Returns 0 if entity is no longer on screen.
     * @example
     * const entity = client.findObject(player);
     * console.log(entity.z);
     */
    readonly z: number;
    
}

