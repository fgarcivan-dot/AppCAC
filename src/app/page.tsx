"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatchCarousel } from "@/components/mobile/ui/MatchCarousel";
import { ClassificationTable } from "@/components/mobile/ui/ClassificationTable";
import { SocialPost } from "@/components/mobile/ui/SocialPost"; // Import social post
import { fetchAppData, AppData } from "@/lib/dataService";

const INITIAL_DATA: AppData = {
  masculino: {
    posicion: "3ª POSICIÓN",
    matches: [
      { title: "XORNADA ANTERIOR", date: "MAR 22", home: "CERCEDENSE", away: "BOIRO", score: "3 - 0", venue: "CAMPO O ROXO" },
      { title: "ESTA XORNADA", date: "MAR 29", home: "CERCEDENSE", away: "PONTECARREIRA", score: "1 - 0", venue: "CAMPO O ROXO" },
      { title: "VINDEIRO PARTIDO", date: "ABR 5", home: "ORDES CF", away: "CERCEDENSE", score: "vs", venue: "CAMPO DEP. ORDES" }
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
      { title: "VINDEIRO PARTIDO", date: "ABR 12", home: "CERCEDENSE", away: "C.C.D. CURTIS", score: "vs", venue: "CAMPO O ROXO" }
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
  const [activeTab, setActiveTab] = useState<"masculino" | "femenino">("femenino"); 

  useEffect(() => {
    async function init() {
      const remoteData = await fetchAppData();
      if (remoteData) setData(remoteData);
      setTimeout(() => setLoading(false), 600);
    }
    init();
  }, []);

  const currentData = data[activeTab];

  return (
    <div className={`flex min-h-screen flex-col bg-background p-6 items-center justify-start gap-8 transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Branding Header */}
      <header className="flex flex-col items-center mt-8 w-full text-center">
        <h1 className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase mb-1">
          CLUB ATLÉTICO
        </h1>
        <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
          CERCEDENSE
        </h2>
      </header>

      {/* Elite Category Selector (Tabs) */}
      <div className="w-full max-w-[340px] mt-4 relative bg-white/[0.03] backdrop-blur-3xl rounded-full p-1 border border-white/5 flex items-center shadow-2xl">
        <motion.div 
          animate={{ x: activeTab === "masculino" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-[0_0_20px_rgba(218,41,28,0.4)]"
        />
        <button 
          onClick={() => setActiveTab("masculino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-300 ${activeTab === "masculino" ? 'text-white' : 'text-white/40'}`}
        >
          Masculino
        </button>
        <button 
          onClick={() => setActiveTab("femenino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-300 ${activeTab === "femenino" ? 'text-white' : 'text-white/40'}`}
        >
          Femenino
        </button>
      </div>

      {/* Content Area with Slide Animation */}
      <div className="w-full flex-1 relative overflow-visible mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "masculino" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "masculino" ? 20 : -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full flex flex-col gap-10 pb-32"
          >
            {/* Header / Info */}
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">
                {activeTab === "masculino" ? "SÉNIOR MASC." : "SÉNIOR FEM."}
              </span>
              <div className="flex items-center gap-2">
                {activeTab === "femenino" && <div className="h-1 w-1 rounded-full bg-success animate-pulse" />}
                <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${activeTab === "femenino" ? 'text-success' : 'text-primary'}`}>
                  {currentData.posicion}
                </span>
              </div>
            </div>

            {/* Dynamic Interactive Widgets */}
            <MatchCarousel matches={currentData.matches} />
            
            <div className="flex items-center gap-3 px-2">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Clasificación</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <ClassificationTable 
              standings={currentData.standings} 
              externalUrl={currentData.externalUrl} 
            />

            {/* News / Social Post */}
            <div className="flex items-center gap-3 px-2 mt-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Novedades</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <SocialPost {...currentData.socialPost} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Static Branding Floating Bottom */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0">
        <div className="h-1 w-12 rounded-full bg-white/40 shadow-2xl" />
      </div>
    </div>
  );
}
