"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import { AppData, fetchAppData } from "@/lib/dataService";
import { INITIAL_DATA } from "@/lib/initialData";

interface ContentContextType {
  data: AppData;
  loading: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  yPosition: any;
  handleRefresh: () => Promise<void>;
  refreshKey: number;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
}

import { useTheme } from "./AppProvider";
import { RefreshIndicator } from "@/components/mobile/ui/RefreshIndicator";
import { motion } from "framer-motion";

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { theme } = useTheme();

  const yPosition = useMotionValue(0);
  const [pullDistance, setPullDistance] = useState(0);

  const initData = async () => {
    const remoteData = await fetchAppData();
    if (remoteData) {
      setData({ ...INITIAL_DATA, ...remoteData });
      setRefreshKey(prev => prev + 1);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await initData();
    setTimeout(() => {
      setIsRefreshing(false);
      yPosition.set(0);
      setPullDistance(0);
    }, 200);
  };

  useEffect(() => {
    initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY <= 5) {
        startY = e.touches[0].pageY;
      } else {
        startY = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Ignorar recarga en el layout si ya está recargando o no empezó desde arriba
      if (isRefreshing || startY === 0) return;
      
      const currentY = e.touches[0].pageY;
      const diff = currentY - startY;
      
      if (diff > 0 && window.scrollY <= 5) {
        setPullDistance(diff);
        yPosition.set(diff * 1.0);
        if (diff > 10 && e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (isRefreshing) return;
      
      if (pullDistance > 30) {
        handleRefresh();
      } else {
        setPullDistance(0);
        yPosition.set(0);
      }
      startY = 0;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshing, pullDistance]);

  return (
    <ContentContext.Provider value={{ data, loading, isRefreshing, pullDistance, yPosition, handleRefresh, refreshKey }}>
      <div className={`relative w-full ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
        <RefreshIndicator isRefreshing={isRefreshing} pullDistance={pullDistance} theme={theme} />
        <motion.div style={{ y: yPosition }} className="w-full relative z-10">
          {children}
        </motion.div>
      </div>
    </ContentContext.Provider>
  );
}
