// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/PopupMenu/
// This object was undocumented, but derived from UOC editor testing

/**
 * Interface that represents the return from popupMenu.content
 * @note Creates intelligence, but should not be directly referenced in the _library or scripts
 */
declare interface PopupMenuItem {
    cliloc: number;
    index: boolean;
    hue: number;
    replacedHue: number;
    flags: number | SkillLock;

    /**
     * Appears to be the display name of a popup menu item
     */
    text: string;
}