import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type Theme = "dark" | "light" | "high-contrast";
interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    systemTheme: Theme;
}
interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}
declare function ThemeProvider({ children, defaultTheme }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useTheme(): ThemeContextValue;

export { type Theme, ThemeProvider, useTheme };
