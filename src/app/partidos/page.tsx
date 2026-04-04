"use client";

import { useState } from "react";
import { MatchListCard } from "@/components/mobile/ui/MatchListCard";
import { SeniorMatchCard } from "@/components/mobile/ui/SeniorMatchCard";
import { motion } from "framer-motion";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { cn } from "@/lib/utils";

import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Partidos() {
  const { data } = useContent();
  const matches = data.partidosContent?.matches || [];
  
  const [activeTab, setActiveTab] = useState("SENIORS");
  const { theme } = useTheme();

  const filteredMatches = matches.filter(match => {
    const cat = match.category.toUpperCase();
    if (activeTab === "SENIORS") return cat.includes("SENIOR");
    if (activeTab === "ALEVÍNS") return cat.includes("ALEVÍN");
    if (activeTab === "BENXAMÍNS") return cat.includes("BENXAMÍN");
    if (activeTab === "PREBENXAMÍN") return cat.includes("PREBENXAMÍN");
    if (activeTab === "BIBERÓNS") return cat.includes("BIBERÓN");
    if (activeTab === "CANTEIRA") {
       return !cat.includes("SENIOR") && 
              !cat.includes("ALEVÍN") && 
              !cat.includes("BENXAMÍN") && 
              !cat.includes("PREBENXAMÍN") && 
              !cat.includes("BIBERÓN");
    }
    return true;
  });

  return (
    <div className={`flex flex-col gap-8 p-6  animate-in fade-in duration-700 transition-colors duration-1000 ${
      theme === 'day' ? 'bg-slate-200 text-slate-900' : 'bg-black text-white'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-4xl font-black tracking-tighter uppercase italic transition-colors duration-1000 ${
           theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>PRÓXIMOS<br /><span className="text-primary tracking-norm">PARTIDOS</span></h1>
        <div className="flex flex-col items-end">
          <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/40'
          }`}>TEMP. 24/25</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-300' : 'text-white/20'
          }`}>ABRIL 2025</span>
        </div>
      </header>

      {/* Categories Horizontal HUD */}
      <section className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory">
        {["SENIORS", "ALEVÍNS", "BENXAMÍNS", "PREBENXAMÍN", "BIBERÓNS", "CANTEIRA"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] transition-all snap-start ${
              activeTab === cat 
                ? "bg-primary text-white shadow-[0_10px_25px_-5px_rgba(218,41,28,0.4)] scale-105" 
                : theme === 'day' 
                    ? "bg-slate-100 text-slate-400 border border-slate-200" 
                    : "bg-zinc-800/50 text-white/40 border border-white/5 hover:text-white/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Match List */}
      <section className="flex flex-col gap-4">
        {filteredMatches.map((match, i) => (
          <SeniorMatchCard 
            key={`${activeTab}-${match.id}`} 
            {...match} 
            index={i} 
            theme={theme} 
          />
        ))}
        {filteredMatches.length === 0 && (
          <div className={`py-10 text-center text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/20'
          }`}>
            Non hai partidos nesta categoría
          </div>
        )}
      </section>
    </div>
  );
}
