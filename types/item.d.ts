// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Item/
// Status: Initial AI conversion and verified alignment with documentation; partially UOC tested

/**
 * Interface for Item entities in ClassicUO
 * Items represent objects in the game world that can be manipulated, moved, or used
 */
declare interface Item extends Entity  {
    
    /**
     * Gets the amount of the item (for stackable items)
     * Returns 0 if the item is no longer on screen or doesn't exist
     * @example
     * const gold = client.findType(0xeed);
     * if (gold) {
     *   console.log(`Found ${gold.amount} gold pieces`);
     * }
     */
    readonly amount: number;
    
    /**
     * Gets the serial of the container holding this item
     * Returns 0 if the item is on the ground or no container
     * @example
     * const item = client.findType(0xeed);
     * if (item && item.container !== 0) {
     *   console.log(`Item is in container: ${item.container}`);
     * }
     */
    readonly container: number;
    
    /**
     * Gets the contents of the item if it is a container
     * @example
     * const backpack = player.backpack;
     * if (backpack && backpack.contents) {
     *   console.log(`Backpack contains ${backpack.contents.length} items`);
     * }
     */
    readonly contents: Item[] | undefined;
    
    /**
     * Gets the layer of the item if equipped
     * Returns 0 if not equipped or not applicable
     * Compare using the Layers enum
     * @example
     * const weapon = client.findItemOnLayer(player.serial, Layers.OneHandedWeapon);
     * if (weapon) {
     *   console.log(`Weapon on layer: ${Layers[weapon.layer]}`);
     * }
     */
    readonly layer: number | Layers;
}
