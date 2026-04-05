"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeniorMatchCard } from "@/components/mobile/ui/SeniorMatchCard";
import { useContent } from "@/components/mobile/layout/ContentProvider";
import { cn } from "@/lib/utils";

export default function Partidos() {
  const { data, loading } = useContent();
  
  const [activeTab, setActiveTab] = useState("SENIORS");

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const matches = data.partidos?.proximos || [];
  const config = data.config;
  const temporada = config?.temporada || "TEMP. 24/25";
  const mes = config?.mesPartidos || "ABRIL 2025";

  const filteredMatches = matches.filter(match => {
    const cat = match.category.toUpperCase();
    if (activeTab === "SENIORS") return cat.includes("SENIOR");
    if (activeTab === "CANTEIRA") return !cat.includes("SENIOR");
    return true;
  });

  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-700 bg-[#050505] text-white">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">
          PRÓXIMOS<br /><span className="text-primary tracking-norm">PARTIDOS</span>
        </h1>
        <div className="flex flex-col items-end text-right">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white opacity-40">
            {temporada}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white opacity-20">
            {mes}
          </span>
        </div>
      </header>

      {/* Categories Horizontal - ELITE HUD STYLE (Centered) */}
      <section className="w-full flex justify-center pb-4">
        <div className="w-full max-w-[340px] relative rounded-full p-[3px] border border-white/10 flex items-center shadow-2xl bg-black/40">
          <motion.div 
            animate={{ x: activeTab === "SENIORS" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-primary to-rose-700 rounded-full"
          />
          {["SENIORS", "CANTEIRA"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "relative z-10 flex-1 py-3.5 text-[10px] font-black tracking-widest uppercase transition-colors duration-500",
                activeTab === cat ? 'text-white' : 'text-white opacity-40 hover:opacity-100'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Match List */}
      <section className="flex flex-col gap-4">
        {filteredMatches.map((match, i) => (
          <SeniorMatchCard 
            key={`${activeTab}-${match.id}`} 
            {...match} 
            index={i} 
          />
        ))}
        {filteredMatches.length === 0 && (
          <div className="py-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white opacity-20">
            Non hai partidos programados
          </div>
        )}
      </section>
    </div>
  );
}
