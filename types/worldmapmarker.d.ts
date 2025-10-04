// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/WorldMap/
// Status: Initial AI conversion from documentation, verified nothing was missing/added by AI, but untested.

/**
 * Interface for a World Map marker [& Partial]
 * When the result is a partial, then the ? marked variables may be null/undefined
 */
interface WorldMapMarker {
    /**
     * Color of the marker, e.g. "blue"
     */
    color?: string;
    
    /**
     * Map Index/Id to place the marker on
     */
    mapId?: number;
    
    /**
     * Name of the marker
     */
    name: string;
    
    /**
     * X coordinate
     */
    x: number;
    
    /**
     * Y coordinate
     */
    y: number;
    
    /**
     * ZoomLevel at which the marker appears
     */
    zoomLevel?: number;
}