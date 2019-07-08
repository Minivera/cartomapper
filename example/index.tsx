import * as React from 'react';
import { render } from 'react-dom';

import { map } from './map';
import { Cartomapper } from '../src';

const App: React.ComponentType = (): React.ReactElement => (
    <Cartomapper map={map} mapSize={[1000, 1000]}/>
);

render(<App />, document.querySelector('#app'));
