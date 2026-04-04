"use client";

import { useState } from "react";
import { MatchListCard } from "@/components/mobile/ui/MatchListCard";
import { SeniorMatchCard } from "@/components/mobile/ui/SeniorMatchCard";
import { motion } from "framer-motion";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { cn } from "@/lib/utils";

import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Partidos() {
  const { data, loading } = useContent();
  const { theme } = useTheme();

  if (loading) return <div className="h-screen flex items-center justify-center bg-black"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const matches = data.partidos?.proximos || [];
  const config = data.config;
  
  const [activeTab, setActiveTab] = useState("SENIORS");

  const filteredMatches = matches.filter(match => {
    const cat = match.category.toUpperCase();
    if (activeTab === "SENIORS") return cat.includes("SENIOR");
    if (activeTab === "CANTEIRA") return !cat.includes("SENIOR");
    return true;
  });

  return (
    <div className={`flex flex-col gap-8 p-6  animate-in fade-in duration-700 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-50 text-slate-900' : 'bg-black text-white'
      }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-4xl font-black tracking-tighter uppercase italic transition-colors duration-1000 ${
           theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>PRÓXIMOS<br /><span className="text-primary tracking-norm">PARTIDOS</span></h1>
        <div className="flex flex-col items-end text-right">
          <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${theme === 'day' ? 'text-slate-500' : 'text-white/40'
            }`}>
            {config?.temporada || "TEMP. 24/25"}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-1000 ${theme === 'day' ? 'text-slate-500' : 'text-white/20'
            }`}>
            {config?.mesPartidos || "ABRIL 2025"}
          </span>
        </div>
      </header>

      {/* Categories Horizontal */}
      <section className="flex gap-4 pb-4">
        {["SENIORS", "CANTEIRA"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-10 py-3.5 rounded-full text-[10px] font-black tracking-[0.2em] transition-all ${activeTab === cat
                ? "bg-primary text-white shadow-[0_10px_25px_-5px_rgba(218,41,28,0.4)] scale-105"
                : theme === 'day'
                  ? "bg-white text-slate-500 border border-slate-200"
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
          <div className={`py-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] ${theme === 'day' ? 'text-slate-600' : 'text-white/20'}`}>
            Non hai partidos programados
          </div>
        )}
      </section>
    </div>
  );
}
