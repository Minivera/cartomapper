import React from 'react';
import { Entity } from 'cartomapper';

import { ZoneNeighbour } from './zoneEntity';

export abstract class BaseEntity {
    protected element: React.ReactElement | null = null;

    protected primitive: Entity;

    protected base: Entity;

    public type = '';

    protected constructor(primitive: Entity, base: Entity) {
        this.primitive = primitive;
        this.base = base;
    }

    public get baseEntity(): Entity {
        return this.base;
    }

    public abstract prerender(neighbours: ZoneNeighbour): void;

    public component = (): React.ReactElement | null => {
        return this.element;
    };
}
