import React from 'react';
import { Entity } from 'cartomapper';

import { WaterMetadata } from '../internalTypes';
import { BaseEntity } from './baseEntity';

export class Water extends BaseEntity {
    // @ts-ignore
    private size: [number, number];

    // @ts-ignore
    private metadata: WaterMetadata;

    public constructor(size: [number, number], metadata: WaterMetadata, primitive: Entity, base: Entity) {
        super(primitive, base);
        this.size = size;
        this.metadata = metadata;
        this.type = 'water';
    }

    public prerender(): void {
        this.element = <span>Water</span>;
    }
}
