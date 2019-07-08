import React from 'react';
import { Entity, Zone } from 'cartomapper';

import { ZoneEntity, ZoneNeighbour } from './zoneEntity';
import { baseSquareSize } from '../data/constants';
import { ZoneRow } from '../components/zoneRow';
import { InternalMap } from '../components/internalMap';

export class MapEntity {
    private zones: ZoneEntity[][] = [];

    public readonly mapSize: [number, number];

    public constructor(zones: Zone[][], entities: Entity[], mapSize?: [number, number]) {
        this.mapSize = [baseSquareSize * zones[0].length, baseSquareSize * zones.length];

        // Get the size of each squares
        let squareSize: [number, number] = [baseSquareSize, baseSquareSize];
        if (mapSize) {
            squareSize = [Math.floor(mapSize[0] / zones[0].length), Math.floor(mapSize[1] / zones.length)];
            this.mapSize = mapSize;
        }

        zones.forEach((zone: Zone[], row: number): void => {
            zone.forEach((subZone: Zone, col: number): void => {
                if (this.zones.length - 1 < row) {
                    this.zones.push([]);
                }
                this.zones[row].push(new ZoneEntity(subZone, [col, row], squareSize, entities));
            });
        });

        this.zones.forEach((zone: ZoneEntity[], row: number): void => {
            zone.forEach((subZone: ZoneEntity, col: number): void => {
                const neighbours: ZoneNeighbour = {};
                // Mapping north neighbours
                if (row > 0) {
                    neighbours.n = this.zones[row - 1][col];
                    if (col < zone.length - 1) {
                        neighbours.ne = this.zones[row - 1][col + 1];
                    }
                    if (col > 0) {
                        neighbours.nw = this.zones[row - 1][col - 1];
                    }
                }
                // Mapping east neighbour
                if (col < zone.length - 1) {
                    neighbours.e = this.zones[row][col + 1];
                }
                // Mapping west neighbour
                if (col > 0) {
                    neighbours.w = this.zones[row][col - 1];
                }
                // Mapping south neighbours
                if (row < this.zones.length - 1) {
                    neighbours.s = this.zones[row + 1][col];
                    if (col < zone.length - 1) {
                        neighbours.se = this.zones[row + 1][col + 1];
                    }
                    if (col > 0) {
                        neighbours.sw = this.zones[row + 1][col - 1];
                    }
                }
                subZone.neighbours = neighbours;
            });
        });
    }

    public get entities(): ZoneEntity[][] {
        return this.zones;
    }

    public prerender(): void {
        this.zones.forEach((zone: ZoneEntity[]): void => {
            zone.forEach((subZone: ZoneEntity): void => {
                subZone.prerender();
            });
        });
    }

    public component = (): React.ReactElement | null => {
        return (
            <InternalMap>
                {this.entities.map(
                    (zone: ZoneEntity[], index: number): React.ReactElement => (
                        <ZoneRow key={index}>
                            {zone.map(
                                (SubZone: ZoneEntity): React.ReactElement => (
                                    <SubZone.component key={JSON.stringify(SubZone.position)} />
                                )
                            )}
                        </ZoneRow>
                    )
                )}
            </InternalMap>
        );
    };
}
