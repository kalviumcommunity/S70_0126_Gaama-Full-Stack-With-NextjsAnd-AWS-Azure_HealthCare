"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'Light' | 'Dark' | 'Auto';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    effectiveTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('Light');
    const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            if (prefs.theme) {
                setThemeState(prefs.theme);
            }
        }
    }, []);

    // Apply theme whenever it changes
    useEffect(() => {
        if (!mounted) return;

        let effective: 'light' | 'dark' = 'light';

        if (theme === 'Dark') {
            effective = 'dark';
        } else if (theme === 'Light') {
            effective = 'light';
        } else if (theme === 'Auto') {
            effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        setEffectiveTheme(effective);

        // Apply theme to document
        const root = document.documentElement;
        if (effective === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);

        // Update localStorage
        const savedPrefs = localStorage.getItem('userPreferences');
        const prefs = savedPrefs ? JSON.parse(savedPrefs) : {};
        prefs.theme = newTheme;
        localStorage.setItem('userPreferences', JSON.stringify(prefs));
    };

    // Prevent flash of wrong theme
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
