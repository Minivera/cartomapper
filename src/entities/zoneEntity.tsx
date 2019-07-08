import React from 'react';
import { Entity, Zone } from 'cartomapper';

import { BaseEntity } from './baseEntity';
import { Land } from './land';
import { River } from './river';
import { Water } from './water';
import { Zone as ZoneComponent } from '../components/zone';
import { EntityTypes, LandMetadata, RiversMetadata, WaterMetadata } from '../internalTypes';

export interface ZoneNeighbour {
    n?: ZoneEntity;
    ne?: ZoneEntity;
    e?: ZoneEntity;
    se?: ZoneEntity;
    s?: ZoneEntity;
    sw?: ZoneEntity;
    w?: ZoneEntity;
    nw?: ZoneEntity;
}

export class ZoneEntity {
    private entities: BaseEntity[] = [];

    private pos: [number, number];

    private size: [number, number];

    private zoneNeighbours: ZoneNeighbour = {};

    public constructor(zone: Zone, position: [number, number], size: [number, number], entities: Entity[]) {
        this.pos = position;
        this.size = size;
        zone.entities.forEach((entity: string): void => {
            const baseEntity = entities.find((el: Entity): boolean => el.name === entity);
            let primitive = baseEntity;

            while (primitive && primitive.primitive) {
                // @ts-ignore
                primitive = entities.find((el: Entity): boolean => el.name === primitive.primitive);
            }

            if (!primitive || !baseEntity) {
                return;
            }

            switch (primitive.metadata.type) {
                case EntityTypes.Land:
                    this.entities.push(new Land(size, primitive.metadata as LandMetadata, primitive, baseEntity));
                    break;
                case EntityTypes.River:
                    this.entities.push(new River(size, primitive.metadata as RiversMetadata, primitive, baseEntity));
                    break;
                case EntityTypes.Water:
                    this.entities.push(new Water(size, primitive.metadata as WaterMetadata, primitive, baseEntity));
                    break;
            }
        });
    }

    public get position(): [number, number] {
        return this.pos;
    }

    public set neighbours(neighbours: ZoneNeighbour) {
        this.zoneNeighbours = neighbours;
    }

    public get neighbours(): ZoneNeighbour {
        return this.zoneNeighbours;
    }

    public hasEntity(type: string): boolean {
        return this.entities.some((entity: BaseEntity): boolean => entity.type === type);
    }

    public getEntity(type: string): BaseEntity | undefined {
        return this.entities.find((entity: BaseEntity): boolean => entity.type === type);
    }

    public prerender(): void {
        this.entities.forEach((entity: BaseEntity): void => entity.prerender(this.neighbours));
    }

    public component = (): React.ReactElement | null => {
        return (
            <ZoneComponent size={this.size}>
                {this.entities.map((Entity: BaseEntity, index: number): React.ReactElement | null => (
                    <Entity.component key={index} />
                ))}
            </ZoneComponent>
        );
    };
}
