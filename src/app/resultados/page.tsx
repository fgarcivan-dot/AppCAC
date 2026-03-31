"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeasonStats } from "@/components/mobile/sections/SeasonStats";

const results = [
  { id: 1, home: "CERCEDENSE", away: "PONTECARREIRA", score: "1 - 0", date: "MAR 22", category: "SENIOR MASCULINO", result: "VITORIA" },
  { id: 2, home: "AT. ARTEIXO", away: "CERCEDENSE", score: "2 - 1", date: "MAR 21", category: "SENIOR FEMININO", result: "DERROTA" },
  { id: 3, home: "CERCEDENSE", away: "SD FISTERRA", score: "3 - 2", date: "MAR 21", category: "XUVENIL", result: "VITORIA" },
  { id: 4, home: "BERGANTIÑOS", away: "CERCEDENSE", score: "1 - 1", date: "MAR 20", category: "CADETE", result: "EMPATE" },
  { id: 5, home: "CERCEDENSE", away: "VICTORIA CF", score: "0 - 2", date: "MAR 20", category: "INFANTIL", result: "DERROTA" },
];

export default function Resultados() {
  const [activeTab, setActiveTab] = useState("SENIORS");

  const maleResult = results.find(r => r.category === "SENIOR MASCULINO");
  const femaleResult = results.find(r => r.category === "SENIOR FEMININO");
  const youthResults = results.filter(r => !r.category.includes("SENIOR"));

  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic font-heading">ÚLTIMA<br /><span className="text-primary tracking-norm">XORNADA</span></h1>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">TEMP. 24/25</span>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">MARZO 2025</span>
        </div>
      </header>

      {/* Categories */}
      <section className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {["SENIORS", "CANTEIRA"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[9px] font-black tracking-widest transition-all ${
              activeTab === cat ? "bg-primary text-white" : "bg-surface-light text-white/40 hover:text-white/60"
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
            {maleResult && <ResultCard res={maleResult} i={0} />}
            <div className="mb-4 rounded-[2rem] bg-surface-light/30 border border-white/5">
              <SeasonStats wins={14} draws={4} losses={6} title="BALANCE SENIOR MASCULINO" />
            </div>

            {/* Senior Feminino */}
            {femaleResult && <ResultCard res={femaleResult} i={1} />}
            <div className="mb-4 rounded-[2rem] bg-surface-light/30 border border-white/5">
              <SeasonStats wins={10} draws={2} losses={3} title="BALANCE SENIOR FEMININO" />
            </div>
          </>
        )}

        {activeTab === "CANTEIRA" && (
          youthResults.map((res, i) => (
            <ResultCard key={res.id} res={res} i={i} />
          ))
        )}
      </section>
    </div>
  );
}

function ResultCard({ res, i }: { res: any, i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05 }}
      className="group relative overflow-hidden rounded-3xl bg-surface p-5 border border-white/5 active:bg-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">{res.category}</span>
        <div className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase ${
          res.result === "VITORIA" ? "bg-success/20 text-success" : 
          res.result === "EMPATE" ? "bg-white/10 text-white/40" : 
          "bg-primary/20 text-primary"
        }`}>
          {res.result}
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-xs font-black tracking-tight text-white/60 text-left uppercase">{res.home}</div>
        <div className="flex flex-col items-center px-4">
          <span className="text-2xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{res.score}</span>
          <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase mt-1">{res.date}</span>
        </div>
        <div className="flex-1 text-xs font-black tracking-tight text-white/60 text-right uppercase">{res.away}</div>
      </div>
      
      <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-1 w-2/3 blur-xl transition-opacity group-active:opacity-100 opacity-30 ${
          res.result === "VITORIA" ? "bg-success" : res.result === "EMPATE" ? "bg-white/20" : "bg-primary"
      }`} />
    </motion.div>
  );
}
