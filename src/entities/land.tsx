import React from 'react';
import { Entity } from 'cartomapper';

import { LandMetadata } from '../internalTypes';
import { BaseEntity } from './baseEntity';
import { ZoneNeighbour } from './zoneEntity';

export class Land extends BaseEntity {
    private readonly size: [number, number];

    private metadata: LandMetadata;

    public constructor(size: [number, number], metadata: LandMetadata, primitive: Entity, base: Entity) {
        super(primitive, base);
        this.size = size;
        this.metadata = metadata;
        this.type = 'land';
    }

    public prerender(neighbours: ZoneNeighbour): void {
        const transitions: React.ReactElement[] = [];

        // Straight directions
        if (neighbours.n && neighbours.n.hasEntity('land')) {
            const northLand = neighbours.n.getEntity('land') as Land;
            if (northLand.primitive.name !== this.primitive.name && this.metadata.height > northLand.metadata.height) {
                // If a child exists to the north
                transitions.push(
                    <rect width={this.size[0]} height={this.size[1] / 2} fill={northLand.metadata.color} key="north" />
                );
            }
        }
        if (neighbours.e && neighbours.e.hasEntity('land')) {
            const eastLand = neighbours.e.getEntity('land') as Land;
            if (eastLand.primitive.name !== this.primitive.name && this.metadata.height > eastLand.metadata.height) {
                // If a child exists to the north
                transitions.push(
                    <rect
                        x={this.size[0] - this.size[0] / 2}
                        width={this.size[0] / 2}
                        height={this.size[1]}
                        fill={eastLand.metadata.color}
                        key="east"
                    />
                );
            }
        }
        if (neighbours.s && neighbours.s.hasEntity('land')) {
            const southLand = neighbours.s.getEntity('land') as Land;
            if (southLand.primitive.name !== this.primitive.name && this.metadata.height > southLand.metadata.height) {
                // If a child exists to the south
                transitions.push(
                    <rect
                        y={this.size[1] - this.size[1] / 2}
                        width={this.size[0]}
                        height={this.size[1] / 2}
                        fill={southLand.metadata.color}
                        key="south"
                    />
                );
            }
        }
        if (neighbours.w && neighbours.w.hasEntity('land')) {
            const westLand = neighbours.w.getEntity('land') as Land;
            if (westLand.primitive.name !== this.primitive.name && this.metadata.height > westLand.metadata.height) {
                // If a child exists to the west
                transitions.push(
                    <rect
                        width={this.size[0] / 2}
                        height={this.size[1]}
                        fill={westLand.metadata.color}
                        key="west"
                    />
                );
            }
        }

        // Diagonal directions
        if (neighbours.ne && neighbours.ne.hasEntity('land')) {
            const northEastLand = neighbours.ne.getEntity('land') as Land;
            if (northEastLand.primitive.name !== this.primitive.name &&
                this.metadata.height > northEastLand.metadata.height) {
                // If a child exists to the north east
                transitions.push(
                    <polygon
                        points={
                            `${this.size[0]},0 ${this.size[0]},${this.size[1] / 2} ${this.size[0] - this.size[0] / 2},0`
                        }
                        fill={northEastLand.metadata.color}
                        key="north-east"
                    />
                );
            }
        }
        if (neighbours.se && neighbours.se.hasEntity('land')) {
            const southEastLand = neighbours.se.getEntity('land') as Land;
            if (southEastLand.primitive.name !== this.primitive.name &&
                this.metadata.height > southEastLand.metadata.height) {
                // If a child exists to the north east
                transitions.push(
                    <polygon
                        points={
                            `${this.size[0]},${this.size[1]} ${this.size[0]},${
                                this.size[1] / 2
                            } ${this.size[0] - this.size[0] / 2},${this.size[1]}`
                        }
                        fill={southEastLand.metadata.color}
                        key="south-east"
                    />
                );
            }
        }
        if (neighbours.nw && neighbours.nw.hasEntity('land')) {
            const northWestLand = neighbours.nw.getEntity('land') as Land;
            if (northWestLand.primitive.name !== this.primitive.name &&
                this.metadata.height > northWestLand.metadata.height) {
                // If a child exists to the north west
                transitions.push(
                    <polygon
                        points={`0,0 0,${this.size[1] / 2} ${this.size[0] / 2},0`}
                        fill={northWestLand.metadata.color}
                        key="north-west"
                    />
                );
            }
        }
        if (neighbours.sw && neighbours.sw.hasEntity('land')) {
            const southWestLand = neighbours.sw.getEntity('land') as Land;
            if (southWestLand.primitive.name !== this.primitive.name &&
                this.metadata.height > southWestLand.metadata.height) {
                // If a child exists to the north west
                transitions.push(
                    <polygon
                        points={`0,${this.size[1]} 0,${this.size[1] / 2} ${this.size[0] / 2},${this.size[1]}`}
                        fill={southWestLand.metadata.color}
                        key="south-west"
                    />
                );
            }
        }

        this.element = (
            <svg
                viewBox={`0 0 ${this.size[0]} ${this.size[1]}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute' }}
            >
                <rect width={this.size[0]} height={this.size[1]} fill={this.metadata.color}/>
                {transitions}
            </svg>
        );
    }
}
