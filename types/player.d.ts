// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Player/
// Status: Initial AI conversion from documentation, audited, refined, and UOC tested.
//         DeepSeek did kind of a bad job on this ones functions() and those were substantially audited.
//         However, many of these properties were not explicitly tested.

/**
 * The Player class references the current player whilst in-game and is accessible on the global scope as the `player` variable.
 * This class extends the Mobile interface with player-specific properties and methods.
 */
declare interface Player extends Mobile {
    
    /**
     * Gets the player's backpack item
     * @example
     * const backpack = player.backpack;
     * if (backpack) {
     *   console.log(`Backpack serial: ${backpack.serial}`);
     * }
     */
    readonly backpack: Item; // removed the "| undefined" because the only time this might be true is while your a ghost;
    
    /**
     * Gets the player's cold resistance
     * @example
     * console.log(`Cold resistance: ${player.coldResistance}`);
     */
    readonly coldResistance: number;
    
    /**
     * Gets the player's damage increase percentage
     * @example
     * console.log(`Damage increase: ${player.damageIncrease}%`);
     */
    readonly damageIncrease: number;
    
    /**
     * Gets the player's maximum damage
     * @example
     * console.log(`Max damage: ${player.damageMax}`);
     */
    readonly damageMax: number;
    
    /**
     * Gets the player's minimum damage
     * @example
     * console.log(`Min damage: ${player.damageMin}`);
     */
    readonly damageMin: number;
    
    /**
     * Gets the player's defense chance increase percentage
     * @example
     * console.log(`Defense chance increase: ${player.defenseChanceIncrease}%`);
     */
    readonly defenseChanceIncrease: number;
    
    /**
     * Gets the player's dexterity attribute
     * @example
     * console.log(`Dexterity: ${player.dexterity}`);
     */
    readonly dexterity: number;
    
    /**
     * Gets the player's energy resistance
     * @example
     * console.log(`Energy resistance: ${player.energyResistance}`);
     */
    readonly energyResistance: number;
    
    
    /**
     * Gets the player's faster cast recovery value
     * @example
     * console.log(`Faster cast recovery: ${player.fasterCastRecovery}`);
     */
    readonly fasterCastRecovery: number;
    
    /**
     * Gets the player's faster casting percentage
     * @example
     * console.log(`Faster casting: ${player.fasterCasting}%`);
     */
    readonly fasterCasting: number;
    
    /**
     * Gets the player's fire resistance
     * @example
     * console.log(`Fire resistance: ${player.fireResistance}`);
     */
    readonly fireResistance: number;
    
    /**
     * Gets the player's number of followers
     * @example
     * console.log(`Followers: ${player.followers}`);
     */
    readonly followers: number;
    
    /**
     * Gets the player's amount of gold
     * @example
     * console.log(`Gold: ${player.gold}`);
     */
    readonly gold: number;
    
    /**
     * Gets the player's hit chance increase percentage
     * @example
     * console.log(`Hit chance increase: ${player.hitChanceIncrease}%`);
     */
    readonly hitChanceIncrease: number;
    
    /**
     * Gets the player's intelligence attribute
     * @example
     * console.log(`Intelligence: ${player.intelligence}`);
     */
    readonly intelligence: number;
            
    /**
     * Gets the player's lower mana cost percentage
     * @example
     * console.log(`Lower mana cost: ${player.lowerManaCost}%`);
     */
    readonly lowerManaCost: number;
    
    /**
     * Gets the player's lower reagent cost percentage
     * @example
     * console.log(`Lower reagent cost: ${player.lowerReagentCost}%`);
     */
    readonly lowerReagentCost: number;
    
    /**
     * Gets the player's luck attribute
     * @example
     * console.log(`Luck: ${player.luck}`);
     */
    readonly luck: number;
    
    /**
     * Gets the player's current map number
     * @example
     * console.log(`Map: ${player.map}`);
     */
    readonly map: number;
    
    /**
     * Gets the player's maximum cold resistance
     * @example
     * console.log(`Max cold resistance: ${player.maxColdResistence}`);
     */
    readonly maxColdResistence: number;
    
    /**
     * Gets the player's maximum defense chance increase
     * @example
     * console.log(`Max defense chance increase: ${player.maxDefenseChanceIncrease}`);
     */
    readonly maxDefenseChanceIncrease: number;
    
    /**
     * Gets the player's maximum energy resistance
     * @example
     * console.log(`Max energy resistance: ${player.maxEnergyResistence}`);
     */
    readonly maxEnergyResistence: number;
    
    /**
     * Gets the player's maximum fire resistance
     * @example
     * console.log(`Max fire resistance: ${player.maxFireResistence}`);
     */
    readonly maxFireResistence: number;
    
    /**
     * Gets the player's maximum number of followers
     * @example
     * console.log(`Max followers: ${player.maxFollowers}`);
     */
    readonly maxFollowers: number;
    
    /**
     * Gets the player's maximum physical resistance
     * @example
     * console.log(`Max physical resistance: ${player.maxPhysicResistence}`);
     */
    readonly maxPhysicResistence: number;
    
    /**
     * Gets the player's maximum poison resistance
     * @example
     * console.log(`Max poison resistance: ${player.maxPoisonResistence}`);
     */
    readonly maxPoisonResistence: number;
    
    /**
     * Gets the player's physical resistance
     * @example
     * console.log(`Physical resistance: ${player.physicalResistance}`);
     */
    readonly physicalResistance: number;
    
    /**
     * Gets the player's poison resistance
     * @example
     * console.log(`Poison resistance: ${player.poisonResistance}`);
     */
    readonly poisonResistance: number;
    
    /**
     * Gets the player's primary ability (see Abilities enum)
     * @example
     * console.log(`Primary ability: ${Abilities[player.primaryAbility]}`);
     */
    readonly primaryAbility: Abilities;
    
    /**
     * Gets the player's secondary ability (see Abilities enum)
     * @example
     * console.log(`Secondary ability: ${Abilities[player.secondaryAbility]}`);
     */
    readonly secondaryAbility: Abilities;
    
    /**
     * Gets the player's spell damage increase percentage
     * @example
     * console.log(`Spell damage increase: ${player.spellDamageIncrease}%`);
     */
    readonly spellDamageIncrease: number;
    
    /**
     * Gets the player's stats cap
     * @example
     * console.log(`Stats cap: ${player.statsCap}`);
     */
    readonly statsCap: number;
    
    /**
     * Gets the player's strength attribute
     * @example
     * console.log(`Strength: ${player.strength}`);
     */
    readonly strength: number;
    
    /**
     * Gets the player's swing speed increase percentage
     * @example
     * console.log(`Swing speed increase: ${player.swingSpeedIncrease}%`);
     */
    readonly swingSpeedIncrease: number;
    
    /**
     * Gets the player's tithing points
     * @example
     * console.log(`Tithing points: ${player.tithingPoints}`);
     */
    readonly tithingPoints: number;
    
    /**
     * Gets the player's current weight
     * NOTE: use sleep() ahead of checking this value if your expecting a weight change.
     * @example
     * console.log(`Weight: ${player.weight}`);
     */
    readonly weight: number;
    
    /**
     * Gets the player's maximum weight capacity
     * @example
     * console.log(`Max weight: ${player.weightMax}`);
     */
    readonly weightMax: number;
    
        
    /**
     * Attacks a mobile
     * @param serial The serial number or entity to attack
     * @example
     * player.attack(target.lastSerial);
     */
    attack(serial: number | Entity | TargetInfo): void;
    
    /**
     * Triggers the Bow emote
     * @example
     * player.bow();
     */
    bow(): void;
    
    /**
     * Casts a spell
     * @param spell The spell to cast (see Spells enum)
     * @example
     * player.cast(Spells.Agility);
     * target.wait();
     * target.entity(player);
     */
    cast(spell: Spells): void;
    
    /**
     * Casts a spell and automatically targets the given serial on the next target
     * @param spell The spell to cast (see Spells enum)
     * @param serial The serial number or entity to target
     * @param timeoutMs Optional timeout in milliseconds
     * @example
     * player.castTo(Spells.Heal, player);
     */
    castTo(spell: Spells, serial: number | Entity, timeoutMs?: number): void;
    
    /**
     * Simulates clicking an object
     * @param serial The serial number or entity to click
     * @example
     * player.click(player);
     */
    click(serial: number | Entity): void;
    
    /**
     * Dresses the player using KR style dressing
     * @param items Array of item serials or item game objects to dress
     * @example
     * const armor = client.findType(0x13bb);
     * const weapon = client.findType(0x13b0);
     * if (armor && weapon) {
     *   player.dressKr([armor, weapon]);
     * }
     */
    dressKr(items: Array<number | Item>): void;
    
    /**
     * Attempts to equip an item if possible
     * @param serial The serial number or item to equip
     * @example
     * const axe = client.findType(0x0f49); // Axe graphic ID
     * player.equip(axe);
     */
    equip(serial: number | Item): void;
    
    /**
     * Attempt to fly if the player has the ability
     * @example
     * player.fly();
     */
    fly(): void;
    
    /**
     * Gets an array of all the skill values
     * @returns Array of skill objects or undefined
     * @example
     * const skills = player.getAllSkills();
     * console.log(skills[0].value); // Print Alchemy skill value
     */
    getAllSkills(): Skill[] | undefined;
    
    /**
     * Gets an object containing the values of a specific skill
     * @param skill The skill to get (see Skills enum)
     * @returns Skill object or undefined
     * @example
     * const anatomySkill = player.getSkill(Skills.Anatomy).value;
     */
    getSkill(skill: Skills): Skill | undefined;
    
    /**
     * Checks if the player has a specific buff or debuff
     * @param buffID The buff/debuff ID to check (see BuffDebuffs enum)
     * @returns True if the player has the buff/debuff
     */
    hasBuffDebuff(buffID: BuffDebuffs): boolean;
    
    /**
     * Turns off flying if the player is flying
     * @example
     * player.land();
     */
    land(): void;
    
    /**
     * Moves an item to a container or another location
     * @param item The serial number or GameObject representing the Item to move
     * @param container The destination container or Entity
     * @param x Optional X offset from player
     * @param y Optional Y offset from player
     * @param z Optional Z offset from player
     * @param amount Optional amount to move
     * @returns The quantity moved
     * @example
     * if (player.equippedItems.robe) {
     *   player.moveItem(player.equippedItems.robe, player.backpack);
     * }
     */
    moveItem(item: number | Item, container: number | Entity | Item, x?: number, y?: number, z?: number, amount?: number): number; // TODO: see if this can target a entities (pack animal) or can stack items
    
    /**
     * Moves an item to a ground offset from the player
     * @param item The serial number or GameObject representing the Item to move
     * @param x Optional X offset from player
     * @param y Optional Y offset from player
     * @param z Optional Z offset from player
     * @param amount Optional amount to move
     * @returns The quantity moved
     * @example
     * const targetInfo = target.query(); // prompt user for object
     * if (targetInfo) {
     *   player.moveItemOnGroundOffset(targetInfo, 1, 0, 0); // Move item to the east
     * }
     */
    moveItemOnGroundOffset(item: number | Item, x?: number, y?: number, z?: number, amount?: number): number;
    
    /**
     * Moves items of a specific type to a container or another location
     * @param graphic The graphic ID of the items to move
     * @param src The source container or Entity
     * @param dest The destination container or Entity
     * @param x Optional X offset from player
     * @param y Optional Y offset from player
     * @param z Optional Z offset from player
     * @param amount Optional amount to move
     * @param hue Optional hue filter
     * @returns The quantity moved
     * @example
     * player.moveType(0x0f52, player.backpack, bag);
     */
    moveType(graphic: number, src: number | Entity, dest: number | Entity, x?: number, y?: number, z?: number, hue?: number, amount?: number, range?: number): number;
    
    /**
     * Moves items of a specific type to a ground offset from the player
     * @param graphic The graphic ID of the items to move
     * @param src The source container or Entity
     * @param x Optional X offset from player
     * @param y Optional Y offset from player
     * @param z Optional Z offset from player
     * @param hue Optional hue filter
     * @param amount Optional amount to move
     * @param range Optional distance from the source
     * @returns The quantity moved
     * @example
     * TODO: Documentation example is invalid
     */
    moveTypeOnGroundOffset(graphic: number, src: number | Entity, x?: number, y?: number, z?: number, hue?: number, amount?: number, range?: number): void;
    
    /**
     * Uses any door directly in-front of where the player is facing
     * @example
     * player.openDoor();
     */
    openDoor(x: number, y: number, z: number): void;
    
    /**
     * Makes the player run in a specific direction
     * @param direction The direction to run (see Directions enum)
     * @returns True if character can run
     * @example
     * player.run(Directions.North);
     */
    run(direction: Directions): boolean;
    
    /**
     * Triggers the Salute emote
     * @example
     * player.salute();
     */
    salute(): void;
    
    /**
     * Says something in game chat with optional color
     * @param text The text to say
     * @param hue Optional color hue for the text
     * @example
     * player.say('Hello world!');
     * player.say('Important message!', 33); // Red text
     */
    say(text: string, hue?: number): void;
    
    /**

     * Sets the primary or secondary ability
     * @param primary Use True for primary and False for secondary
     * @param active toggles the ability on or off
     * @example
     * player.setAbility(true, false); // Turn primary ability off
     * player.setAbility(false, true); // Turn secondary ability on
     */
    setAbility(primary: boolean, active: boolean): void;
    
    /**
     * Sets the lock state of a skill
     * @param skill The skill to modify (see Skills enum)
     * @param lockState The lock state to set (see SkillLock enum)
     * @example
     * player.setSkillLock(Skills.Magery, SkillLock.Up);
     */
    setSkillLock(skill: Skills, lockState: SkillLock): void;
    
    /**
     * Toggles flying on/off
     * @example
     * player.toggleFlying();
     */
    toggleFlying(): void;
    
    /**
     * Toggles war mode on/off
     * @example
     * player.toggleWarMode();
     */
    toggleWarMode(): void;
    
    /**
     * Undresses the player using KR style undressing
     * @param layers The list of target equipped item layers
     * @example
     * player.undressKr(); // TODO: See if this actually works as an undress all
     */
    undressKr(layers: Layers[]): void;
    
    /**
     * Uses an object by serial number
     * @param serial The serial number or entity to use
     * @example
     * const bandage = client.findType(0xe21);
     * if (bandage) {
     *   player.use(bandage);
     *   target.waitTargetSelf();
     * }
     */
    use(serial: number | Item | Entity): void;
    
    /**
     * Uses the item currently in hand. For example an axe to chop wood.
     * @example
     * player.useItemInHand();
     * target.waitTargetSelf();
     */
    useItemInHand(): void;
    
    /**
     * Uses the last object that was used
     * @example
     * player.useLastObject();
     */
    useLastObject(): void;
    
    /**
     * Uses a specific skill
     * @param skill The skill to use (see Skills enum)
     * @param target The serial number or entity to use
     * @param timeoutMs Optional timeout in milliseconds
     * @example
     * player.useSkill(Skills.Hiding);
     */
    useSkill(skill: Skills, target?: number | Entity, timeoutMs?: number): void;
    
    /**
     * Uses an object by graphic type
     * @param graphic The graphic ID to use
     * @param hue Optional hue filter
     * @param source Optional source container to search for valid type
     * @param range Range from the source
     * @returns True if the type was found and activated
     * @example
     * const myFriend = 0x217ded;
     * player.useType(0xe21); // Bandage type
     * target.wait(5000);
     * target.entity(myFriend);
     */
    useType(graphic: number, hue?: number, source?: number | Entity | "world", range?: number): boolean; // TODO: verify WORLD works
    
    /**
     * Uses a virtue
     * @param virtue The virtue to use (see Virtues enum)
     * @param target Optional serial number or entity to use the virtue on; omit to target self
     * @param timeoutMs Optional timeout in milliseconds
     * @example
     * player.useVirtue(Virtues.Honor);
     */
    useVirtue(virtue: Virtues, target?: number | Entity, timeoutMs?: number): void;
    
    /**
     * Waits for a specific buff or debuff to be applied to the player
     * @param buffID The buff/debuff ID to wait for (see BuffDebuffs enum)
     * @param timeoutMs Optional timeout in milliseconds
     * @returns True if the buff/debuff was applied within the timeout
     * @example
     * if (player.waitForBuffDebuff(BuffDebuffs.Poison, 5000)) {
     *   player.useType(0x0f0a); // Use cure potion
     * }
     */
    waitForBuffDebuff(buffID: BuffDebuffs, timeoutMs?: number): boolean;
    
    /**
     * Makes the player walk
     * @param direction The direction to walk (see Directions enum)
     * @returns True if character can walk
     * @example
     * player.walk();
     */
    walk(direction: Directions): boolean;

}

