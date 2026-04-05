"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SeasonStatsProps {
  wins: number;
  draws: number;
  losses: number;
  title?: string;
  theme?: "day" | "night";
}

export function SeasonStats({ wins, draws, losses, title = "BALANCE DE TEMPORADA" }: SeasonStatsProps) {
  const total = wins + draws + losses;
  const winPct = (wins / total) * 100;
  const drawPct = (draws / total) * 100;
  const lossPct = (losses / total) * 100;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border transition-all duration-1000 bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl">
      
      {/* 🔮 HUD Background Watermark */}
      <div className="absolute -right-2 -bottom-2 text-[40px] font-black italic select-none pointer-events-none opacity-5 transition-colors duration-1000 text-white">
        STATS
      </div>

      <div className="relative z-10 flex flex-col gap-3 p-4">
        
        {/* Header HUD */}
        <div className="flex justify-between items-center transition-opacity duration-1000 opacity-40">
           <span className="text-[7px] font-black tracking-[0.4em] uppercase text-white">{title}</span>
           <div className="flex gap-1">
              <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
              <div className="h-1 w-1 rounded-full bg-white/20" />
           </div>
        </div>

        {/* Tactical HUD Grid */}
        <div className="grid grid-cols-3 rounded-2xl py-3 border transition-colors duration-1000 divide-x divide-white/5 bg-black/20 border-white/5 shadow-inner">
           <div className="flex flex-col items-center">
              <span className="text-xl font-black text-white tracking-tighter tabular-nums">{wins}</span>
              <span className="text-[7px] font-black tracking-widest uppercase transition-colors duration-1000 text-white opacity-40">VITS.</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-xl font-black tracking-tighter tabular-nums text-white opacity-60">{draws}</span>
              <span className="text-[7px] font-black tracking-widest uppercase transition-colors duration-1000 text-white opacity-40">EMPS.</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-xl font-black text-primary tracking-tighter tabular-nums drop-shadow-[0_0_8px_rgba(218,41,28,0.3)]">{losses}</span>
              <span className="text-[7px] font-black tracking-widest uppercase transition-colors duration-1000 text-white opacity-40">DERS.</span>
           </div>
        </div>

        {/* Digital Segmented Progress Bar */}
        <div className="flex items-center gap-3">
           <div className="flex-1 h-1.5 w-full overflow-hidden rounded-full p-[1px] relative transition-colors duration-1000 bg-white/5">
              <div className="absolute inset-0 flex">
                 {/* Segment separators to look "digital" */}
                 {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex-1 z-20 border-r border-black/20" />
                 ))}
              </div>
              <div className="flex h-full w-full relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${winPct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${drawPct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-white/10"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lossPct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  className="h-full bg-primary/60 shadow-[0_0_10px_rgba(218,41,28,0.4)]"
                />
              </div>
           </div>
           <span className="text-[8px] font-black tabular-nums transition-colors duration-1000 text-white opacity-40 uppercase tracking-widest">
              {Math.round((wins / total) * 100)}% EFF.
           </span>
        </div>

      </div>
    </div>
  );
}
