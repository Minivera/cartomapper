export enum EntityTypes {
    Land = 'land',
    River = 'river',
    Water = 'water',
}

export interface Metadata {
    type: EntityTypes;
    [x: string]: unknown;
}

export interface LandMetadata extends Metadata {
    color: string;
    height: number;
}

export interface RiversMetadata extends Metadata {
    color: string;
    width: number;
}

export interface WaterMetadata extends Metadata {
    color: string;
    darkens: boolean;
    connects: boolean;
}
