// NOTE: This file should be copied into a Classic UO editor script named "_library" 
// Version: 0.1 (update major version if you introduce breaking changes)
//import {Config} from './_config'; // The shared config helps promote more universal scripts


// Conceptually, this object will be used as sane shared defaults that enables scripts to be generic
// and centrally configured; if applicable. However, it is expected for users to tweak these settings.
export const Config = {
    maxItemLootWeight: 5 // stones
}



//#region       *** Constant Wrappers ***


export const Messages = {    
    StopText: {
        HarvestBase: ["Target cannot be seen", "Your backpack is full", "That is too far away"],
    }
    
}


export const Hue = {
    Ore: {
        Iron: 0x0,
        DullCopper: 0x973,
        ShadowIron: 0x966,
        Copper: 0x96D,
        Bronze: 0x972,
        Gold: 0x8A5,
        Agapite: 0x979,
        Verite: 0x89F,
        Valorite: 0x8AB
    }

};

export const Gfx = {
    Tinker: {
        Hatchet: 0xF43,
        Shovel: 0xF39
    },
    Tailor: {
        Bandage: 0xE21
    },
    Ore: {
        Large: 0x19B9,   // large pile == 2 ingots
        Medium1: 0x19B8, // scattered version == 1 ingot
        Medium2: 0x19BA, // round version == 1 ingot
        Small: 0x19B7    // fragment x2 == 1 ingot
    },
    Mobile: {
        Pets: {            
            Beetle: 0x317,
            PackHorse: 0x123,
            PackLlama: 0x124
        }
    },
    Carpenter: {
        Boards: 0x1BD7,
        Logs: 0x1BDD
    }
}


export const ItemStats = {
    Negative: ['antique', 'brittle', 'prized', 'massive', 'unwieldly', 'cursed', 'unlucky'],
    Artifacts: ['lesser artifact', 'greater artifact', 'major artifact', 'legendary artifact' ],
    Magic: ['minor magic item', 'lesser magic item', 'greater magic item', 'major magic item'],

    // This is used for OPL Parsing operations to determine if/when items have skill related attributes
    // Also note that the index of these skill names directly corelate with the Skills enum.
    skillNames: [
        'alchemy',          'anatomy',              'animal lore',          'item identification',  'arms lore',        'parrying',
        'begging',          'blacksmith',           'fletching',            'peacemaking',          'camping',          'carpentry',
        'cartography',      'cooking',              'detect hidden',        'discordance',          'evaluate intelligence',
        'healing',          'fishing',              'forensic evaluation',  'herding',              'hiding',           'provocation',
        'inscription',      'lockpicking',          'magery',               'resisting spells',     'tactics',          'snooping',
        'musicianship',     'poisoning',            'archery',              'spirit speak',         'stealing',         'tailoring',
        'animal taming',    'taste identification', 'tinkering',            'tracking',             'veterinary',       'swordsmanship',
        'mace fighting',    'fencing',              'wrestling',            'lumberjacking',        'mining',           'meditation',
        'stealth',          'remove trap',          'necromancy',           'focus',                'chivalry',         'bushido',      
        'ninjitsu',         'spellweaving',         'mysticism',            'imbuing',              'throwing'
    ],
};

// #endregion Constant Wrappers


//#region       *** Custom Interfaces ***

export interface SplitValue {
    lower: number;
    upper: number;
}

// #endregion Custom Interfaces


//#region       *** Custom Classes ***


/**
 * This class was created to encapsulate any geometry driven math this library may need
 */
export class Geom {

    private static parseXY_Array(arg1: number | Entity | TargetInfo, arg2: number | Entity | TargetInfo, arg3?: number, arg4?: number) : number[] {
        const vals = [0,0,0,0]; // set defaults
        if (typeof arg1 === 'object' && arg1 !== null && 'x' in arg1) {
            vals[0] = arg1.x;
            vals[1] = arg1.y;
        } 
        
        if (typeof arg2 === 'object' && arg2 !== null && 'x' in arg2) {
            vals[2] = arg2.x;
            vals[3] = arg2.y;
        }

        if (typeof arg1 === 'number') vals[0] = Math.round(arg1); // source x as integer
        if (typeof arg2 === 'number') vals[1] = Math.round(arg2); // source y as integer
        if (typeof arg3 === 'number') vals[2] = Math.round(arg3); // dest x as integer
        if (typeof arg4 === 'number') vals[3] = Math.round(arg4); // dest y as integer
        
        // UOC coordinates should always be positive numbers so we enforce expectations
        return [Math.abs(vals[0]), Math.abs(vals[1]), Math.abs(vals[2]), Math.abs(vals[3])];
    }

    /**
     * Calculates the 2D distance between 2 points
     * @returns positive number representing the distance on the shortest path. You will need fractional logic for multi direction offsets.
     */
    static distTo(source: Entity, destination: Entity) : number;
    static distTo(source: Entity, destination: TargetInfo) : number;
    static distTo(source: Entity, destinationX: number, destinationY: number) : number;
    static distTo(source: TargetInfo, destination: TargetInfo) : number;
    static distTo(source: TargetInfo, destination: Entity) : number;
    static distTo(source: TargetInfo, destinationX: number, destinationY: number) : number;
    static distTo(sourceX: number, sourceY: number, destinationX: number, destinationY: number) : number;
    static distTo(arg1: number | Entity | TargetInfo, arg2: number | Entity | TargetInfo, arg3?: number, arg4?: number) : number {
        const [srcX, srcY, destX, destY] = Geom.parseXY_Array(arg1, arg2, arg3, arg4);
        return Math.sqrt(Math.pow(destX - srcX, 2) + Math.pow(destY - srcY, 2));
    }

    /**
     * Calculates the distance between 2 points in xy offsets     
     * @returns positive number representing the distance in x & y steps.
     */
    static stepsTo(source: Entity, destination: Entity) : number;
    static stepsTo(source: Entity, destination: TargetInfo) : number;
    static stepsTo(source: Entity, destinationX: number, destinationY: number) : number;
    static stepsTo(source: TargetInfo, destination: TargetInfo) : number;
    static stepsTo(source: TargetInfo, destination: Entity) : number;
    static stepsTo(source: TargetInfo, destinationX: number, destinationY: number) : number;
    static stepsTo(sourceX: number, sourceY: number, destinationX: number, destinationY: number) : number;
    static stepsTo(arg1: number | Entity | TargetInfo, arg2: number | Entity | TargetInfo, arg3?: number, arg4?: number) : number {    
        const [srcX, srcY, destX, destY] = Geom.parseXY_Array(arg1, arg2, arg3, arg4);
        return Math.abs(destX - srcX) + Math.abs(destY - srcY);
    }
}

/**
 * Quality of life wrapper for ObjectPropertyList values. 
 */
export class ParsedOPL {    
    serial: number;
    keys: Array<string> = ['name'];
    states: Array<string> = [];
    values: { [key: string]: Array<string> } = {};    

    /**
     * @deprecated this is only for unit testing. Use lib.getObjProps() instead.
     */
    constructor(serialOrOpl: number | object) {        
        const opl = typeof serialOrOpl === 'number' ? client.queryItemOPL(serialOrOpl) : serialOrOpl;
        const data: string = opl && 'data' in opl ? `${opl.data}` : '';
        const name: string|null = opl && 'name' in opl ? `${opl.name}` : null;
        this.serial = opl && 'serial' in opl && typeof opl.serial === 'number' ? opl.serial : -1;
        this.parseData(name, data);
    }

    get name(): string|null {return this.getStrValue('name');} 
    get coldResist(): number {return this.getNumVal('cold resist', 0, ['total']);} 
    get fireResist(): number {return this.getNumVal('fire resist', 0, ['total']);} 
    get energyResist(): number {return this.getNumVal('energy resist', 0, ['total']);} 
    get poisonResist(): number {return this.getNumVal('poison resist', 0, ['total']);} 
    get physicalResist(): number {return this.getNumVal('physical resist', 0, ['total']);} 
    get luck(): number {return this.getNumVal('luck', 0, ['total']);} 
    get weight(): number {return this.getNumVal('weight', Number.MAX_VALUE);}
    get durability(): SplitValue|null {return this.getSplitValue('durability');}
    get capacity(): SplitValue|null {return this.getSplitValue('total items');}
    get weaponDamage(): SplitValue|null {return this.getSplitValue('weapon damage');}
    get isBlessed(): boolean {return this.states.includes('blessed');}
    get isTame(): boolean {return this.states.includes('(tame)');}
    get isInsured(): boolean {return this.states.includes('insured');}
    get forGargoyles(): boolean {return this.states.includes('gargoyles only');}
    get forElves(): boolean {return this.states.includes('elves only');}
    get isExceptional(): boolean {return this.states.includes('exceptional');}
    get magicLevel(): number {return this.getQualityLevel(ItemStats.Magic);}
    get artifactLevel(): number {return this.getQualityLevel(ItemStats.Artifacts);}
    get hasNegativeStats(): boolean {return this.getQualityLevel(ItemStats.Negative) > 0;}
    get swingIncrease(): number {return this.getNumVal('swing speed increase', 0, ['total']);} 
    get hitChanceIncrease(): number {return this.getNumVal('hit chance increase', 0, ['total']);} 
    get castIncrease(): number {return this.getNumVal('faster casting', 0, ['total']);} 
    get damageIncrease(): number {return this.getNumVal('damage increase', 0, ['total']);} 
    get spellDamageIncrease(): number {return this.getNumVal('spell damage increase', 0, ['total']);} 
    get lowerManaCost(): number {return this.getNumVal('lower mana cost', 0, ['total']);}
    get lowerReagentCost(): number {return this.getNumVal('lower reagent cost', 0, ['total']);}
    get addedDex(): number {return this.getNumVal('dexterity bonus', 0, ['total']);}
    get addedStr(): number {return this.getNumVal('strength bonus', 0, ['total']);}
    get addedInt(): number {return this.getNumVal('intelligence bonus', 0, ['total']);}
    get manaRegen(): number {return this.getNumVal('mana regeneration', 0, ['total']);}
    get healthRegen(): number {return this.getNumVal('hit point regeneration', 0, ['total']);}
    get manaIncrease(): number {return this.getNumVal('mana increase', 0, ['total']);}
    get staminaIncrease(): number {return this.getNumVal('stamina increase', 0, ['total']);}
    get healthIncrease(): number {return this.getNumVal('hit point increase', 0, ['total']);}
    get skillRequired(): string|null {return this.getStrValue('skill required');}
    get weaponSpeed(): number {return this.getNumVal('weapon speed', 0, ['total']);}

    // TODO: Stretch goal is to add a getter that represents the basic type resolved by the graphic

    private getStrValue(key: string) : string | null {
        if (!(key in this.values)) return null;
        const options = this.values[key];
        return !options || options.length !== 1 ? null : options[0].trim();
    }

    private getQualityLevel(qualitySource: string[]): number {
        const found = qualitySource.filter(x => this.states.includes(x)).map(y => qualitySource.indexOf(y));
        return found.length === 0 ? 0 : Math.max(...found) + 1;
    }

    getAllSkillValues() : {name: string, skill: number, value: number}[]  {
        const result: Array<{name: string, skill: number, value: number}> = [];
        ItemStats.skillNames.forEach((key, idx) => {
            let found = this.getSkillValue(idx);
            if (found === 0) return;
            result.push({name: key, skill: idx, value: found});
        });        
        return result;
    }
    
    getSkillValue(skill: Skills) : number {
        const name = ItemStats.skillNames[skill];
        let result = this.getNumVal(name, 0);
        return result === 0 ? this.getNumVal(`${name} bonus`, 0) : result;
    }

    private getSplitValue(key: string): SplitValue|null {
        const tst = key in this.values;
        if (key in this.values == false) return null;
        const options = this.values[key];
        if (!options || options.length !== 1) return null;
        const found = /-?[0-9\.]+ *[\/\\\-] *-?[0-9\.]+/.exec(options[0] as string);
        if (!found || found.length === 0) return null;
        const values = found[0].replace('\\', '/').replace('-', '/')
                               .split('/').map(part => Number(part.trim()));
        return {lower: values[0], upper: values[1]};
    }

    private contains(source: string, value: string) {
        return source && value && value.length > 0 && source.toLowerCase().includes(value.toLowerCase());
    }

    private getNumVal(key: string, defaultVal: number = -1, ignoreIfContains?: string[]) : number {
        if (!(key in this.values)) return defaultVal;
        const options = ignoreIfContains && ignoreIfContains.length > 0 
                      ? this.values[key].filter(x => ignoreIfContains.every(y => !this.contains(x, y)))
                      : this.values[key];
        if (!options || options.length !== 1) return defaultVal;
        const numbers = /-?\d+\.*\d*/.exec(options[0] as string);
        if (!numbers || numbers.length > 1) return defaultVal;        
        return numbers[0].includes('.') ? Number.parseFloat(numbers[0]) : Number.parseInt(numbers[0]);
    }

    private parseData(name: string|null, data: string) : void {
        this.values['name'] = [name?.trim() ?? ''];
        if (!data || data.length === 0) return;
        data.split('\n').forEach(e => {
            let line = e.replace(/<[^>]+>/g, ''); // remove annotations
            const key = this.extractKey(line);
            if (key.length === 0) return;

            const val = line.substring(key.length).replace(/^:/, '').trim();
            if (val.length === 0) {
                this.states.push(key); // non-value types such as blessed or night sight
            } else if (key in this.values) {
                this.values[key].push(val);
            } else {
                this.keys.push(key);
                this.values[key] = [val];
            }
        });
    }

    private extractKey(text: string) : string {
        const sep = text.indexOf(':');
        if (sep > 0) { 
            return text.slice(0, sep).toLowerCase().trim();
        }

        const found = /^[A-Za-z {}\-]+/.exec(text);
        if (found && found.length > 0) {
            return found[0].toLowerCase().trim();
        }

        return text.toLowerCase().trim();
    }
}


// #endregion Custom Classes




//#region       *** Function Wrappers ***

export const Helper = {

    /**
     * Exists for verifying the _library was imported
     * @param tryClear Optional behavior to clear the UOC console
     */
    loaded: (tryClear: boolean = false) : boolean => {
        if (tryClear) console.clear();
        return true;
    }, 

    /**
     * Extracts the values from a supplied enum container object
     * @param e The primary enum object, not one of its values
     * @returns Array of values from the provided enum container.
     */
    getCustomEnumValues: (e: any) : any[] => {
        // TODO: figure out a universal enum value extraction, this only works for strict number based versions.
        return Object.values(e).slice(Object.keys(e).length / 2);
    },

    /**
     * Extracts the values from a supplied enum container object
     * @param e The primary enum object, not one of its values
     * @returns Array of values from the provided enum container.
     */
    getCustomObjectValues: (e: any) : any[] => {
        return Object.values(e);
    },


}


export const Debug = {
    
    /**
     * A dev debug utility that attempts to log all of the available properties and methods in the arguments derived object hierarchy
     * @param obj Whatever you want to extract property/method names from
     */    
    getObjProps: (obj: any) => {  
        log(Object.getOwnPropertyNames(obj));
        let proto = Object.getPrototypeOf(obj);
        while (proto) {
            log(Object.getOwnPropertyNames(proto));
            proto = Object.getPrototypeOf(proto);
        }
    },


}




export const World = {

    /**
     * Generic function that helps you find a valid place to drop something into the world
     * @param itm  Item or GameObject serial representing an droppable Item
     * @returns true if the Item XY coordinates have changed
     */
    tryDropItem: (itm: Item) : boolean => {
        const dropMatrix = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], 
                            [1, 1], [-1, -1], [1, -1], [-1, 1]];
        const initX = itm.x;
        const initY = itm.y;
        let enabled = true;
        let i = 0;
        do {
            player.moveItemOnGroundOffset(itm.serial, ...dropMatrix[i++]);
            sleep(500); // Lowering this causes additional iterations
            enabled = itm.x === initX && itm.y === initY;            
        } while (i < dropMatrix.length && enabled)
        
        sleep(500);
        return enabled ? false : true; // still enabled === did not drop 
    },


    /**
     * Manged version of client.findAllOfType that defaults to using the world search target and filters for nearest match.
     * If you are in a mine and dumping Iron ore as you go, this could help you interact with the closest pile.
     * This is useful for finding/collecting arrows, ore piles, etcetera.
     * @param graphic Required Graphic type filter
     * @param hue Optional hue filter
     * @returns the matching Item closest to the Player found or null if it could not be located
     */
    findNearestItem: (graphic: number, hue?: number) : Item | null => {
        let result = null;
        let distance = 9999;
        client.findAllOfType(graphic, hue, "world").forEach((itm) => {
            if (!('x' in itm) || itm._tag !== 'Item') return; // skip anything without a coordinate
            
            let d = Geom.distTo(player, itm);;
            if (d < distance) {
                result = itm;
                distance = d;
            }
        });
        return result;
    },

    moveToPackAnimal: (itm: Item) : boolean => {
        if (!itm || itm.amount === 0) return false;
        const initWeight = player.weight;
        const animals = World.getPackAnimals();
        if (animals.length === 0) return false;
        let itmQty = itm.amount;        
        const itmWeight = getObjProps(itm).weight;
        const itmMin = itmWeight / itmQty;
        let result = false;
        animals.forEach(g => {
            if (result) return;
            const opl = getObjProps(g);
            if (opl.weight + itmMin > 1600) return; // pack animal is full
            const spaceQty = Math.trunc((1600 - opl.weight) / itmMin);
            if (spaceQty >= itmQty) {
                player.moveItem(itm, g);
                sleep(1000);
                result = player.weight < initWeight;
            } else {
                itmQty -= player.moveItem(itm, g, undefined, undefined, undefined, spaceQty);
                sleep(1000);
                // result is not updated to continue trying more pack animals
            }
        });
        return player.weight === initWeight - itmWeight;
    },

    getPackAnimals: (range: number = 2) : Array<Mobile> => {        
        let result : Array<Mobile> = [];
        if (player.followers === 0) return result;        
        [Gfx.Mobile.Pets.PackHorse, Gfx.Mobile.Pets.PackLlama, Gfx.Mobile.Pets.Beetle].forEach(g => {
            (client.findAllOfType(g, undefined, "world", undefined, 2) ?? []).forEach(m => {                
                if (m && Geom.distTo(player, m) <= range) result.push(m as Mobile);
            });
        });
        return result;
    }


}

// #endregion Function Wrappers




//#region       *** Exported Functions ***

export function getObjProps(source: number | Entity | TargetInfo) {    
    const result = new ParsedOPL(typeof source === 'number' ? source : source.serial);
    console.log(`NAME: ${result.name}`);
    console.log(`WEIGHT: ${result.weight}`);
    return result;
}


// #endregion Function Wrappers

