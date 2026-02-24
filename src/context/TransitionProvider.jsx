import React, { useState } from 'react';
import { TransitionContext } from './TransitionContext';

export const TransitionProvider = ({ children }) => {
    // Default to true because the app starts with a loader
    const [isTransitioning, setIsTransitioning] = useState(true);

    return (
        <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
            {children}
        </TransitionContext.Provider>
    );
};
