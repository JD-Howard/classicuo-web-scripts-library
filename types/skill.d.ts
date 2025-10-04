// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Skill/

/**
 * Interface for skill information.
 * NOTE: Skill values are expressed as integers with no decimal; example 74.6 would be 746
 */
declare interface Skill {
    base: number;
    canBeUsable: boolean;
    cap: number;
    index: number;
    lock: number | SkillLock;
    name: string;
    value: number;
}