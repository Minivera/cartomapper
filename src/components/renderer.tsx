import React from 'react';

import { State } from '../mapping/state';
import { UnassembledError } from '../errors';

interface RendererProps {
    state: State;
    withCamera: boolean;
    cameraSize?: [number, number];
}

export const Renderer: React.FunctionComponent<RendererProps> = ({
    state,
    // cameraSize,
    withCamera,
}): React.ReactElement | null => {
    if (!state.map) {
        throw new UnassembledError();
    }

    // cameraSize = cameraSize || mapSize;
    // Position the camera in the middle of the map
    /* const cameraPos = [
        mapSize[0] / 2,
        mapSize[1] / 2,
    ]; */

    const MapComponent = state.map.component;

    if (withCamera) {
        // TODO: Implement camera
        return null;
    } else {
        return <MapComponent />;
    }
};
