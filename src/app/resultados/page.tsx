"use client";

import { useState } from "react";
import { SeasonStats } from "@/components/mobile/sections/SeasonStats";
import { useContent } from "@/components/mobile/layout/ContentProvider";
import { ProResultCard } from "@/components/mobile/ui/ProResultCard";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Resultados() {
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

  return (
    <div className="flex flex-col gap-8 p-6 pb-32 animate-in fade-in duration-700 min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">
          ÚLTIMA<br /><span className="text-primary tracking-norm">XORNADA</span>
        </h1>
        <div className="flex flex-col items-end text-right">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white opacity-40">
            {config?.temporada || "TEMP. 24/25"}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white opacity-20">
            {config?.mesResultados || "MARZO 2025"}
          </span>
        </div>
      </header>

      {/* Categories Horizontal - ELITE HUD STYLE (Centered) */}
      <section className="w-full flex justify-center pb-4">
        <div className="w-full max-w-[340px] mt-4 relative rounded-full p-[3px] border border-white/10 flex items-center shadow-2xl bg-black/40">
          <motion.div 
            animate={{ x: activeTab === "SENIOR" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-primary to-rose-700 rounded-full"
          />
          {["SENIOR", "CANTEIRA"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-500 ${
                activeTab === cat ? 'text-white' : 'text-white opacity-40 hover:opacity-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
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
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white opacity-40">SÉNIOR MASCULINO</span>
                <div className="h-px flex-1 bg-white/5" />
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
                />
              ))}
              <SeasonStats
                wins={resData.balanceMasculino.victorias}
                draws={resData.balanceMasculino.empates}
                losses={resData.balanceMasculino.derrotas}
              />

              {equipos?.masculino?.externalUrl && (
                <a
                  href={equipos.masculino.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl border text-[9px] font-black tracking-[0.3em] uppercase transition-all bg-white/5 border-white/5 text-white opacity-40 hover:opacity-100"
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
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white opacity-40">SÉNIOR FEMININO</span>
                <div className="h-px flex-1 bg-white/5" />
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
                />
              ))}
              <SeasonStats
                wins={resData.balanceFemenino.victorias}
                draws={resData.balanceFemenino.empates}
                losses={resData.balanceFemenino.derrotas}
              />

              {equipos?.femenino?.externalUrl && (
                <a
                  href={equipos.femenino.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl border text-[9px] font-black tracking-[0.3em] uppercase transition-all bg-white/5 border-white/5 text-white opacity-40 hover:opacity-100"
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
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white opacity-40">RESULTADOS CANTEIRA</span>
              <div className="h-px flex-1 bg-white/5" />
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
                  />
                ))
              ) : (
                <div className="py-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white opacity-20">
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
