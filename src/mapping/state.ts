import {
    WrongQuadrantSizeError,
    WrongSectorSizeError,
    WrongSubsectorSizeError,
    UnassembledError,
    EmptyMapError,
} from '../errors';
import { Quadrant, Sector, Subsector, Zone, Map, Entity } from 'cartomapper';
import { MapEntity } from '../entities/mapEntity';

export class State {
    private baseMap: Map;

    private internalMap?: MapEntity;

    public constructor(baseMap: Map) {
        this.baseMap = baseMap;
    }

    // Assemble the map into mapped zones objects, transforming all divisions into a flat 2D Array
    public assemble(entities: Entity[], mapSize?: [number, number]): State {
        if (this.baseMap.quadrants) {
            this.internalMap = new MapEntity(this.assembleQuadrants(this.baseMap.quadrants), entities, mapSize);
        } else if (this.baseMap.zones) {
            this.internalMap = new MapEntity(this.baseMap.zones, entities, mapSize);
        } else {
            throw new EmptyMapError();
        }

        return this;
    }

    public prerender(): State {
        if (!this.internalMap) {
            throw new UnassembledError();
        }

        this.internalMap.prerender();
        return this;
    }

    public get map(): MapEntity | undefined {
        return this.internalMap;
    }

    private assembleQuadrants(quadrants: Quadrant[][]): Zone[][] {
        if (!quadrants.length || !quadrants[0].length) {
            // Map is empty
            return [];
        }

        // Get the base size to validate that all quadrants have the same size
        const firstElement = quadrants[0][0];
        let rows: number, columns: number;
        if (firstElement.sectors) {
            rows = firstElement.sectors.length;
            columns = rows ? firstElement.sectors[0].length : 0;
        } else if (firstElement.zones) {
            rows = firstElement.zones.length;
            columns = rows ? firstElement.zones[0].length : 0;
        }

        const zones: Zone[][] = [];
        // Loop through all quadrants
        quadrants.forEach((el: Quadrant[], currentRow: number): void => {
            el.forEach((subEl: Quadrant, currentCol: number): void => {
                let localZones: Zone[][] = [];
                if (subEl.sectors) {
                    if (!State.sameSize(subEl.sectors, rows, columns)) {
                        throw new WrongQuadrantSizeError(
                            currentRow,
                            currentCol,
                            rows,
                            columns,
                            subEl.sectors.length,
                            subEl.sectors.length ? subEl.sectors[0].length : 0
                        );
                    }
                    localZones = this.assembleSectors(subEl.sectors, currentRow, currentCol);
                } else if (subEl.zones) {
                    if (!State.sameSize(subEl.zones, rows, columns)) {
                        throw new WrongQuadrantSizeError(
                            currentRow,
                            currentCol,
                            rows,
                            columns,
                            subEl.zones.length,
                            subEl.zones.length ? subEl.zones[0].length : 0
                        );
                    }
                    localZones = subEl.zones;
                }

                State.mergeZones(zones, localZones, currentRow);
            });
        });

        return zones;
    }

    private assembleSectors(sectors: Sector[][], quadRow: number, quadCol: number): Zone[][] {
        if (!sectors.length || !sectors[0].length) {
            // Quadrant is empty
            return [];
        }

        // Get the base size to validate that all sectors have the same size
        const firstElement = sectors[0][0];
        let rows: number, columns: number;
        if (firstElement.subsectors) {
            rows = firstElement.subsectors.length;
            columns = rows ? firstElement.subsectors[0].length : 0;
        } else if (firstElement.zones) {
            rows = firstElement.zones.length;
            columns = rows ? firstElement.zones[0].length : 0;
        }

        const zones: Zone[][] = [];
        // Loop through all quadrants
        sectors.forEach((el: Sector[], currentRow: number): void => {
            el.forEach((subEl: Sector, currentCol: number): void => {
                let localZones: Zone[][] = [];
                if (subEl.subsectors) {
                    if (!State.sameSize(subEl.subsectors, rows, columns)) {
                        throw new WrongSectorSizeError(
                            currentRow,
                            currentCol,
                            quadRow,
                            quadCol,
                            rows,
                            columns,
                            subEl.subsectors.length,
                            subEl.subsectors.length ? subEl.subsectors[0].length : 0
                        );
                    }
                    localZones = this.assembleSubsectors(subEl.subsectors, currentRow, currentCol, quadRow, quadCol);
                } else if (subEl.zones) {
                    if (!State.sameSize(subEl.zones, rows, columns)) {
                        throw new WrongSectorSizeError(
                            currentRow,
                            currentCol,
                            quadRow,
                            quadCol,
                            rows,
                            columns,
                            subEl.zones.length,
                            subEl.zones.length ? subEl.zones[0].length : 0
                        );
                    }
                    localZones = subEl.zones;
                }

                State.mergeZones(zones, localZones, currentRow);
            });
        });

        return zones;
    }

    private assembleSubsectors(
        subsectors: Subsector[][],
        sectRow: number,
        sectCol: number,
        quadRow: number,
        quadCol: number
    ): Zone[][] {
        if (!subsectors.length || !subsectors[0].length) {
            // Sector is empty
            return [];
        }

        // Get the base size to validate that all sectors have the same size
        const firstElement = subsectors[0][0];
        const rows = firstElement.zones ? firstElement.zones.length : 0;
        const columns = firstElement.zones && rows ? firstElement.zones[0].length : 0;

        const zones: Zone[][] = [];
        // Loop through all quadrants
        subsectors.forEach((el: Subsector[], currentRow: number): void => {
            el.forEach((subEl: Subsector, currentCol: number): void => {
                if (!subEl.zones) {
                    throw new EmptyMapError();
                }
                if (!State.sameSize(subEl.zones, rows, columns)) {
                    throw new WrongSubsectorSizeError(
                        currentRow,
                        currentCol,
                        quadRow,
                        quadCol,
                        sectRow,
                        sectCol,
                        rows,
                        columns,
                        subEl.zones.length,
                        subEl.zones.length ? subEl.zones[0].length : 0
                    );
                }
                const localZones = subEl.zones;

                State.mergeZones(zones, localZones, currentRow);
            });
        });

        return zones;
    }

    private static sameSize(array: unknown[][], rows: number, columns: number): boolean {
        if (rows && columns) {
            // If any of the length are undefined, yet we had a value for rows and columns
            if (!array.length || !array[0].length) {
                return false;
            }
            // If any of the lengths are not the same as rows and columns
            if (array.length !== rows || array[0].length !== columns) {
                return false;
            }
        } else if (rows) {
            // If the array has no rows or has columns, yet the rows were set and the columns were not.
            if (!array.length || array[0].length) {
                return false;
            }
            // If the array rows are not the same as the rows
            if (array.length !== rows) {
                return false;
            }
        }
        return true;
    }

    private static mergeZones(baseZones: Zone[][], toMerge: Zone[][], offset: number): void {
        // Check if the current offset is higher than the current size of the zones
        if (offset * toMerge.length >= baseZones.length) {
            // If yes, add new rows made up of the merging columns
            toMerge.forEach((el: Zone[]): void => {
                baseZones.push(el);
            });
        } else {
            // Otherwise, merge the zones at the end of one of the columns
            toMerge.forEach((el: Zone[], index: number): void => {
                const currentIndex = offset * toMerge.length + index;
                baseZones[currentIndex] = baseZones[currentIndex].concat(el);
            });
        }
    }
}
