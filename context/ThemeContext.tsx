"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type ColorTheme = "blue" | "purple" | "green" | "orange" | "red";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  glassEnabled: boolean;
  setTheme: (theme: Theme) => void;
  setColorTheme: (color: ColorTheme) => void;
  setGlassEnabled: (enabled: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");
  const [glassEnabled, setGlassEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Load from local storage
    const savedTheme = localStorage.getItem("ui-theme") as Theme;
    const savedColor = localStorage.getItem("ui-color-theme") as ColorTheme;
    const savedGlass = localStorage.getItem("ui-glass-enabled");
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setColorTheme(savedColor);
    if (savedGlass !== null) setGlassEnabled(savedGlass === "true");
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 1. Handle light/dark/system
    const applyTheme = (t: "light" | "dark") => {
      if (t === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      applyTheme(systemTheme);
      
      // Listen for system changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 2. Handle color theme
    root.setAttribute("data-theme", colorTheme);
    
    // 3. Handle Glass effects
    if (glassEnabled) {
      root.setAttribute("data-glass", "true");
    } else {
      root.removeAttribute("data-glass");
    }
    
    // Save to local storage
    localStorage.setItem("ui-theme", theme);
    localStorage.setItem("ui-color-theme", colorTheme);
    localStorage.setItem("ui-glass-enabled", glassEnabled.toString());
  }, [theme, colorTheme, glassEnabled]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      colorTheme, 
      glassEnabled,
      setTheme, 
      setColorTheme, 
      setGlassEnabled,
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
