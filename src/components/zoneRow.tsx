import React from 'react';

export const ZoneRow: React.FunctionComponent = ({ children }): React.ReactElement => {
    return (
        <div style={{ display: 'flex' }}>
            {children}
        </div>
    );
};
