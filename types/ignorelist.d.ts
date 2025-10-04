// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/IgnoreList/
// Status: Initial AI conversion & verified alignment with documentation.

/**
 * The IgnoreList class manages a list of ignored entities within the ClassicUO web client.
 * Use this class to ignore certain entities (Items/Mobiles) from various search functions
 * like searchEntity or findType:cite[1].
 */
interface IgnoreList {
    /**
     * Gets the current list of ignored serial numbers
     * @example
     * console.log('Currently ignoring:', ignoreList.values);
     */
    readonly values: number[];
    
    /**
     * Adds an item to the ignore list, causing functions like findType to ignore them:cite[1].
     * @param serial The serial number or entity to ignore
     * @returns true if the value was added, false if it already exists:cite[1]
     * @example
     * let entity: Item | Mobile;
     * while ((entity = client.findType(0xeed))) {
     *   console.log(`Found item: ${entity.serial}`);
     *   ignoreList.add(entity); // Add it to the ignoreList so it won't get picked next
     * }
     */
    add(serial: number | Entity): boolean;
    
    /**
     * Clears the ignore list:cite[1].
     * @example
     * ignoreList.clear(); // Clear the list when we're done, this is cross-script
     */
    clear(): void;
    
    /**
     * Checks whether the entity exists in the ignore list:cite[1].
     * @param serial The serial number or entity to check
     * @returns true if in the list or false:cite[1]
     * @example
     * const entity = client.findType(0xeed);
     * if (entity && ignoreList.contains(entity)) {
     *   console.log('Entity is being ignored');
     * }
     */
    contains(serial: number | Entity): boolean;
    
    /**
     * Removes an item from ignore list, allowing them to be found again:cite[1].
     * @param serial The serial number or entity to remove
     * @returns true if the value was removed, false if it didn't exist:cite[1]
     * @example
     * const entity = client.findType(0xeed);
     * if (entity) {
     *   ignoreList.remove(entity); // Allow this entity to be found again
     * }
     */
    remove(serial: number | Entity): boolean;
    
    /**
     * Replaces the current ignore list with a new one:cite[1].
     * @param values Array of serial numbers to ignore
     * @example
     * ignoreList.replace([0x40001234, 0x40005678]); // Replace with specific serials
     */
    replace(values: number[]): void;
}



