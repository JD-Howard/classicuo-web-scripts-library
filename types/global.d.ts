// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/globals

// Global Functions
declare function exit(reason?: string): never;
declare function log(...args: any[]): void;
declare function sleep(ms: number): void;

// Global Instance Variables
declare const client: Client;
declare const ignoreList: IgnoreList;
declare const journal: Journal;
declare const player: Player;
declare const popupMenu: PopupMenu;
declare const target: Target;
declare const worldMap: WorldMap;

/**
 * This is another way to log information to the UOC editor output section.
 * It is useful because it will color your messages differently and the clear()
 * function is helpful at the beginning of your scripts to keep the output current.
 */
declare const console: {
    clear(): void,
    debug(...data: any[]), // bug icon with blue text
    error(...data: any[]), // red-x icon, dark'ish background and red text
    info(...data: any[]),  // info icon with light text
    log(...data: any[]),   // no-icon but otherwise looks identical to info()
    warn(...data: any[])   // warning triangle icon, yellow'ish background with with orange'ish text
};



// Global Enum Access Points
declare const Abilities: typeof enums.Abilities;
declare const BuffDebuffs: typeof enums.BuffDebuffs;
declare const Constant: typeof enums.Constant;
declare const Directions: typeof enums.Directions;
declare const Layers: typeof enums.Layers;
declare const MessageType: typeof enums.MessageType;
declare const Notorieties: typeof enums.Notorieties;
declare const SearchEntityOptions: typeof enums.SearchEntityOptions;
declare const SearchEntityRangeOptions: typeof enums.SearchEntityRangeOptions;
declare const SearchEntityTypeOptions: typeof enums.SearchEntityTypeOptions;
declare const SkillLock: typeof enums.SkillLock;
declare const Skills: typeof enums.Skills;
declare const Spells: typeof enums.Spells;
declare const Virtues: typeof enums.Virtues;
