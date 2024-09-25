import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { current as getCurrentDXTheme } from 'devextreme/ui/themes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const themes = ['light', 'dark'];
const storageKey = 'app-theme';
const themePrefix = 'app-theme-';

const prefixes = ['./styles/theme-dx-', './styles/variables-'];

const loadStylesImports = async () => {
  await Promise.all(
    prefixes.flatMap((prefix) => [
      import(/* webpackChunkName: "app-theme-dark" */ `${prefix}dark.scss`),
      import(/* webpackChunkName: "app-theme-light" */ `${prefix}light.scss`)
    ])
  );
};

function getNextTheme(theme) {
  return themes[themes.indexOf(theme) + 1] || themes[0];
}

function getCurrentTheme() {
  return window.localStorage[storageKey] || themes[0]; // Default to 'light' if nothing is stored
}

function isThemeStyleSheet(styleSheet, theme) {
  const themeMarker = `${themePrefix}${theme}`;
  if (process.env.NODE_ENV === 'production') {
    return styleSheet?.href?.includes(themeMarker);
  } else {
    const rules = Array.from(styleSheet.cssRules);
    return !!rules.find((rule) => rule?.selectorText?.includes(`.${themeMarker}`));
  }
}

function switchThemeStyleSheets(enabledTheme) {
  const disabledTheme = getNextTheme(enabledTheme);
  
  Array.from(document.styleSheets).forEach((styleSheet) => {
    styleSheet.disabled = isThemeStyleSheet(styleSheet, disabledTheme);
  });
}

async function setAppTheme(newTheme) {
  const themeName = newTheme || getCurrentTheme();
  
  switchThemeStyleSheets(themeName);
  
  const regexTheme = new RegExp(`\\.(${themes.join('|')})`, 'g');
  currentVizTheme(currentVizTheme().replace(regexTheme, `.${themeName}`));
  refreshTheme();
}

function toggleTheme(currentTheme) {
  const newTheme = getNextTheme(currentTheme);
  window.localStorage[storageKey] = newTheme;
  return newTheme;
}

export function useThemeContext() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadStylesImports().then(() => {
      setIsLoaded(true);
    });
  }, []);

  const switchTheme = useCallback(() => {
    setTheme((currentTheme) => toggleTheme(currentTheme));
  }, []);

  const isFluent = useCallback(() => {
    return getCurrentDXTheme().includes('fluent');
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setAppTheme(theme);
    }
  }, [theme, isLoaded]);

  return useMemo(() => ({ theme, switchTheme, isLoaded, isFluent }), [theme, isLoaded, isFluent]);
}

export const ThemeContext = React.createContext(null);
