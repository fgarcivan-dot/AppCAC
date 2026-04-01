"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeasonStats } from "@/components/mobile/sections/SeasonStats";
import { useTheme } from "@/components/mobile/layout/AppProvider";

const results = [
  { id: 1, home: "CERCEDENSE", away: "PONTECARREIRA", score: "1 - 0", date: "MAR 22", category: "SENIOR MASCULINO", result: "VITORIA" },
  { id: 2, home: "AT. ARTEIXO", away: "CERCEDENSE", score: "2 - 1", date: "MAR 21", category: "SENIOR FEMININO", result: "DERROTA" },
  { id: 3, home: "CERCEDENSE", away: "SD FISTERRA", score: "3 - 2", date: "MAR 21", category: "XUVENIL", result: "VITORIA" },
  { id: 4, home: "BERGANTIÑOS", away: "CERCEDENSE", score: "1 - 1", date: "MAR 20", category: "CADETE", result: "EMPATE" },
  { id: 5, home: "CERCEDENSE", away: "VICTORIA CF", score: "0 - 2", date: "MAR 20", category: "INFANTIL", result: "DERROTA" },
];

export default function Resultados() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('tab') === 'canteira') return 'CANTEIRA';
    }
    return 'SENIORS';
  });
  const { theme } = useTheme();

  const maleResult = results.find(r => r.category === "SENIOR MASCULINO");
  const femaleResult = results.find(r => r.category === "SENIOR FEMININO");
  const youthResults = results.filter(r => !r.category.includes("SENIOR"));

  return (
    <div className={`flex flex-col gap-8 p-6  animate-in fade-in duration-700 transition-colors duration-1000 ${
      theme === 'day' ? 'text-slate-900' : 'text-white'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-4xl font-black tracking-tighter uppercase italic transition-colors duration-1000 ${
          theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>
          ÚLTIMA<br /><span className="text-primary tracking-norm">XORNADA</span>
        </h1>
        <div className="flex flex-col items-end">
          <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/40'
          }`}>TEMP. 24/25</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-300' : 'text-white/20'
          }`}>MARZO 2025</span>
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
            {maleResult && <ResultCard res={maleResult} i={0} theme={theme} />}
            <div className={`mb-4 rounded-[2rem] border transition-colors duration-1000 ${
              theme === 'day' ? 'bg-slate-100 border-slate-200' : 'bg-white/[0.02] border-white/5'
            }`}>
              <SeasonStats wins={14} draws={4} losses={6} title="BALANCE SENIOR MASCULINO" />
            </div>

            {/* Senior Feminino */}
            {femaleResult && <ResultCard res={femaleResult} i={1} theme={theme} />}
            <div className={`mb-4 rounded-[2rem] border transition-colors duration-1000 ${
              theme === 'day' ? 'bg-slate-100 border-slate-200' : 'bg-white/[0.02] border-white/5'
            }`}>
              <SeasonStats wins={10} draws={2} losses={3} title="BALANCE SENIOR FEMININO" />
            </div>
          </>
        )}

        {activeTab === "CANTEIRA" && (
          youthResults.map((res, i) => (
            <ResultCard key={res.id} res={res} i={i} theme={theme} />
          ))
        )}
      </section>
    </div>
  );
}

function ResultCard({ res, i, theme }: { res: any, i: number, theme: 'day' | 'night' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05 }}
      className={`group relative overflow-hidden rounded-3xl p-5 border transition-all duration-1000 ${
        theme === 'day' ? 'bg-slate-100 border-slate-200' : 'bg-white/[0.02] border-white/5 shadow-2xl'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
          theme === 'day' ? 'text-slate-400' : 'text-white/30'
        }`}>{res.category}</span>
        <div className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase ${
          res.result === "VITORIA" ? "bg-success/20 text-success" : 
          res.result === "EMPATE" ? (theme === 'day' ? "bg-slate-200 text-slate-500" : "bg-white/10 text-white/40") : 
          "bg-primary/20 text-primary"
        }`}>
          {res.result}
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className={`flex-1 text-xs font-black tracking-tight text-left uppercase transition-colors duration-1000 ${
          theme === 'day' ? 'text-slate-600' : 'text-white/60'
        }`}>{res.home}</div>
        <div className="flex flex-col items-center px-4">
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-900' : 'text-white'
          }`}>{res.score}</span>
          <span className={`text-[8px] font-bold tracking-widest uppercase mt-1 transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-300' : 'text-white/20'
          }`}>{res.date}</span>
        </div>
        <div className={`flex-1 text-xs font-black tracking-tight text-right uppercase transition-colors duration-1000 ${
          theme === 'day' ? 'text-slate-600' : 'text-white/60'
        }`}>{res.away}</div>
      </div>
      
      <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-1 w-2/3 blur-xl transition-opacity group-active:opacity-100 opacity-30 ${
          res.result === "VITORIA" ? "bg-success" : res.result === "EMPATE" ? (theme === 'day' ? "bg-slate-400" : "bg-white/20") : "bg-primary"
      }`} />
    </motion.div>
  );
}
