import React from 'react';

interface ZoneProps {
    size: [number, number];
}

export const Zone: React.FunctionComponent<ZoneProps> = ({ size, children }): React.ReactElement => {
    return (
        <div style={{ width: size[0], height: size[1], position: 'relative' }}>
            {children}
        </div>
    );
};
