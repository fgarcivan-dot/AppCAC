"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "./SplashScreen";
import { Header } from "./Header";

// 🌓 Theme Context Definition
type Theme = "day" | "night";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>("night"); // Default to night while detecting

  // 📥 INITIAL LOAD: Memory & Solar Detection
  useEffect(() => {
    // 0. Hide Native Splash Screen smoothly
    const hideNativeSplash = async () => {
      try {
        const { SplashScreen: NativeSplash } = await import('@capacitor/splash-screen');
        await NativeSplash.hide();
      } catch (e) {
        console.warn("Capacitor SplashScreen plugin not available/initialized");
      }
    };
    hideNativeSplash();

    // 1. Initial Loading Timer (Splash)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    // 2. Theme Recovery (LocalStorage)
    const savedTheme = localStorage.getItem("app-theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // 3. Solar Fallback (7:00 - 20:00)
      const hour = new Date().getHours();
      setTheme(hour >= 7 && hour < 20 ? "day" : "night");
    }

    return () => clearTimeout(timer);
  }, []);

  // 💾 PERSISTENCE: Save to LocalStorage on change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("app-theme", theme);
    }
  }, [theme, isLoading]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "day" ? "night" : "day"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen key="splash" />}
      </AnimatePresence>
      <div className={`transition-colors duration-1000 min-h-screen ${
        theme === 'day' ? "bg-slate-200 text-slate-900" : "bg-black text-white"
      } ${isLoading ? "hidden" : "block animate-in fade-in duration-1000"}`}>
        {!isLoading && <Header theme={theme} toggleTheme={toggleTheme} />}
        <div className={isLoading ? "" : "pt-header"}>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
