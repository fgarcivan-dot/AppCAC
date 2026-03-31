"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronRight } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const seniorResults = [
  {
    id: 1,
    team: "Senior Masculino",
    competition: "3ª Futgal A Coruña G3",
    jornada: "Jornada 24",
    date: "29 Mar",
    home: "Cercedense",
    away: "S.D Pontecarreira",
    score: "1 - 0",
    outcome: "Victoria",
    isHome: true,
  },
  {
    id: 2,
    team: "Senior Feminino",
    competition: "3ª División Galega Feminina G2",
    jornada: "Jornada 24",
    date: "29 Mar",
    home: "A.D. Culleredo",
    away: "Cercedense",
    score: "0 - 2",
    outcome: "Victoria",
    isHome: false,
  },
];

const youthResults = [
  { name: "Xuvenil", score: "6 - 0", opponent: "Unión Campestre", outcome: "Victoria", home: true },
  { name: "Cadete", score: "6 - 0", opponent: "Carral B", outcome: "Victoria", home: true },
  { name: "Infantil", score: "1 - 2", opponent: "San Tirso C", outcome: "Derrota", home: true },
  { name: "Alevín A", score: "0 - 3", opponent: "Olimpico B", outcome: "Derrota", home: false },
  { name: "Alevín B", score: "1 - 4", opponent: "A.Arteixo C", outcome: "Derrota", home: false },
  { name: "Benxamín A", score: "3 - 1", opponent: "Sada CF B", outcome: "Victoria", home: false },
  { name: "Benxamín B", score: "2 - 0", opponent: "SD Brexo Lema", outcome: "Victoria", home: false },
  { name: "Prebenxamín", score: "4 - 1", opponent: "Victoria C.F B", outcome: "Victoria", home: false },
  { name: "Biberón", score: "—", opponent: "", outcome: "Descanso", home: true },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const outcomeColor = (o: string) => {
  if (o === "Victoria") return { badge: "bg-green-500/15 text-green-400 border-green-500/25", bar: "bg-green-500" };
  if (o === "Empate")   return { badge: "bg-gray-500/15 text-gray-400 border-gray-500/25",   bar: "bg-gray-500" };
  if (o === "Derrota")  return { badge: "bg-red-500/15 text-red-400 border-red-500/25",       bar: "bg-red-500" };
  return { badge: "bg-white/5 text-white/30 border-white/10", bar: "bg-white/10" };
};

const outcomeLabel = (o: string) => {
  if (o === "Victoria") return "Vitoria";
  if (o === "Derrota") return "Derrota";
  if (o === "Empate") return "Empate";
  return "Descanso";
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Results() {
  const [tab, setTab] = useState<"seniors" | "canteira">("seniors");

  const played = youthResults.filter((c) => c.outcome !== "Descanso");
  const wins   = youthResults.filter((c) => c.outcome === "Victoria").length;
  const draws  = youthResults.filter((c) => c.outcome === "Empate").length;
  const losses = youthResults.filter((c) => c.outcome === "Derrota").length;
  const total  = played.length;

  return (
    <section className="py-20 bg-surface min-h-screen relative overflow-hidden" id="resultados">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="fluid-container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Última Xornada</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-heading font-black text-fluid-h2 text-white uppercase tracking-tighter"
          >
            Resul<span className="text-primary">tados</span>
          </motion.h1>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex bg-background border border-white/10 rounded-sm p-1 max-w-xs mx-auto mb-10"
        >
          {(["seniors", "canteira"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-sm transition-all duration-300 ${
                tab === t
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {t === "seniors" ? "Seniors" : "Canteira"}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === "seniors" ? (
            <motion.div
              key="seniors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6 max-w-3xl mx-auto"
            >
              {seniorResults.map((match, i) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-background border border-white/8 rounded-sm overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300"
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${outcomeColor(match.outcome).bar}`} />

                  <div className="p-6 md:p-8">
                    {/* Meta */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-primary font-black text-xs uppercase tracking-[0.2em] block mb-1">{match.team}</span>
                        <span className="text-white/40 font-bold text-xs uppercase tracking-widest">{match.competition} · {match.jornada}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full border ${outcomeColor(match.outcome).badge}`}>
                          {outcomeLabel(match.outcome)}
                        </span>
                        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{match.date}</span>
                      </div>
                    </div>

                    {/* Score row */}
                    <div className="flex items-center justify-between gap-4 bg-surface/60 border border-white/5 rounded-sm p-4 md:p-6">
                      <div className="flex-1 text-center">
                        <span className={`font-heading font-black text-lg md:text-2xl uppercase tracking-tight leading-tight ${match.isHome ? "text-white" : "text-white/50"}`}>
                          {match.home}
                        </span>
                        {match.isHome && (
                          <span className="block text-[9px] text-primary font-black uppercase tracking-widest mt-1">Local</span>
                        )}
                      </div>

                      <div className="flex flex-col items-center shrink-0 px-4 border-x border-white/10">
                        <span className="font-heading font-black text-4xl md:text-5xl text-white tracking-tighter tabular-nums">
                          {match.score}
                        </span>
                      </div>

                      <div className="flex-1 text-center">
                        <span className={`font-heading font-black text-lg md:text-2xl uppercase tracking-tight leading-tight ${!match.isHome ? "text-white" : "text-white/50"}`}>
                          {match.away}
                        </span>
                        {!match.isHome && (
                          <span className="block text-[9px] text-primary font-black uppercase tracking-widest mt-1">Local</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="canteira"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Balance bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto mb-8 bg-background border border-white/8 rounded-sm p-5 md:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">Balance da Xornada</span>
                  <div className="flex gap-4 text-xs font-black uppercase tracking-widest">
                    <span className="text-green-400">{wins}V</span>
                    <span className="text-gray-400">{draws}E</span>
                    <span className="text-red-400">{losses}D</span>
                  </div>
                </div>
                <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-white/5">
                  <div style={{ width: `${total ? (wins / total) * 100 : 0}%` }} className="bg-green-500 transition-all duration-700" />
                  <div style={{ width: `${total ? (draws / total) * 100 : 0}%` }} className="bg-gray-500 transition-all duration-700" />
                  <div style={{ width: `${total ? (losses / total) * 100 : 0}%` }} className="bg-red-500 transition-all duration-700" />
                </div>
              </motion.div>

              {/* Youth cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {youthResults.map((cat, i) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="relative bg-background border border-white/8 rounded-sm overflow-hidden group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-0.5 ${outcomeColor(cat.outcome).bar} opacity-60 group-hover:opacity-100 transition-opacity`} />

                    <div className="p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight">{cat.name}</h3>
                        <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${outcomeColor(cat.outcome).badge}`}>
                          {outcomeLabel(cat.outcome)}
                        </span>
                      </div>

                      {cat.outcome === "Descanso" ? (
                        <div className="flex items-center justify-center bg-surface/50 border border-white/5 rounded-sm p-4 min-h-[4rem]">
                          <span className="font-heading font-black text-base text-white/20 uppercase tracking-[0.3em]">DESCANSO</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-surface/50 border border-white/5 rounded-sm p-4 gap-2">
                          <span className="font-heading font-black text-sm text-white uppercase tracking-tight text-center flex-1 leading-tight">
                            {cat.home ? "Cercedense" : cat.opponent}
                          </span>
                          <span className="font-heading font-black text-2xl text-white tracking-tighter shrink-0 px-3 border-x border-white/10 tabular-nums">
                            {cat.score}
                          </span>
                          <span className="font-heading font-black text-sm uppercase tracking-tight text-center flex-1 leading-tight text-white/50 group-hover:text-white/80 transition-colors">
                            {!cat.home ? "Cercedense" : cat.opponent}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://web-cercedense-ct76.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors border-b border-white/10 hover:border-white pb-1"
          >
            Ver resultados completos <ChevronRight className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
