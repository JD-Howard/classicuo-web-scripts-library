// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Target/
// Status: Initial AI conversion from documentation, audited, refined and tested


/**
 * The Target class is for interacting with the targeting system in ClassicUO.
 * Target is accessible in the global scope via the variable `target`.
 */
declare interface Target {
    /**
     * Object of the last target, i.e. last Item/Mobile
     * @example
     * const lastTarget = target.last;
     * if (lastTarget) {
     *   console.log(`Last target: ${lastTarget.name}`);
     * }
     */
    readonly last: undefined | Item | Mobile;
    
    /**
     * Last object used, i.e. double-clicked by the player
     * @example
     * const lastUsed = target.lastObject;
     * if (lastUsed) {
     *   console.log(`Last used object: ${lastUsed.name}`);
     * }
     */
    readonly lastObject: undefined | Item;
    
    /**
     * Serial of the last object used, i.e. double-clicked by the player
     * @example
     * console.log(`Last object serial: ${target.lastObjectSerial}`);
     */
    readonly lastObjectSerial: number;
    
    /**
     * Serial of the last target
     * @example
     * console.log(`Last target serial: ${target.lastSerial}`);
     */
    readonly lastSerial: number;
    
    /**
     * Check if target cursor is open
     * @example
     * if (target.open) {
     *   console.log('Target cursor is open');
     * }
     */
    readonly open: boolean;
    
    /**
     * Close the target cursor.
     * NOTE: This is often a good defensive measure to ensure scripts do get stuck in a bad state.
     * @example
     * if (target.open) {
     *   target.cancel();
     * }
     */
    cancel(): void;
    
    /**
     * Clear target queue
     * @example
     * target.clearQueue();
     */
    clearQueue(): void;
    
    /**
     * Target a Mobile or an Item with the currently open target
     * @param serial The serial number or entity to target
     * @example
     * client.castSpell(Spells.Heal);
     * target.wait();
     * target.entity(player);
     */
    entity(serial: number | Entity): void;
    
    /**
     * Creates a target and returns information about the result
     * @param isGround Whether to target ground (optional)
     * @returns Target information
     * @example
     * const targetInfo = target.query(true);
     * if (targetInfo.type === TargetType.Location) {
     *   console.log(`Targeted location: ${targetInfo.x}, ${targetInfo.y}, ${targetInfo.z}`);
     * }
     */
    query(isGround?: boolean): TargetInfo;
    
    /**
     * Repeats the last targeting information based on the cursor type, e.g. Entity/Position etc
     * @example
     * client.castSpell(Spells.Heal);
     * target.wait();
     * target.repeatLast();
     * @example
     * client.castSpell(Spells.Teleport);
     * target.wait();
     * target.repeatLast();
     */
    repeatLast(): void;
    
    /**
     * Target self with the currently open target
     * @example
     * client.castSpell(Spells.Heal);
     * target.wait();
     * target.self();
     */
    self(): void;
    
    /**
     * Target a Tile or Static.
     * When `graphic` is omitted it will target LAND by default.
     * @param x X coordinate
     * @param y Y coordinate
     * @param z Z coordinate
     * @param graphic Graphic ID (optional)
     * @example
     * client.castSpell(Spells.Teleport);
     * target.wait();
     * target.terrain(1203, 222, 0);
     * @example
     * client.castSpell(Spells.Teleport);
     * target.wait();
     * target.terrain(1203, 222, 0, 0x5a2);
     */
    terrain(x: number, y: number, z: number, graphic?: number): void;
    
    /**
     * Target a Tile or Static from a specific Item or Mobile
     * When `graphic` is omitted it will target LAND by default.
     * @param entity The entity to target relative to
     * @param range Range from the entity
     * @param forward Whether to target in front of the entity
     * @param graphic Graphic ID (optional)
     * @example
     * client.castSpell(Spells.Teleport);
     * target.wait();
     * target.terrainRelativeToEntity(mob, 5, true);
     * @example
     * client.castSpell(Spells.Teleport);
     * target.wait();
     * target.terrainRelativeToEntity(mob, 5, true, 0x5a2);
     */
    terrainRelativeToEntity(
        entity: number | Entity,
        range: number,
        forward: boolean,
        graphic?: number
    ): void;
    
    /**
     * Target a Tile or Static where `x, y, z` is the distance from the player.
     * When `graphic` is omitted it will target LAND by default.
     * @param x X offset from player
     * @param y Y offset from player
     * @param z Z offset from player
     * @param graphic Optional Graphic ID
     * @example
     * client.castSpell(Spells.Teleport);
     * target.wait();
     * target.terrainWithOffset(-1, -2, 0);
     * @example
     * client.castSpell(Spells.Teleport);
     * target.wait();
     * target.terrainWithOffset(-1, -2, 0, 0x5a2);
     */
    terrainWithOffset(x: number, y: number, z: number, graphic?: number): void;
    
    /**
     * Wait for the target to open within a specific amount of time.
     * @param timeoutMs Timeout in milliseconds (optional)
     * @returns True if target opened within timeout, false otherwise
     * @example
     * if (target.wait(1000)) {
     *   console.log('Target opened within 1 second');
     * } else {
     *   console.log('Target failed to open within 1 second');
     * }
     */
    wait(timeoutMs?: number): boolean;
    
    /**
     * Waits for the target to open, and then targets the desired entity
     * @param entity The entity to target
     * @param timeoutMs Timeout in milliseconds (optional)
     * @returns True if target opened and entity was targeted within timeout
     * @example
     * if (target.waitTargetEntity(enemy, 2000)) {
     *   console.log('Successfully targeted enemy');
     * }
     */
    waitTargetEntity(entity: number | Entity, timeoutMs?: number): boolean;
    
    /**
     * Wait for target with a specific amount of time, when open target self.
     * @param timeoutMs Timeout in milliseconds (optional)
     * @returns True if target opened and self was targeted within timeout
     * @example
     * player.useType(0xe21);
     * target.waitTargetSelf();
     */
    waitTargetSelf(timeoutMs?: number): boolean;
    
    /**
     * Wait for target, when open target the first object with a certain graphic/hue
     * @param graphic Graphic ID to target
     * @param hue Color hue (optional)
     * @param timeoutMs Timeout in milliseconds (optional)
     * @returns True if target opened and object was targeted within timeout
     * @example
     * player.useType(0xf9d);
     * target.waitTargetType(0x1078);
     */
    waitTargetType(graphic: number, hue?: number, timeoutMs?: number): boolean;
}

