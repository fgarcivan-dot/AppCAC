"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
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
  
  // Refs for gesture tracking (avoiding effect re-binding)
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const isRefreshingRef = useRef(false);
  const isHorizontalRef = useRef(false);
  const isActiveRef = useRef(false);

  // Sync ref with state for use in event listeners
  useEffect(() => {
    isRefreshingRef.current = isRefreshing;
  }, [isRefreshing]);

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
    const handleTouchStart = (e: TouchEvent) => {
      // Solo iniciar si estamos arriba y no estamos recargando
      if (window.scrollY <= 5 && !isRefreshingRef.current) {
        startYRef.current = e.touches[0].pageY;
        startXRef.current = e.touches[0].pageX;
        isHorizontalRef.current = false;
        isActiveRef.current = true;
      } else {
        isActiveRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActiveRef.current || isRefreshingRef.current) return;
      
      const currentY = e.touches[0].pageY;
      const currentX = e.touches[0].pageX;
      const diffY = currentY - startYRef.current;
      const diffX = Math.abs(currentX - startXRef.current);
      
      // Si el movimiento es predominantemente horizontal, marcamos para ignorar
      if (!isHorizontalRef.current && diffX > 10 && diffX > Math.abs(diffY)) {
        isHorizontalRef.current = true;
      }

      if (isHorizontalRef.current) return;
      
      // Comprobar si estamos al principio de la página
      // Usamos un pequeño margen para compensar el bounce de iOS
      if (window.scrollY <= 10) {
        // Permitir que el contenido siga al dedo tanto hacia abajo como hacia arriba
        // pero limitamos el valor mínimo a 0 (no tirar hacia arriba)
        const pullValue = Math.max(0, diffY * 0.45); // Un toque menos de resistencia
        
        setPullDistance(pullValue);
        yPosition.set(pullValue);
        
        // Bloquear scroll nativo solo si estamos tirando efectivamente
        if (pullValue > 0 && e.cancelable) {
          e.preventDefault();
        }
      } else {
        // Si el usuario scrolleó hacia abajo nativamente, ya no estamos en modo "pull"
        if (isActiveRef.current) {
          isActiveRef.current = false;
          setPullDistance(0);
          yPosition.set(0);
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isActiveRef.current || isRefreshingRef.current || isHorizontalRef.current) {
        isActiveRef.current = false;
        return;
      }
      
      // Acceder al valor actual de yPosition (que es pullDistance con resistencia)
      const currentPull = yPosition.get();
      
      if (currentPull > 60) {
        handleRefresh();
      } else {
        setPullDistance(0);
        yPosition.set(0);
      }
      
      isActiveRef.current = false;
      startYRef.current = 0;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
