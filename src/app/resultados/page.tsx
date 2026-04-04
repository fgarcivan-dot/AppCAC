"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeasonStats } from "@/components/mobile/sections/SeasonStats";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { useContent } from "@/components/mobile/layout/ContentProvider";
import { ProResultCard } from "@/components/mobile/ui/ProResultCard";

export default function Resultados() {
  const { theme } = useTheme();
  const { data } = useContent();
  const resContent = data.resultadosContent!;
  const results = resContent.results || [];

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('tab') === 'canteira') return 'CANTEIRA';
    }
    return 'SENIORS';
  });

  const maleResult = results.find(r => r.category === "SENIOR MASCULINO");
  const femaleResult = results.find(r => r.category === "SENIOR FEMININO");
  const youthResults = results.filter(r => !r.category.includes("SENIOR"));

  return (
    <div className={`flex flex-col gap-5 p-5 animate-in fade-in duration-700 transition-colors duration-1000 ${
      theme === 'day' ? 'text-slate-900' : 'text-white'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-3xl font-black tracking-tighter uppercase italic transition-colors duration-1000 ${
          theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>
          ÚLTIMA<br /><span className="text-primary tracking-norm">XORNADA</span>
        </h1>
        <div className="flex flex-col items-end">
          <span className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/40'
          }`}>TEMP. 24/25</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-300' : 'text-white/20'
          }`}>MARZO 2025</span>
        </div>
      </header>

      {/* Categories */}
      <section className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {["SENIORS", "CANTEIRA"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-[8px] font-black tracking-widest transition-all ${
              activeTab === cat 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : theme === 'day' 
                  ? "bg-slate-100 text-slate-400" 
                  : "bg-white/5 text-white/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Result Cards & Stats */}
      <section className="flex flex-col gap-4">
        {activeTab === "SENIORS" && (
          <>
            {/* Senior Masculino */}
            {maleResult && (
              <div className="flex flex-col gap-2">
                <ProResultCard 
                  home={maleResult.home}
                  away={maleResult.away}
                  score={maleResult.score}
                  date={maleResult.date}
                  category={maleResult.category}
                  result={maleResult.result}
                  index={0}
                  theme={theme}
                />
                <SeasonStats 
                  wins={resContent.maleSeasonWins} 
                  draws={resContent.maleSeasonDraws} 
                  losses={resContent.maleSeasonLosses} 
                  title="BALANCE SENIOR MASCULINO" 
                  theme={theme}
                />
              </div>
            )}

            {/* Senior Feminino */}
            {femaleResult && (
              <div className="flex flex-col gap-2">
                <ProResultCard 
                  home={femaleResult.home}
                  away={femaleResult.away}
                  score={femaleResult.score}
                  date={femaleResult.date}
                  category={femaleResult.category}
                  result={femaleResult.result}
                  index={1}
                  theme={theme}
                />
                <SeasonStats 
                  wins={resContent.femaleSeasonWins} 
                  draws={resContent.femaleSeasonDraws} 
                  losses={resContent.femaleSeasonLosses} 
                  title="BALANCE SENIOR FEMININO" 
                  theme={theme}
                />
              </div>
            )}
          </>
        )}

        {activeTab === "CANTEIRA" && (
          <div className="flex flex-col gap-4">
            {youthResults.map((res, i) => (
              <ProResultCard 
                key={res.id}
                home={res.home}
                away={res.away}
                score={res.score}
                date={res.date}
                category={res.category}
                result={res.result}
                index={i}
                theme={theme}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
