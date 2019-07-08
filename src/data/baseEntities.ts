import { Entity } from 'cartomapper';

import { EntityTypes } from '../internalTypes';

export const baseEntities: Entity[] = [
    // Land
    {
        name: 'coast',
        metadata: {
            type: EntityTypes.Land,
            height: 2,
            color: '#3cc798',
        },
        interactive: false,
    },
    {
        name: 'plains',
        metadata: {
            type: EntityTypes.Land,
            height: 2,
            color: '#3cc786',
        },
        interactive: false,
    },
    {
        name: 'hills',
        metadata: {
            type: EntityTypes.Land,
            height: 3,
            color: '#9ee06c',
        },
        interactive: false,
    },
    {
        name: 'high_hills',
        metadata: {
            type: EntityTypes.Land,
            height: 4,
            color: '#b9e06c',
        },
        interactive: false,
    },
    {
        name: 'mountain_base',
        metadata: {
            type: EntityTypes.Land,
            height: 5,
            color: '#eaf2b3',
        },
        interactive: false,
    },
    {
        name: 'mountains',
        metadata: {
            type: EntityTypes.Land,
            height: 6,
            color: '#fac8a5',
        },
        interactive: false,
    },
    // Rivers
    {
        name: 'river_end',
        metadata: {
            type: EntityTypes.River,
            width: 0,
            color: '#4385bf',
        },
        interactive: false,
    },
    {
        name: 'river_small',
        metadata: {
            type: EntityTypes.River,
            width: 1,
            color: '#4385bf',
        },
        interactive: false,
    },
    {
        name: 'river_medium',
        metadata: {
            type: EntityTypes.River,
            width: 2,
            color: '#4385bf',
        },
        interactive: false,
    },
    {
        name: 'river_large',
        metadata: {
            type: EntityTypes.River,
            width: 10,
            color: '#4385bf',
        },
        interactive: false,
    },
    // Water
    {
        name: 'lake',
        metadata: {
            type: EntityTypes.Water,
            darkens: false,
            connects: true,
            color: '#89c3f5',
        },
        interactive: false,
    },
    {
        name: 'ocean',
        metadata: {
            type: EntityTypes.Water,
            darkens: true,
            connects: true,
            color: '#89c3f5',
        },
        interactive: false,
    },
    {
        name: 'swamp',
        metadata: {
            type: EntityTypes.Water,
            darkens: false,
            connects: false,
            color: '#32b88d',
        },
        interactive: false,
    },
];
