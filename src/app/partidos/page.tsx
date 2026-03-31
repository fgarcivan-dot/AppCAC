"use client";

import { useState } from "react";
import { MatchListCard } from "@/components/mobile/ui/MatchListCard";
import { motion } from "framer-motion";

const matches = [
  { id: 1, home: "CERCEDENSE", away: "ORDES CF", date: "5 Abr", time: "17:00H", category: "SENIOR MASCULINO", venue: "CAMPO O ROXO" },
  { id: 2, home: "BETANZOS CF", away: "CERCEDENSE", date: "5 Abr", time: "12:00H", category: "SENIOR FEMININO", venue: "CAMPO DEP. BETANZOS" },
  { id: 3, home: "CERCEDENSE", away: "SD FISTERRA", date: "4 Abr", time: "16:30H", category: "XUVENIL", venue: "CAMPO O ROXO" },
  { id: 4, home: "BERGANTIÑOS FC", away: "CERCEDENSE", date: "4 Abr", time: "11:00H", category: "CADETE", venue: "CAMPO AS EIROAS" },
  { id: 5, home: "CERCEDENSE", away: "VICTORIA CF", date: "4 Abr", time: "10:30H", category: "INFANTIL", venue: "CAMPO O ROXO" },
];

export default function Partidos() {
  const [activeTab, setActiveTab] = useState("SENIORS");

  const filteredMatches = matches.filter(match => {
    if (activeTab === "SENIORS") return match.category.includes("SENIOR");
    if (activeTab === "CANTEIRA") return !match.category.includes("SENIOR");
    return true;
  });

  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic font-heading">PRÓXIMOS<br /><span className="text-primary tracking-norm">PARTIDOS</span></h1>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">TEMP. 24/25</span>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">ABRIL 2025</span>
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

      {/* Match List */}
      <section className="flex flex-col gap-3">
        {filteredMatches.map((match, i) => (
          <MatchListCard key={`${activeTab}-${match.id}`} {...match} index={i} />
        ))}
        {filteredMatches.length === 0 && (
          <div className="py-10 text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            Non hai partidos nesta categoría
          </div>
        )}
      </section>
    </div>
  );
}
