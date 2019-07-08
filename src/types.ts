import { Metadata } from './internalTypes';

// Base entity definition for something to draw on the map
export interface Entity {
    // The name of the entity for looking up in the entity database
    name: string;

    // If that entity has a primitive type, entities can be extended for drawing purposes.
    primitive?: string;

    // Whether or not that entity can be interacted with
    interactive: boolean;

    // Metadata used by internal entities for rendering purposes. Do not use.
    metadata: Metadata;
}

export interface Configuration {
    // Whether or not that map can be interacted with
    interactive?: boolean;

    // Checks whether or not that map should have a camera. If not, it will render without the ability
    // to zoom or move around.
    hasCamera?: boolean;

    // Additional entities to add to this map's entity database
    entities?: Entity[];

    // The base map size for this map. If omitted, will be calculated from the zones with a base zone size of 15x15.
    mapSize?: [number, number];

    // The size of the camera. If omitted, will be the same as mapSize.
    cameraSize?: [number, number];

    // The map to render in the components.
    map: Map;
}

// A square zone on the map, this is what will be ultimately drawn
export interface Zone {
    // Which entities are drawn in this zone
    entities: string[];
}

// The smallest division of a map, useful to divide a map into multiple files.
export interface Subsector {
    // Which zones are contained in this subsector.
    zones?: Zone[][];
}

// A division of the map that allows a user to divide quadrants into smaller sectors.
export interface Sector {
    // Which zones are contained in this sector. If subsectors are provided, this array will be ignored.
    zones?: Zone[][];

    // Subsectors dividing that sector. The number of rows and columns must be consistent between sectors.
    subsectors?: Subsector[][];
}

// The highest division of a map, allows a user to divide the map into multiple files.
export interface Quadrant {
    // Which zones are contained in this quadrant. If sectors are provided, this array will be ignored.
    zones?: Zone[][];

    // Sectors dividing that quadrant. The number of rows and columns must be consistent between quadrant.
    sectors?: Sector[][];
}

// The main map object that defines what map to draw. Can contain zones or quadrants for division.
export interface Map {
    // Which zones are contained in this map. If quadrants are provided, this array will be ignored.
    zones?: Zone[][];

    // The quadrants dividing this map into various sections.
    quadrants?: Quadrant[][];
}
