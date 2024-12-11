import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
    const [shouldShowAddForm, setShouldShowAddForm] = useState(false);

    const value = {
        shouldShowAddForm,
        setShouldShowAddForm
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
} 