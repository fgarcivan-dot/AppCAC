"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { SplashScreen } from "./SplashScreen";
import { Header } from "./Header";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // 🛡️ ANTI-JUMP iOS: Atomic Scroll Reset on Route Change
  useEffect(() => {
    if (!isLoading) {
      // 1. Instant reset
      window.scrollTo(0, 0);
      
      // 2. Double-check for WebKit (iOS) after layout paint
      const frameId = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      
      return () => cancelAnimationFrame(frameId);
    }
  }, [pathname, isLoading]);

  // 📥 INITIAL LOAD: Native Bridge & Solar Detection Purge
  useEffect(() => {
    // 0. Forced Manual Scroll Restoration for navigation stability
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

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

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen key="splash" />}
      </AnimatePresence>
      <div className={`transition-colors duration-1000 min-h-screen bg-[#050505] text-white ${isLoading ? "hidden" : "block animate-in fade-in duration-1000"}`}>
        {!isLoading && <Header />}
        <div className="pt-header">
          {children}
        </div>
      </div>
    </>
  );
}
