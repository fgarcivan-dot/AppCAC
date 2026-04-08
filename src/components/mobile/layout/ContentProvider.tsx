"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { RefreshIndicator } from "../ui/RefreshIndicator";
import { AppData, fetchAppData } from "@/lib/dataService";
import { INITIAL_DATA } from "@/lib/initialData";
import { notificationService } from "@/lib/notificationService";
import { Capacitor } from '@capacitor/core';

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

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Use MotionValue for high-performance visual syncing
  const yPosition = useMotionValue(0);
  const [pullDistanceState, setPullDistanceState] = useState(0);
  
  const startY = useRef(0);
  const isPulling = useRef(false);
  
  // Helper to parse "1 - 0" into [1, 0]
  const parseScore = (score: string) => {
    const parts = score.split(/[\-\svs]+/).filter(p => !isNaN(parseInt(p)));
    if (parts.length < 2) return [0, 0];
    return [parseInt(parts[0]), parseInt(parts[1])];
  };

  // 🔔 Status Tracking for Notifications (Persisted)
  const initData = async (isBackground = false) => {
    const remoteData = await fetchAppData();
    if (remoteData) {
      // Check for notifications before updating state
      if (remoteData.equipos) {
        ['masculino' as const, 'femenino' as const].forEach(cat => {
          const remoteMatches = remoteData.equipos[cat]?.matches;
          if (remoteMatches && remoteMatches.length >= 2) {
            const currentMatch = remoteMatches[1]; // Middle card
            const currentStatus = currentMatch.status?.trim().toUpperCase() || "";
            
            // Read prev from localStorage for cross-session persistence (client-side only)
            const isClient = typeof window !== 'undefined';
            const storageKey = `last_status_${cat}`;
            const scoreKey = `last_score_${cat}`;
            const prevStatus = isClient ? localStorage.getItem(storageKey) : null;
            const prevScore = isClient ? localStorage.getItem(scoreKey) : null;

            const teamTitle = cat === 'masculino' ? "Sénior Masc." : "Sénior Fem.";

            // 1. Check for Status Changes
            if (prevStatus !== null && prevStatus !== currentStatus && currentStatus !== "") {
              const msg = notificationService.getStatusMessage(currentStatus, currentMatch.home, currentMatch.away, currentMatch.score, prevStatus, teamTitle);
              if (msg) {
                notificationService.schedule(msg.title, msg.body);
              }
            }

            // 2. Check for Goals (Score changes while in game)
            if (prevScore !== null && prevScore !== currentMatch.score && currentStatus === "EN XOGO") {
              const [prevHome, prevAway] = parseScore(prevScore);
              const [currHome, currAway] = parseScore(currentMatch.score);
              const isHomeCercedense = currentMatch.home.toUpperCase().includes("CERCEDENSE");

              let goalType: "GOL_PROPIO" | "GOL_RIVAL" | null = null;

              if (currHome > prevHome) {
                goalType = isHomeCercedense ? "GOL_PROPIO" : "GOL_RIVAL";
              } else if (currAway > prevAway) {
                goalType = !isHomeCercedense ? "GOL_PROPIO" : "GOL_RIVAL";
              }

              if (goalType) {
                const msg = notificationService.getStatusMessage(goalType, currentMatch.home, currentMatch.away, currentMatch.score, currentStatus, teamTitle);
                if (msg) {
                  notificationService.schedule(msg.title, msg.body);
                }
              }
            }

            if (isClient) {
              localStorage.setItem(storageKey, currentStatus);
              localStorage.setItem(scoreKey, currentMatch.score);
            }
          }
        });
      }

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
    // Initial load and permissions
    const setup = async () => {
      if (Capacitor.getPlatform() !== 'web') {
        try {
          // Robust initialization for OneSignal SDK v5
          let OneSignalObj: any = (window as any).plugins?.OneSignal;
          
          if (!OneSignalObj) {
            try {
              // Fallback to dynamic import
              const OneSignalModule = await import('onesignal-cordova-plugin');
              OneSignalObj = OneSignalModule.default || OneSignalModule;
            } catch (e) {
              console.error("Failed to import OneSignal module:", e);
            }
          }

          if (OneSignalObj) {
            // OneSignal SDK v5 uses initialize instead of setAppId
            OneSignalObj.initialize("791bfab7-3758-4426-b7ce-d2dba13d2f37");
            
            // Request permissions (v5 API)
            if (OneSignalObj.Notifications) {
              OneSignalObj.Notifications.requestPermission(true).then((accepted: boolean) => {
                console.log("User accepted notifications: " + accepted);
              });
            } else {
              // Fallback for older interface if somehow present
              OneSignalObj.promptForPushNotificationsWithUserResponse?.((accepted: any) => {
                console.log("User accepted notifications: " + accepted);
              });
            }
          } else {
            console.error("OneSignal failed to initialize");
          }
        } catch (e) {
          console.error("OneSignal setup error:", e);
        }
      }
      await notificationService.requestPermissions();
      await initData();
    };
    setup();

    // 🕒 PERIODIC HUD SYNC: Poll for status changes every 30 seconds (Optimized for instant updates)
    const interval = setInterval(() => {
      initData(true);
    }, 30000);

    return () => clearInterval(interval);
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
  }, []); // Static logic

  return (
    <ContentContext.Provider value={{ data, loading, isRefreshing, pullDistance: pullDistanceState, handleRefresh, refreshKey }}>
      <div className={`relative w-full ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
        <RefreshIndicator isRefreshing={isRefreshing} yPosition={yPosition} />
        
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
