"use client";

import { useState } from "react";
import { SeasonStats } from "@/components/mobile/sections/SeasonStats";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { useContent } from "@/components/mobile/layout/ContentProvider";
import { ProResultCard } from "@/components/mobile/ui/ProResultCard";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Resultados() {
  const { theme } = useTheme();
  const { data, loading } = useContent();
  const [activeTab, setActiveTab] = useState("SENIOR");

  if (loading) return <div className="h-screen flex items-center justify-center bg-black"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const resData = data.resultados;
  const config = data.config;
  const equipos = data.equipos;

  if (!resData) return null;

  const maleResults = resData.lista.filter(r => r.category === "SENIOR MASCULINO");
  const femaleResults = resData.lista.filter(r => r.category === "SENIOR FEMININO");
  const canteiraResults = resData.lista.filter(r => !r.category.includes("SENIOR"));

  const maleResult = maleResults[0];
  const femaleResult = femaleResults[0];

  return (
    <div className={`flex flex-col gap-8 p-6 pb-32 animate-in fade-in duration-700 transition-colors duration-1000 min-h-screen ${theme === 'day' ? 'bg-slate-50 text-slate-900' : 'bg-black text-white'
      }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-4xl font-black tracking-tighter uppercase italic transition-colors duration-1000 ${theme === 'day' ? 'text-slate-900' : 'text-white'
          }`}>
          ÚLTIMA<br /><span className="text-primary tracking-norm">XORNADA</span>
        </h1>
        <div className="flex flex-col items-end text-right">
          <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${theme === 'day' ? 'text-slate-500' : 'text-white/40'
            }`}>
            {config?.temporada || "TEMP. 24/25"}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-1000 ${theme === 'day' ? 'text-slate-500' : 'text-white/20'
            }`}>
            {config?.mesResultados || "MARZO 2025"}
          </span>
        </div>
      </header>

      {/* Categories Horizontal - Replicating Partidos tab style */}
      <section className="flex gap-4 pb-2">
        {["SENIOR", "CANTEIRA"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-10 py-3.5 rounded-full text-[10px] font-black tracking-[0.2em] transition-all duration-300 ${activeTab === cat
                ? "bg-primary text-white shadow-[0_10px_25px_-5px_rgba(218,41,28,0.4)] scale-105"
                : theme === 'day'
                  ? "bg-white text-slate-600 border border-slate-200 shadow-sm"
                  : "bg-zinc-900/50 text-white/40 border border-white/5 hover:text-white/60"
              }`}
          >
            {cat}
          </button>
        ))}
      </section>

      <AnimatePresence mode="wait">
        {activeTab === "SENIOR" ? (
          <motion.section
            key="senior"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-10"
          >
            {/* Masculino */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-1">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(218,41,28,0.5)]" />
                <span className={`text-[10px] font-black tracking-[0.4em] uppercase ${theme === 'day' ? 'text-slate-500' : 'text-white/50'}`}>SÉNIOR MASCULINO</span>
                <div className={`h-px flex-1 ${theme === 'day' ? 'bg-slate-300/50' : 'bg-white/5'}`} />
              </div>

              {maleResults.map((res, idx) => (
                <ProResultCard
                  key={res.id}
                  home={res.home}
                  away={res.away}
                  score={res.score}
                  date={res.date}
                  time={res.time}
                  venue={res.venue}
                  category="SENIOR MASCULINO"
                  result={res.result as "VITORIA" | "DERROTA" | "EMPATE"}
                  status={res.status}
                  index={idx}
                  theme={theme}
                />
              ))}
              <SeasonStats
                wins={resData.balanceMasculino.victorias}
                draws={resData.balanceMasculino.empates}
                losses={resData.balanceMasculino.derrotas}
                theme={theme}
              />

              {equipos?.masculino?.externalUrl && (
                <a
                  href={equipos.masculino.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-[9px] font-black tracking-[0.2em] uppercase transition-all ${theme === 'day'
                      ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
                      : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                    }`}
                >
                  <span>Enlace de Temporada</span>
                  <ExternalLink size={12} className="opacity-40" />
                </a>
              )}
            </div>

            {/* Femenino */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-1">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(218,41,28,0.5)]" />
                <span className={`text-[10px] font-black tracking-[0.4em] uppercase ${theme === 'day' ? 'text-slate-500' : 'text-white/50'}`}>SÉNIOR FEMININO</span>
                <div className={`h-px flex-1 ${theme === 'day' ? 'bg-slate-300/50' : 'bg-white/5'}`} />
              </div>

              {femaleResults.map((res, idx) => (
                <ProResultCard
                  key={res.id}
                  home={res.home}
                  away={res.away}
                  score={res.score}
                  date={res.date}
                  time={res.time}
                  venue={res.venue}
                  category="SENIOR FEMININO"
                  result={res.result as "VITORIA" | "DERROTA" | "EMPATE"}
                  status={res.status}
                  index={idx}
                  theme={theme}
                />
              ))}
              <SeasonStats
                wins={resData.balanceFemenino.victorias}
                draws={resData.balanceFemenino.empates}
                losses={resData.balanceFemenino.derrotas}
                theme={theme}
              />

              {equipos?.femenino?.externalUrl && (
                <a
                  href={equipos.femenino.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-[9px] font-black tracking-[0.2em] uppercase transition-all ${theme === 'day'
                      ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
                      : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                    }`}
                >
                  <span>Enlace de Temporada</span>
                  <ExternalLink size={12} className="opacity-40" />
                </a>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="canteira"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 px-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(218,41,28,0.5)]" />
              <span className={`text-[10px] font-black tracking-[0.4em] uppercase ${theme === 'day' ? 'text-slate-500' : 'text-white/50'}`}>RESULTADOS CANTEIRA</span>
              <div className={`h-px flex-1 ${theme === 'day' ? 'bg-slate-300/50' : 'bg-white/5'}`} />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {canteiraResults.length > 0 ? (
                canteiraResults.map((res, idx) => (
                  <ProResultCard
                    key={res.id}
                    home={res.home}
                    away={res.away}
                    score={res.score}
                    date={res.date}
                    time={res.time}
                    venue={res.venue}
                    category={res.category}
                    result={res.result as "VITORIA" | "DERROTA" | "EMPATE"}
                    status={res.status}
                    index={idx}
                    theme={theme}
                  />
                ))
              ) : (
                <div className={`py-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] ${theme === 'day' ? 'text-slate-600' : 'text-white/20'}`}>
                  Non hai resultados dispoñibles
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
