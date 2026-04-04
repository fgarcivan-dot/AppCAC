"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { RefreshIndicator } from "../ui/RefreshIndicator";
import { AppData, fetchAppData } from "@/lib/dataService";
import { INITIAL_DATA } from "@/lib/initialData";

interface ContentContextType {
  data: AppData;
  loading: boolean;
  isRefreshing: boolean;
  pullDistance: number;
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

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { theme } = useTheme();

  // Use MotionValue for high-performance visual syncing
  const yPosition = useMotionValue(0);
  const [pullDistanceState, setPullDistanceState] = useState(0);
  
  const startY = useRef(0);
  const isPulling = useRef(false);
  
  const initData = async () => {
    const remoteData = await fetchAppData();
    if (remoteData) {
      // 🏗️ ELITE HUD DEEP MERGE: Protect the 3-card lifecycle (Past, Present, Future)
      const mergedData = { ...INITIAL_DATA, ...remoteData };
      
      const smartMergeMatches = (local: any[], remote: any[]) => {
        if (!remote || remote.length === 0) return local;
        if (remote.length >= 3) return remote; // Use remote if full

        // If Gist is incomplete (e.g. only 2 cards), orbit remote data into the correct local slots
        const result = [...local];
        remote.forEach(rm => {
          const localIdx = local.findIndex(lm => lm.title?.toUpperCase() === rm.title?.toUpperCase());
          if (localIdx !== -1) {
            result[localIdx] = rm;
          } else {
            // If no title match, we don't just append, we keep the UI stable
          }
        });
        return result;
      };

      if (remoteData.equipos) {
        mergedData.equipos = {
          masculino: {
            ...INITIAL_DATA.equipos.masculino,
            ...remoteData.equipos.masculino,
            matches: smartMergeMatches(INITIAL_DATA.equipos.masculino.matches, remoteData.equipos.masculino.matches || [])
          },
          femenino: {
            ...INITIAL_DATA.equipos.femenino,
            ...remoteData.equipos.femenino,
            matches: smartMergeMatches(INITIAL_DATA.equipos.femenino.matches, remoteData.equipos.femenino.matches || [])
          }
        };
      }

      setData(mergedData);
      setRefreshKey(prev => prev + 1);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await initData();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
        yPosition.set(0);
        setPullDistanceState(0);
      }, 500);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].pageY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current) return;
      
      const currentY = e.touches[0].pageY;
      const diff = currentY - startY.current;

      if (diff > 0 && window.scrollY === 0) {
        // Resistance factor
        const distance = Math.min(diff * 0.4, 80);
        yPosition.set(distance);
        setPullDistanceState(distance);
        
        if (distance > 0) {
          if (e.cancelable) e.preventDefault();
        }
      } else {
        isPulling.current = false;
        yPosition.set(0);
        setPullDistanceState(0);
      }
    };

    const handleTouchEnd = () => {
      if (isPulling.current && yPosition.get() > 60) {
        handleRefresh();
      } else {
        yPosition.set(0);
        setPullDistanceState(0);
      }
      isPulling.current = false;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [theme]); // Re-bind on theme change for type safety if needed

  return (
    <ContentContext.Provider value={{ data, loading, isRefreshing, pullDistance: pullDistanceState, handleRefresh, refreshKey }}>
      <div className={`relative w-full ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
        <RefreshIndicator isRefreshing={isRefreshing} yPosition={yPosition} theme={theme as "day" | "night"} />
        
        <motion.div
          style={{ y: yPosition }}
          className="w-full relative z-10"
        >
          {children}
        </motion.div>
      </div>
    </ContentContext.Provider>
  );
}
