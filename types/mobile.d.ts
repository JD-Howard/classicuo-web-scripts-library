// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Mobile/
// Status: Initial AI conversion from documentation, audited, refined, and partially UOC tested

/**
 * Interface for Mobile entities in ClassicUO
 * Mobiles represent living entities in the game world (players, NPCs, monsters)
 */
declare interface Mobile extends Entity {
    
    
    /**
     * The currently equipped items of the mobile (humanoid/players)
     */
    readonly equippedItems: EquippedItems;
    
    /**
     * Whether the mobile is currently in War Mode (humanoid)
     */
    readonly inWarMode: boolean;
    
    /**
     * Whether the mobile is dead
     */
    readonly isDead: boolean;
    
    /**
     * Whether the mobile is female, or otherwise male.
     */
    readonly isFemale: boolean;
    
    /**
     * Whether the mobile is currently paralyzed.
     */
    readonly isParalyzed: boolean;
    
    /**
     * Whether the mobile is poisoned (green hued)
     */
    readonly isPoisoned: boolean;
    
    /**
     * Whether the mobiles status is yellow (i.e. Invulnerable)
     */
    readonly isYellowHits: boolean;
    
    /**
     * The mobiles current mana. For the player it returns the real value, for other mobiles it is a scale of 1 to 100
     */
    readonly mana: number;
    
    /**
     * The mobiles maximum mana. For the player it returns the real value, for other mobiles it is a scale of 1 to 100
     */
    readonly maxMana: number;
    
    /**
     * The mobiles maximum stamina. For the player it returns the real value, for other mobiles it is a scale of 1 to 100
     */
    readonly maxStamina: number;
    
    /**
     * The mobiles Notoriety, i.e. Innocent, Gray, etc.
     */
    readonly notoriety: Notorieties;
    
    /**
     * The mobiles current stamina. For the player it returns the real value, for other mobiles it is a scale of 1 to 100
     */
    readonly stamina: number;
}

