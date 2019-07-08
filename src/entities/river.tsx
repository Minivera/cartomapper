import React from 'react';
import { Entity } from 'cartomapper';

import { RiversMetadata } from '../internalTypes';
import { BaseEntity } from './baseEntity';
import { ZoneNeighbour } from './zoneEntity';

export class River extends BaseEntity {
    // @ts-ignore
    private size: [number, number];

    // @ts-ignore
    private metadata: RiversMetadata;

    public constructor(size: [number, number], metadata: RiversMetadata, primitive: Entity, base: Entity) {
        super(primitive, base);
        this.size = size;
        this.metadata = metadata;
        this.type = 'river';
    }

    public prerender(neighbours: ZoneNeighbour): void {
        const lines: React.ReactElement[] = [];
        const definitions: React.ReactElement[] = [];

        // Straight directions
        if (neighbours.n && neighbours.n.hasEntity('river')) {
            const other = neighbours.n.getEntity('river') as River;
            const path = `M ${this.size[0] / 2} 0 C ${this.size[0] / 2 - this.size[0] / 5} ${this.size[1] / 5}, ${this
                .size[0] /
                2 +
                this.size[0] / 5} ${this.size[1] / 2 - this.size[1] / 5}, ${this.size[0] / 2} ${this.size[1] / 2}`;
            // If a child exists to the north
            definitions.push(
                <path
                    id="north"
                    d={path}
                    key="north"
                    fill="none"
                    stroke={this.metadata.color}
                    strokeWidth={Math.max(this.metadata.width, other.metadata.width)}
                    strokeLinecap="round"
                />
            );
            lines.push(River.generatePaths('north', path, this.size[1] / 2, other.metadata, this.metadata));
        }
        if (neighbours.e && neighbours.e.hasEntity('river')) {
            const other = neighbours.e.getEntity('river') as River;
            const path = `M ${this.size[0]} ${this.size[1] / 2} C ${this.size[0] - this.size[0] / 5} ${this.size[1] /
                2 -
                this.size[1] / 5}, ${this.size[0] / 2 + this.size[0] / 5} ${this.size[1] / 2 + this.size[1] / 5}, ${this
                .size[0] / 2} ${this.size[1] / 2}`;
            // If a child exists to the north
            definitions.push(
                <path
                    id="east"
                    d={path}
                    key="east"
                    fill="none"
                    stroke={this.metadata.color}
                    strokeWidth={Math.max(this.metadata.width, other.metadata.width)}
                    strokeLinecap="round"
                />
            );
            lines.push(River.generatePaths('south', path, this.size[0] / 2, other.metadata, this.metadata));
        }
        if (neighbours.s && neighbours.s.hasEntity('river')) {
            const other = neighbours.s.getEntity('river') as River;
            const path = `M ${this.size[0] / 2} ${this.size[1]} C ${this.size[0] / 2 + this.size[0] / 5} ${this
                .size[1] -
                this.size[1] / 5}, ${this.size[0] / 2 - this.size[0] / 5} ${this.size[1] / 2 + this.size[1] / 5}, ${this
                .size[0] / 2} ${this.size[1] / 2}`;
            // If a child exists to the north
            definitions.push(
                <path
                    id="south"
                    d={path}
                    key="south"
                    fill="none"
                    stroke={this.metadata.color}
                    strokeWidth={Math.max(this.metadata.width, other.metadata.width)}
                    strokeLinecap="round"
                />
            );
            lines.push(River.generatePaths('south', path, this.size[1] / 2, other.metadata, this.metadata));
        }
        if (neighbours.w && neighbours.w.hasEntity('river')) {
            const other = neighbours.w.getEntity('river') as River;
            const path = `M 0 ${this.size[1] / 2} C ${this.size[0] / 5} ${this.size[1] / 2 + this.size[1] / 5}, ${this
                .size[0] /
                2 -
                this.size[0] / 5} ${this.size[1] / 2 - this.size[1] / 5}, ${this.size[0] / 2} ${this.size[1] / 2}`;
            // If a child exists to the north
            definitions.push(
                <path
                    id="west"
                    d={path}
                    key="west"
                    fill="none"
                    stroke={this.metadata.color}
                    strokeWidth={Math.max(this.metadata.width, other.metadata.width)}
                    strokeLinecap="round"
                />
            );
            lines.push(River.generatePaths('west', path, this.size[0] / 2, other.metadata, this.metadata));
        }

        this.element = (
            <svg
                viewBox={`0 0 ${this.size[0]} ${this.size[1]}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute' }}
            >
                <defs>{definitions}</defs>
                {lines}
            </svg>
        );
    }

    private static generatePaths(
        groupName: string,
        path: string,
        size: number,
        startMeta: RiversMetadata,
        endMeta: RiversMetadata
    ): React.ReactElement {
        return startMeta.width > endMeta.width ? (
            <g id={`${groupName}-group`} key={`${groupName}-group`}>
                <g id={`${groupName}-group-1`}>
                    <path
                        id={groupName}
                        d={path}
                        fill="none"
                        stroke={startMeta.color}
                        strokeWidth={Math.max(startMeta.width, endMeta.width)}
                        strokeLinecap="round"
                        strokeDasharray={`${size / 4},${size}`}
                        style={{
                            strokeWidth: River.difference(startMeta.width, endMeta.width, 1),
                            strokeDashoffset: 0,
                        }}
                    />
                    <path
                        id={groupName}
                        d={path}
                        fill="none"
                        stroke={startMeta.color}
                        strokeWidth={Math.max(startMeta.width, endMeta.width)}
                        strokeLinecap="round"
                        strokeDasharray={`${(size / 4) * 2},${size}`}
                        style={{
                            strokeWidth: River.difference(startMeta.width, endMeta.width, 2),
                            strokeDashoffset: -(size / 4),
                        }}
                    />
                </g>
                <g id={`${groupName}-group-2`}>
                    <path
                        id={groupName}
                        d={path}
                        fill="none"
                        stroke={startMeta.color}
                        strokeWidth={Math.max(startMeta.width, endMeta.width)}
                        strokeLinecap="round"
                        strokeDasharray={`${(size / 4) * 3},${size}`}
                        style={{
                            strokeWidth: River.difference(startMeta.width, endMeta.width, 3),
                            strokeDashoffset: -(size / 4) * 2,
                        }}
                    />
                    <path
                        id={groupName}
                        d={path}
                        fill="none"
                        stroke={startMeta.color}
                        strokeWidth={Math.max(startMeta.width, endMeta.width)}
                        strokeLinecap="round"
                        strokeDasharray={`${(size / 4) * 4},${size}`}
                        style={{
                            strokeWidth: River.difference(startMeta.width, endMeta.width, 4),
                            strokeDashoffset: -(size / 4) * 3,
                        }}
                    />
                </g>
            </g>
        ) : (
            <path
                id={groupName}
                d={path}
                fill="none"
                stroke={startMeta.color}
                strokeWidth={endMeta.width}
                strokeLinecap="round"
            />
        );
    }

    private static difference(start: number, end: number, step: number): number {
        if (start > end) {
            return start - ((start - end) / 4) * step;
        } else {
            return start + ((end - start) / 4) * step;
        }
    }
}
