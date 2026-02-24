import { createContext, useContext } from 'react';

export const TransitionContext = createContext();

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
};
