"use client";

import { useState } from "react";
import { MatchListCard } from "@/components/mobile/ui/MatchListCard";
import { motion } from "framer-motion";
import { useTheme } from "@/components/mobile/layout/AppProvider";

import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Partidos() {
  const { data } = useContent();
  const matches = data.partidosContent?.matches || [];
  
  const [activeTab, setActiveTab] = useState("SENIORS");
  const { theme } = useTheme();

  const filteredMatches = matches.filter(match => {
    if (activeTab === "SENIORS") return match.category.includes("SENIOR");
    if (activeTab === "CANTEIRA") return !match.category.includes("SENIOR");
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

      {/* Categories */}
      <section className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {["SENIORS", "CANTEIRA"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[9px] font-black tracking-widest transition-all ${
              activeTab === cat 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : theme === 'day' 
                    ? "bg-slate-100 text-slate-400" 
                    : "bg-surface-light text-white/40 hover:text-white/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Match List */}
      <section className="flex flex-col gap-3">
        {filteredMatches.map((match, i) => (
          <MatchListCard key={`${activeTab}-${match.id}`} {...match} index={i} />
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
