"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'English' | 'Hindi' | 'Tamil';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('English');
    const [mounted, setMounted] = useState(false);

    // Load language from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            if (prefs.language) {
                setLanguageState(prefs.language);
            }
        }
    }, []);

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);

        // Update localStorage
        const savedPrefs = localStorage.getItem('userPreferences');
        const prefs = savedPrefs ? JSON.parse(savedPrefs) : {};
        prefs.language = newLanguage;
        localStorage.setItem('userPreferences', JSON.stringify(prefs));
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
