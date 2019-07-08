import React, { useState, useEffect } from 'react';
import { Configuration } from 'cartomapper';

import { State } from '../mapping/state';
import { Renderer } from './renderer';
import { baseEntities } from '../data/baseEntities';

export const Cartomapper: React.FunctionComponent<Configuration> = ({
    map,
    entities,
    mapSize,
    cameraSize,
    hasCamera,
}): React.ReactElement | null => {
    const [mapState, setMapState] = useState<State | null>(null);
    const completeEntities = baseEntities.concat(entities || []);

    useEffect((): void => {
        const internalState = new State(map);

        setMapState(internalState.assemble(completeEntities, mapSize).prerender());
    }, [map, entities]);

    if (!mapState) {
        return <div>loading...</div>;
    }

    return (
        <Renderer
            state={mapState}
            withCamera={hasCamera || false}
            cameraSize={cameraSize}
        />
    );
};
