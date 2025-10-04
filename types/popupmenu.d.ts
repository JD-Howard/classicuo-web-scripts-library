// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/PopupMenu/
// Status: Initial AI conversion from documentation, audited, refined, and tested.
//         However, there does seem to be some situational context where some of these do/don't function.


/**
 * The PopupMenu class is for interacting with context menus (i.e., when you single click on an item or yourself).
 * PopupMenu is available via the popupMenu variable on the global scope.
 */
interface PopupMenu {
    /**
     * Gets the menu content if it is open
     * NOTE: just using a sleep() causes exists==true but content is an empty array when used with a salvage bag, and reply() does not work.
     * @example
     * const content = popupMenu.content;
     * if (content) {
     *   console.log('Popup menu content:', content);
     * }
     */
    readonly content: undefined | Array<PopupMenuItem>;
    
    /**
     * Checks if a popup currently exists
     * @example
     * if (popupMenu.exists) {
     *   console.log('Popup menu is open');
     * }
     */
    readonly exists: boolean;
    
    /**
     * Closes a popup menu if it exists
     * @example
     * if (popupMenu.exists) {
     *   popupMenu.close();
     * }
     */
    close(): void;
    
    /**
     * Replies to a popup menu. Index 0 is the first item.
     * @param index The index of the menu item to select
     * @example
     * popupMenu.reply(0); // Select the first item
     */
    reply(index: number): void;
    
    /**
     * Requests a popup menu for the given object
     * @param serial The Entity or serial number of the object to request the menu for
     * @param waitMs Optional wait time in milliseconds before returning
     * @returns undefined or boolean indicating success
     * @example
     * popupMenu.request(player);
     * popupMenu.waitUntilOpen(1000); // Wait 1 second for the menu to open
     * popupMenu.reply(0); // Select the first item
     */
    request(serial: Entity | number, waitMs?: number): undefined | boolean;
    
    /**
     * Wait until a popup context menu is open, and return its content or null
     * NOTE: this actually CAN get the content of a salvage bag and then the reply() function subsequently works.
     * @param timeoutMs Optional timeout in milliseconds
     * @returns The menu content or null if timeout
     * @example
     * const content = popupMenu.waitForContent(2000); // Wait up to 2 seconds for content
     * if (content) {
     *   console.log('Menu content received:', content);
     * }
     */
    waitForContent(timeoutMs?: number): null | object; // TODO: Figure out what this object type actually looks like
    
    /**
     * Wait until a popup context menu is open
     * @param timeoutMs Optional timeout in milliseconds
     * @returns True if the menu opened within the timeout, false otherwise
     * @example
     * if (popupMenu.waitUntilOpen(1000)) {
     *   console.log('Popup menu opened successfully');
     *   popupMenu.reply(0);
     * } else {
     *   console.log('Popup menu failed to open within 1 second');
     * }
     */
    waitUntilOpen(timeoutMs?: number): boolean;
}


