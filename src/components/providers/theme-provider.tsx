"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ThemeColor, ThemeMode } from "@/constants/themes";
import {
  getThemeMode,
  setThemeMode as saveThemeMode,
  getThemeColor,
  setThemeColor as saveThemeColor,
} from "@/lib/storage";

interface ThemeContextValue {
  themeMode: ThemeMode;
  themeColor: ThemeColor;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeColor: (color: ThemeColor) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getServerSnapshot(): boolean {
  return false;
}

function subscribeToMediaQuery(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMediaQuerySnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => getThemeMode());
  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => getThemeColor());

  const systemIsDark = useSyncExternalStore(
    subscribeToMediaQuery,
    getMediaQuerySnapshot,
    getServerSnapshot
  );

  const isDark =
    themeMode === "dark" || (themeMode === "system" && systemIsDark);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    saveThemeMode(mode);

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (mode !== "system") {
      root.classList.add(mode);
    }
  }, []);

  const setThemeColor = useCallback((color: ThemeColor) => {
    setThemeColorState(color);
    saveThemeColor(color);

    const root = document.documentElement;
    root.setAttribute("data-theme-color", color);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        themeColor,
        setThemeMode,
        setThemeColor,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
