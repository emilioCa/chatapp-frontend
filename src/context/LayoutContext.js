import React, { createContext } from 'react';

export const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
    return (
        <LayoutContext.Provider value={{}}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutProvider;