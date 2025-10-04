// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Client/
// Status: Initial AI conversion from documentation, audited, refined, tested, and added status messages

interface Client {
    
   
    /**
     * Toggles the Circle of Transparency between states.
     * @status INIT/DOES NOT WORK IN UOAlive
     * @example
     * client.toggleCircleOfTransparency();
     */
    toggleCircleOfTransparency(): void;
    
    /**
     * Gets the current ping to the server (as seen in the Connection gump)
     * @returns The current ping in milliseconds
     * @status Definition audited, refined, UOC editor tested
     */
    getPing(): number;
    
    /**
     * Display a message in the text chat
     * @param message The message to display
     * @param hue Optional color hue for the message
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.sysMsg('A chat in Red', 33);
     * client.sysMsg('A chat in Green', 66);
     */
    sysMsg(
        message: string, 
        hue?: number
    ): void;
    
    /**
     * Display a message overhead of the target entity, but acts like a SysMsg if "world" is provided as serial
     * @param message The message to display
     * @param serial The target entity's serial, GameObject, or "world"
     * @param hue Optional color hue for the message
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.headMsg('A message in Red', player, 33);
     * client.headMsg('A message in Green', player, 66);
     */
    headMsg(
        message: string,
        serial: number | GameObject | "world",
        hue?: number
    ): void;
    
    /**
     * Open the paperdoll for a Mobile.
     * @param serial Optional serial, GameObject, or "world" of the mobile
     * @status INIT/DOES NOT WORK IN UOAlive
     * @example
     * const nearestHuman = client.selectEntity(
     *   SearchEntityOptions.Any,
     *   SearchEntityRangeOptions.Nearest,
     *   SearchEntityTypeOptions.Human,
     *   false
     * );
     * client.openPaperdoll(nearestHuman);
     */
    openPaperdoll(
        serial?: number | GameObject | "world"
    ): void;
    
    /**
     * Attempts to check whether a specific object can be found in the game.
     * This is only useful in situations where your script is using or tracking very specific GameObjects.
     * @param serial The serial number or GameObject to locate. TODO: if you already have the GameObject, then its not really finding anything...
     * @param hue Optional color hue filter
     * @param sourceSerial Optional source container serial. TODO: See if leaving this null searches pack/animal/world
     * @param amount Optional amount filter
     * @param range Optional range filter
     * @returns The found Entity or undefined
     * @status Definition audited, refined, UOC editor tested
     * @example
     * const runebookSerial = 0x401c37fb;
     * const runebook = client.findObject(runebookSerial);
     * if (runebook) {
     *   player.use(runebook);
     * } else {
     *   client.headMsg('Runebook missing!', player.serial);
     * }
     */
    findObject(
        serial: number | GameObject,
        hue?: null | number,
        sourceSerial?: null | number | GameObject | "world",
        amount?: null | number,
        range?: null | number
    ): undefined | Item | Mobile;
    
    /**
     * Attempts to find 1 object with the specified search parameters.     
     * @param graphic The graphic ID to search for
     * @param hue Optional color hue filter
     * @param sourceSerial Optional source container serial. NOTE: this searches player, pack animals and the world if not provided.
     * @param amount Optional amount filter
     * @param range Optional range filter (when combined with source container, specifies depth to search)
     * @returns The found Entity or undefined if not found
     * @status Definition audited, refined, UOC editor tested
     * @example
     * // Print out all the gold in the players backpack, without iterating sub-containers
     * const goldType = 0xeed;
     * ignoreList.clear();
     * let gold: Item | undefined;
     * while ((gold = client.findType(goldType, undefined, player.backpack, undefined, 0) as Item)) {
     *   console.log(gold.name);
     *   ignoreList.add(gold);
     * }
     * @example
     * // Use any bandages that can be found
     * const bandageType = 0xe21;
     * const bandages = client.findType(bandageType);
     * player.use(bandages);
     * target.waitTargetSelf();
     */
    findType(
        graphic: number,
        hue?: null | number,
        sourceSerial?: null | number | GameObject | "world",
        amount?: null | number,
        range?: null | number
    ): undefined | Item | Mobile;
    
    /**
     * Attempts to find all objects of a certain graphic type
     * @param graphic The graphic ID to search for
     * @param hue Optional color hue filter
     * @param sourceSerial Optional source container serial. NOTE: this searches player, pack animals and the world if not provided.
     * @param amount Optional amount filter
     * @param range Optional range filter
     * @returns Array of matching Items/Mobiles
     * @status Definition audited, refined, UOC editor tested
     * @example
     * const goldPile = 0xeed;
     * const piles = client.findAllOfType(goldPile, undefined, 'world');
     * if (piles.length > 0) {
     *   client.headMsg(`Found ${piles.length} gold piles on the ground`, player);
     * } else {
     *   client.headMsg('No gold piles in range', player);
     * }
     */
    findAllOfType(
        graphic: number,
        hue?: null | number,
        sourceSerial?: null | number | GameObject | "world",
        amount?: null | number,
        range?: null | number
    ): Array<Item | Mobile>;
    
    /**
     * Attempts to find all Items of a certain type (graphic)
     * @param graphic The graphic ID to search for
     * @param hue Optional color hue filter
     * @param sourceSerial Optional source container serial
     * @param amount Optional amount filter
     * @param range Optional range filter
     * @returns Array of matching Items
     * @status Definition audited, refined, UOC editor tested
     * @example
     * const goldPile = 0xeed;
     * const piles = client.findAllItemsOfType(goldPile, undefined, 'world');
     * if (piles.length > 0) {
     *   const total = piles.reduce((sum, item) => sum + item.amount, 0);
     *   client.headMsg(`Found ${piles.length} piles, ${total} gold`, player);
     * } else {
     *   client.headMsg('No gold piles in range', player);
     * }
     */
    findAllItemsOfType(
        graphic: number,
        hue?: null | number,
        sourceSerial?: null | number | GameObject | "world",
        amount?: null | number,
        range?: null | number
    ): Array<Item>;
    
    /**
     * Attempts to find all Mobiles of a certain type (graphic)
     * @param graphic The graphic ID to search for
     * @param hue Optional color hue filter
     * @param sourceSerial Optional source container serial
     * @param amount Optional amount filter
     * @param range Optional range filter
     * @returns Array of matching Mobiles
     * @status TODO: Why is there a source? where else would I find mobiles except for 'world'?
     * @example
     * const sheepGraphic = 0xcf;
     * const sheep = client.findAllMobilesOfType(sheepGraphic);
     * if (sheep.length > 0) {
     *   client.headMsg(`I count ${sheep.length} sheep`, player);
     * } else {
     *   client.headMsg('No sheep here!', player);
     * }
     */
    findAllMobilesOfType(
        graphic: number,
        hue?: null | number,
        sourceSerial?: null | number | GameObject | "world",
        amount?: null | number,
        range?: null | number
    ): Array<Mobile>;
    
    /**
     * Attempts to find the object at the specified layer, if it exists
     * @param serial The serial number or Entity
     * @param layer The layer to search
     * @returns The found Item or undefined. Note: even your mount returns Item not Mobile
     * @status Definition audited, refined, UOC editor tested
     * @example
     * const helm = client.findItemOnLayer(player, Layers.Helmet);
     * if (helm) {
     *   client.headMsg(`Removing helm`, player);
     *   player.moveItem(helm, player.backpack);
     * } else {
     *   client.headMsg('Not wearing a helm', player.serial);
     * }
     */
    findItemOnLayer(
        serial: number | Entity,
        layer: Layers
    ): undefined | Item;
    
    /**
     * Returns the entity based on the search criteria
     * @param searchOpt Search entity options
     * @param searchRangeOpt Search range options
     * @param searchTypeOpt Search type options
     * @param asFriend Whether to treat as friend
     * @returns The found entity or undefined
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.selectEntity(
     *   SearchEntityOptions.Enemy | SearchEntityOptions.Gray,
     *   SearchEntityRangeOptions.Nearest,
     *   SearchEntityTypeOptions.Any,
     *   false
     * );
     * @example
     * client.selectEntity(
     *   SearchEntityOptions.Innocent,
     *   SearchEntityRangeOptions.Nearest,
     *   SearchEntityTypeOptions.Human,
     *   false
     * );
     */
    selectEntity(
        searchOpt: number | SearchEntityOptions,
        searchRangeOpt: number | SearchEntityRangeOptions,
        searchTypeOpt: number | SearchEntityTypeOptions,
        asFriend: boolean
    ): undefined | Mobile;
    
    /**
     * Triggers the All Names macro which shows name overheads for all entities on-screen
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.allNames();
     */
    allNames(): void;
    
    /**
     * Triggers the Quit Game dialogue
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.quitGame();
     */
    quitGame(): void;
    
    /**
     * Toggles whether the player always runs despite the mouse distance from the player mobile
     * @status Definition audited, refined, UOC editor tested, but found the SysMsg to be backwards.
     * @example
     * client.toggleAlwaysRun();
     */
    toggleAlwaysRun(): void;
    
    /**
     * Closes all gumps that aren't the Top Bar, Buff bar, or the World view (radar)
     * @status Definition audited, refined, UOC editor tested, but includes paperdoll, health bars, backpack, etc
     * @example
     * client.closeAllGumps();
     */
    closeAllGumps(): void;
    
    /**
     * Closes all corpses on-screen
     * @status Definition audited and refined
     * @example
     * client.closeCorpses();
     */
    closeCorpses(): void;
    
    /**
     * Closes all health bars on-screen, but not the Player health bar.
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.closeAllHealthBars();
     */
    closeAllHealthBars(): void;
    
    /**
     * Closes all inactive health bars (i.e. dead or off-screen entities)
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.closeInactiveHealthBars();
     */
    closeInactiveHealthBars(): void;
    
    /**
     * Reset the viewport zoom back to default (1.1)
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.zoomReset();
     */
    zoomReset(): void;
    
    /**
     * Zooms in the viewport
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.zoomIn();
     */
    zoomIn(): void;
    
    /**
     * Zooms out the viewport
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.zoomOut();
     */
    zoomOut(): void;
    
    /**
     * Toggles the chat visibility, e.g. the bar at the bottom of the game viewport
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.toggleChatVisibility();
     */
    toggleChatVisibility(): void;
    
    /**
     * Sets the grab bag used by Grid Loot.
     * NOTE: Does not work in UOAlive for bags within your backpack, but does work if it is placed on the ground or a pack animal.
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.setGrabBag();
     */
    setGrabBag(): void;
    
    /**
     * Toggles whether entities have static name plates
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.toggleNameOverheads();
     */
    toggleNameOverheads(): void;
    
    /**
     * Toggles whether mobiles have auras underneath them
     * @status Definition audited, refined, UOC editor tested
     * @example
     * client.toggleAuras();
     */
    toggleAuras(): void;
    
    /**
     * Gets static tile information
     * @param graphic The graphic ID
     * @returns Tile information or undefined
     * @status Definition audited, refined, UOC editor tested, but did not provide a flags value.
     */
    getStatic(graphic: number): undefined | TileInfo;
    
    /**
     * Gets tile information
     * @param graphic The graphic ID
     * @returns Tile information or undefined
     * @status Definition audited, refined, UOC editor tested, but getStatic() actually provided flags value.
     */
    getTile(graphic: number): undefined | TileInfo;
    
    /**
     * Gets terrain list at specified world coordinate that
     * Note: this does NOT report anything about objects laying at the specified coordinates.
     * @param x X coordinate
     * @param y Y coordinate
     * @returns Array of terrain objects or undefined'
     * @status Definition audited, refined, UOC editor tested, but uncertain of distance, I tested player.x+40/y+40 with success.
     * @example
     * client.getTerrainList(player.x, player.y); // inspect players current coordinate
     */
    getTerrainList(x: number, y: number): undefined | TerrainInfo[];
    
    /**
     * Sends a buy request to a vendor
     * @param vendorSerial The Entity or serial number of the vendor
     * @param items Array of items to buy
     * @status Definition audited, refined, UOC editor tested
     * @example
     * player.say('vendor buy');
     * const data = Gump.lastVendorBuyData;
     * if (data && data.type === 'buy') {
     *   const ingots = data.items.filter((i) => i.name.toLowerCase().includes('ingot'));
     *   client.sendBuyRequest(data.vendor, ingots);
     *   console.log('Bought items', ingots);
     * }
     */
    sendBuyRequest(vendorSerial: number | Mobile, items: VendorPropertyData[]): void;
    
    /**
     * Sends a sell request to a vendor
     * @param vendorSerial The Entity or serial number of the vendor
     * @param items Array of items to sell
     * @status Definition audited, refined, UOC editor tested
     * @example
     * player.say('vendor sell');
     * const data = Gump.lastVendorSellData;
     * if (data && data.type === 'sell') {
     *   const tongs = data.items.filter((i) => i.name.toLowerCase() === 'tongs');
     *   client.sendSellRequest(data.vendor, tongs);
     *   console.log('Sold items', tongs.map((i) => i.name));
     * }
     */
    sendSellRequest(vendorSerial: number | Mobile, items: VendorPropertyData[]): void;
    
    /**
     * Queries the Object Property List (OPL) for an item
     * @param itemSerial The serial number of the item to query
     * @returns The OPL data or undefined
     * @status Definition audited, refined, UOC editor tested
     */
    queryItemOPL(itemSerial: number): undefined | ObjectPropertyData;
    
    /**
     * Queries the single click name for an item
     * @param itemSerial The serial number of the item to query
     * @returns The single click name or undefined
     * @status Definition audited, refined, UOC editor tested
     */
    queryItemSingleClickName(itemSerial: number): undefined | string;
}

