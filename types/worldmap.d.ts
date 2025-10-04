// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/WorldMap/
// Status: Initial AI conversion from documentation, verified nothing was missing/added by AI, but untested.

/**
 * The WorldMap class is for interacting with the world map functionality in ClassicUO.
 * WorldMap is accessible in the global scope via the variable `worldMap`.
 */
interface WorldMap {
    /**
     * Gets list of World Map markers.
     * Note: this list is readonly, use addMarker or removeMarker to manage the World Map markers.
     */
    readonly markers: readonly WorldMapMarker[];
    
    /**
     * Adds a marker to the World Map.
     * @param marker The marker to add (can be partial or complete)
     * @returns The added WorldMapMarker
     * @example
     * const marker = worldMap.addMarker({ name: 'Here', x: player.x, y: player.y, color: 'green' });
     */
    addMarker(marker: WorldMapMarker): WorldMapMarker;
    
    /**
     * Closes the World Map gump.
     * @example
     * worldMap.close();
     */
    close(): void;
    
    /**
     * Changes the current location of the World Map, which also enables Free View.
     * @param coords The coordinates to go to
     * @param coords.x The X coordinate
     * @param coords.y The Y coordinate
     * @example
     * worldMap.goTo({ x: player.x, y: player.y });
     */
    goTo(coords: { x: number; y: number }): void;
    
    /**
     * Opens the World Map gump.
     * @example
     * worldMap.open();
     */
    open(): void;
    
    /**
     * Attempts to parse a location string and convert into map coordinates.
     * Note: Currently only supports Sextant coordinates, e.g. "100o25'S,40o04'E"
     * @param input The location string to parse
     * @returns The parsed coordinates or undefined
     * @example
     * const loc = worldMap.parseLocation("100o25'S,40o04'E");
     * const marker = worldMap.addMarker({
     *   name: 'Sextant Loc',
     *   color: 'green',
     *   x: loc.x,
     *   y: loc.y
     * });
     */
    parseLocation(input: string): undefined | { x: number; y: number };
    
    /**
     * Removes all World Map markers.
     */
    removeAllMarkers(): void;
    
    /**
     * Remove a marker from the World Map.
     * @param marker The marker to remove (can be by name or WorldMapMarker)
     * @returns True if the marker was successfully removed
     * @example
     * worldMap.removeMarker('Here');
     */
    removeMarker(marker: string | WorldMapMarker): boolean;
}

