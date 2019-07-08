import React from 'react';

export const InternalMap: React.FunctionComponent = ({
    children,
}): React.ReactElement => {
    return <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>;
};
