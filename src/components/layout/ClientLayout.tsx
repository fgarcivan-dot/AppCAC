"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";
import BottomNav from "./BottomNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Check if the user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 2000); // 2 seconds for a faster transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      
      <main className="flex-1">
        {children}
      </main>
      
      <BottomNav />
    </>
  );
}
