"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MatchCarousel } from "@/components/mobile/ui/MatchCarousel";
import { ClassificationTable } from "@/components/mobile/ui/ClassificationTable";
import { SocialPost } from "@/components/mobile/ui/SocialPost"; // Import social post
import { RefreshIndicator } from "@/components/mobile/ui/RefreshIndicator";
import { Sun, Moon } from "lucide-react";
import { fetchAppData, AppData } from "@/lib/dataService";
import { useTheme } from "@/components/mobile/layout/AppProvider";

const INITIAL_DATA: AppData = {
  masculino: {
    posicion: "3ª POSICIÓN",
    matches: [
      { title: "XORNADA ANTERIOR", date: "MAR 22", home: "CERCEDENSE", away: "BOIRO", score: "3 - 0", venue: "CAMPO O ROXO" },
      { title: "ESTA XORNADA", date: "MAR 29", home: "CERCEDENSE", away: "PONTECARREIRA", score: "1 - 0", venue: "CAMPO O ROXO" },
      { title: "PRÓXIMO", date: "POR DEFINIR", home: "ORDES CF", away: "CERCEDENSE", score: "POR DEFINIR", venue: "CAMPO DEP. ORDES" }
    ],
    standings: [
      { pos: 1, team: "VISANTOÑA C.F.", pts: 58, pj: 24 },
      { pos: 2, team: "S.D.C. TEIXEIRO", pts: 58, pj: 24 },
      { pos: 3, team: "ATLÉTICO CERCEDENSE", pts: 54, pj: 24, highlighted: true },
      { pos: 4, team: "BERGANTIÑOS C.F. 'B'", pts: 51, pj: 24 },
      { pos: 5, team: "C.D. X. ARANGA", pts: 42, pj: 24 }
    ],
    externalUrl: "https://futgal.es/pnfg/NPcd/NFG_VisClasificacion?cod_primaria=1000120&codgrupo=24967593&codcompeticion=24123231&codjornada=&codtemporada=21",
    socialPost: {
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
      caption: "¡Semana de derbi! El equipo se prepara para asaltar el liderato. Mañana nos vemos en O Roxo. 🏟️🔥",
      postUrl: "https://www.instagram.com/clubatleticocercedense/",
      date: "HARE 2 HORAS"
    }
  },
  femenino: {
    posicion: "1ª POSICIÓN - LÍDERES",
    matches: [
      { title: "XORNADA ANTERIOR", date: "MAR 15", home: "CERCEDENSE", away: "SP. MEICENDE", score: "3 - 3", venue: "CAMPO O ROXO" },
      { title: "ESTA XORNADA", date: "MAR 22", home: "AD CULLEREDO", away: "CERCEDENSE", score: "1 - 8", venue: "CAMPO ALEGRET" },
      { title: "PRÓXIMO", date: "POR DEFINIR", home: "CERCEDENSE", away: "C.C.D. CURTIS", score: "POR DEFINIR", venue: "CAMPO O ROXO" }
    ],
    standings: [
      { pos: 1, team: "ATLÉTICO CERCEDENSE", pts: 47, pj: 17, highlighted: true },
      { pos: 2, team: "C.C.D. CURTIS", pts: 43, pj: 17 },
      { pos: 3, team: "XUVENTUDE CRENDES", pts: 41, pj: 17 },
      { pos: 4, team: "SP. MEICENDE", pts: 38, pj: 17 },
      { pos: 5, team: "A.D. CULLEREDO", pts: 28, pj: 17 }
    ],
    externalUrl: "https://futgal.es/pnfg/NPcd/NFG_VisClasificacion?cod_primaria=1000120&codgrupo=26188029&codcompeticion=24123314&codjornada=&codtemporada=21",
    socialPost: {
      imageUrl: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000",
      caption: "¡LÍDERES! Orgullosos de este equipo tras la victoria 1-8. Próximo duelo contra el Curtis el 12 de abril. 💪🏆",
      postUrl: "https://www.instagram.com/clubatleticocercedense/",
      date: "AYER"
    }
  }
};

export default function Home() {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"masculino" | "femenino">("masculino"); 
  
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Motion values for pull-to-refresh
  const yPosition = useMotionValue(0);
  const [pullDistance, setPullDistance] = useState(0);

  const initData = async () => {
    // Explicitly fetching new data
    const remoteData = await fetchAppData();
    if (remoteData) {
       setData(remoteData);
       setRefreshKey(prev => prev + 1); // Forcing re-render of components
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await initData();
    // Simulate a tiny bit of loading just for feel, then reset instantly
    setTimeout(() => {
      setIsRefreshing(false);
      yPosition.set(0);
      setPullDistance(0);
    }, 200);
  };

  useEffect(() => {
    initData();
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
      if (isRefreshing || startY === 0) return;
      
      const currentY = e.touches[0].pageY;
      const diff = currentY - startY;
      
      if (diff > 0 && window.scrollY <= 5) {
        setPullDistance(diff);
        yPosition.set(diff * 1.0); // Total 1:1 response (no resistance)
        
        // Prevent default scrolling when pulling to refresh
        if (diff > 10 && e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (isRefreshing) return;
      
      if (pullDistance > 30) { // Hyper-sensitive threshold (was 50)
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
  }, [isRefreshing, pullDistance]);

  const currentData = data[activeTab];

  return (
    <div className={`flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden ${loading ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Indicator */}
      <RefreshIndicator isRefreshing={isRefreshing} pullDistance={pullDistance} theme={theme} />

      {/* Main Content Area (Native Scroll Restored) */}
      <motion.div 
        style={{ y: yPosition }}
        className="w-full flex flex-col items-center px-4 pb-8 pt-5 gap-6 z-10"
      >

      {/* Elite Category Selector (Tabs) */}
      <div className={`w-full max-w-[340px] mt-5 relative backdrop-blur-3xl rounded-full p-1 border flex items-center shadow-2xl transition-all duration-1000 ${
        theme === 'day' ? 'bg-slate-200/50 border-slate-300/50' : 'bg-white/[0.03] border-white/5'
      }`}>
        <motion.div 
          animate={{ x: activeTab === "masculino" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-[0_0_20px_rgba(218,41,28,0.4)]"
        />
        <button 
          onClick={() => setActiveTab("masculino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "masculino" ? 'text-white' : (theme === 'day' ? 'text-slate-400' : 'text-white/40')
          }`}
        >
          Masculino
        </button>
        <button 
          onClick={() => setActiveTab("femenino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "femenino" ? 'text-white' : (theme === 'day' ? 'text-slate-400' : 'text-white/40')
          }`}
        >
          Femenino
        </button>
      </div>

      {/* Content Area with Slide Animation */}
      <div className="w-full flex-1 relative overflow-visible mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${refreshKey}`}
            initial={{ opacity: 0, x: activeTab === "masculino" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "masculino" ? 20 : -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full flex flex-col gap-4 pb-32"
          >
            {/* Header / Info */}
            <div className="flex items-center justify-between px-2">
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-400' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>
                {activeTab === "masculino" ? "SÉNIOR MASC." : "SÉNIOR FEM."}
              </span>
              <div className="flex items-center gap-2">
                {activeTab === "femenino" && <div className="h-1 w-1 rounded-full bg-success animate-pulse" />}
                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-1000 ${
                  activeTab === "femenino" ? 'text-success' : 'text-primary'
                }`} style={{ fontFamily: 'NeueMontreal' }}>
                  {currentData.posicion}
                </span>
              </div>
            </div>

            {/* Dynamic Interactive Widgets */}
            <MatchCarousel matches={currentData.matches} theme={theme} />
            
            <div className="flex items-center gap-3 px-2">
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-400' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>Clasificación</span>
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
            </div>

            <ClassificationTable 
              standings={currentData.standings} 
              externalUrl={currentData.externalUrl} 
              theme={theme}
            />

            {/* News / Social Post */}
            <div className="flex items-center gap-3 px-2 mt-4">
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-400' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>Novedades</span>
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
            </div>
            <SocialPost {...currentData.socialPost} theme={theme} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Static Branding Floating Bottom */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0">
        <div className="h-1 w-12 rounded-full bg-white/40 shadow-2xl" />
      </div>
      
      </motion.div>
    </div>
  );
}
