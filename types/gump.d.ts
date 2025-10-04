// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Gump/
// Status: Initial AI conversion from documentation, organized and partially tested in UOC

/**
 * Static class for interacting with Gumps that are sent to the client by the server.
 * Server gumps have a unique serial per shard, and can only have one open at a time.
 * An instance of Gump interacts with any gump of that serial, and it may become "invalid"
 * if the gump closes externally (e.g., by the shard or the user).
 */
declare static class Gump implements GameObject {
    
    // --- Static Properties & Methods ---

    /**
     * Get a reference to the last Gump sent by the server.
     * Returns undefined if the gump is no longer open.
     * @example
     * Gump.last?.close();
     */
    static readonly last: Gump | null;

    /**
     * The server serial of the last gump sent by the server.
     * May no longer be open, check with exists first.
     */
    static readonly lastSerial: number;

    /**
     * Returns the data for the last vendor buy gump seen
     * @example
     * const data = Gump.lastVendorBuyData;
     * if (data && data.type === 'buy') {
     *   // Lets buy all his ingots
     *   const ingots = data.items.filter((i) => i.name.toLowerCase().includes('ingot'));
     *   client.sendBuyRequest(data.vendor, ingots);
     *   console.log('Bought items', ingots);
     * }
     */
    static readonly lastVendorBuyData: undefined | VendorGumpData;

    /**
     * Returns the data for the last vendor sell gump seen
     * @example
     * player.say('vendor sell');
     * const data = Gump.lastVendorSellData;
     * if (data && data.type === 'sell') {
     *   // Make sure we don't try to sell on a buy gump
     *   // Lets sell all our Tongs
     *   const tongs = data.items.filter((i) => i.name.toLowerCase() === 'tongs');
     *   client.sendSellRequest(data.vendor, tongs);
     *   console.log('Sold items', tongs.map((i) => i.name));
     * }
     */
    static readonly lastVendorSellData: undefined | VendorGumpData;

    /**
     * Checks if the gump is still open, i.e., the server hasn't closed it or the player
     */
    readonly exists: boolean;

    /**
     * Closes all gumps that aren't the Top Bar, Buff bar, or the World view (radar)
     * Same as the Close Gumps hotkey
     * @example
     * Gump.closeAll();
     */
    static closeAll(): void;

    /**
     * Checks if a gump with the provided server serial is open without making a new instance of Gump
     * @param serial The serial number to check
     * @returns True if the gump exists
     * @example
     * if (Gump.exists(0xbb1b5472)) {
     *   player.say('My lovely lady gumps, check it out');
     * }
     */
    static exists(serial: number): boolean;

    /**
     * Find a gump by its serial or containing certain text, or wait for it to appear
     * @param serialOrText The serial number or text to search for
     * @param timeoutMs Timeout in milliseconds (default: 5000)
     * @param fromServer Whether to search for server gumps (default: true)
     * @returns The found gump or undefined
     * @example
     * const gump = Gump.findOrWait(0xbb1b5472, 100); // Wait 100 milliseconds for the gump to appear
     * if (gump) {
     *   gump.reply(1); // Gump is open, simulate pressing a button
     * }
     * @example
     * const gump = Gump.findOrWait('Blacksmithy Selection Menu');
     * if (gump) {
     *   gump.reply(1); // Gump is open, simulate pressing a button
     * }
     * @example
     * const bag = client.findObject(0x4021c7b1);
     * if (bag) {
     *   player.use(bag);
     *   const gump = Gump.findOrWait(bag, 1000, false); // Search for local gumps
     *   if (gump) {
     *     client.sysMsg('gump found');
     *   }
     * }
     */
    static findOrWait(
        serialOrText: number | string | GameObject,
        timeoutMs?: number,
        fromServer?: boolean
    ): Gump | undefined;

    /**
     * Waits for a vendor buy or sell gump to appear and returns the data.
     * Or if no gump appears it will time out returning undefined
     * @param timeoutMs Timeout in milliseconds
     * @returns Vendor gump data or undefined
     * @example
     * // Caution! This sells everything!
     * player.say('vendor sell');
     * const data = Gump.waitForVendorGumpData();
     * if (data && data.type === 'sell') {
     *   // Check the gump is a sell
     *   client.sendSellRequest(data.vendor, data.items); // Sell ALL the items the vendor will take
     *   console.log('Sold items', data.items.map((i) => i.name)); // Print what we sold
     * }
     */
    static waitForVendorGumpData(timeoutMs?: number): VendorGumpData | undefined;




    // --- Instance Properties & Methods ---

    /**
     * Closes the gump
     * @example
     * if (Gump.last?.containsText('Chat')) {
     *   gump.last?.close();
     * }
     */
    close(): void;
    
    /**
     * Checks if the gump contains a certain string, case-insensitive.
     * @param value The text to search for
     * @returns True if the text is found
     * @example
     * const gump = Gump.findOrWait(0xbb1b5472, 100);
     * if (gump.containsText('Tailoring')) {
     *   player.say('I hate tailors');
     *   gump.close();
     * }
     */
    containsText(value: string): boolean;

    /**
     * Checks if the gump has the button id.
     * Useful if you want to prevent clicking a button that doesn't exist.
     * @param id The button ID to check
     * @returns True if the button exists
     * @example
     * const gump = Gump.findOrWait(0x59);
     * if (gump && gump.hasButton(10)) {
     *   gump.reply(10); // gump is open and has a button with id 10
     * }
     */
    hasButton(id: number): boolean;

    /**
     * Select an item in the old-school T2A horizontal menu gump.
     * @param graphic The graphic ID to select
     * @param hue The color hue (optional)
     * @example
     * const gump = Gump.findOrWait(0x59);
     * if (gump) {
     *   console.log('Gump exists.');
     *   gump.horizontalMenuSelect(gump);
     * }
     */
    horizontalMenuSelect(graphic: number, hue?: number): void;

    /**
     * Replies to a gump by "pressing" one of the buttons
     * @param buttonID The button ID to press
     * @example
     * const gump = Gump.findOrWait(0xbb1b5472, 100);
     * if (gump?.containsText('Alchemy')) {
     *   // If there's a gump open with that serial, check if it has `Alchemy` in it.
     *   gump.reply(1); // Craft something
     * }
     */
    reply(buttonID: number): void;

    /**
     * Check or uncheck a checkbox/radio button
     * @param serial The serial number of the checkbox/radio button. TODO: determine if this is an id rather than serial
     * @param value True to check, false to uncheck
     * @example
     * const gump = Gump.findOrWait(0x59);
     * gump?.setCheckbox(serial, true); // if the gump is open, check the checkbox/radio control
     * gump?.reply(1); // Press a button to reply
     */
    setCheckbox(serial: number, value: boolean): void;

    /**
     * Set the contents of a text entry in a gump
     * @param localSerial The local serial number of the text entry. TODO: determine if this is an id rather than serial
     * @param value The text value to set
     * @example
     * const gump = Gump.findOrWait(0x59);
     * gump?.setTextEntry(0x01, 'Hello there'); // if the gump is open, set the text entries content
     * gump?.reply(1); // Press a button to reply
     */
    setTextEntry(localSerial: number, value: string): void;

    /**
     * Attempts to switch the page if possible.
     * @param page The page number to switch to
     * @Status Not currently working in UOAlive
     * @example
     * const gump = Gump.findOrWait(0x59);
     * gump?.switchPage(2); // if gump is open, try changing to page 2
     */
    switchPage(page: number): void;
}



