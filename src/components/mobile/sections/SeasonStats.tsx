"use client";

import { motion } from "framer-motion";

interface SeasonStatsProps {
  wins: number;
  draws: number;
  losses: number;
  title?: string;
}

export function SeasonStats({ wins, draws, losses, title = "BALANCE DE TEMPORADA" }: SeasonStatsProps) {
  const total = wins + draws + losses;
  const winPct = (wins / total) * 100;
  const drawPct = (draws / total) * 100;
  const lossPct = (losses / total) * 100;

  return (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
        {title}
      </h3>

      <div className="flex flex-col gap-5">
        {/* Progress Bar with Glows */}
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/5 p-[1px]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${winPct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.5)] rounded-l-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${drawPct}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-white/20"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${lossPct}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="h-full bg-primary shadow-[0_0_12px_rgba(218,41,28,0.5)] rounded-r-full"
          />
        </div>

        {/* Legend / Numbers */}
        <div className="flex justify-between px-2">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-[#00FF41] tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(0,255,65,0.4)]">{wins}</span>
            <span className="text-[8px] font-black tracking-widest text-white/30 uppercase">VICTORIAS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white/40 tracking-tighter tabular-nums">{draws}</span>
            <span className="text-[8px] font-black tracking-widest text-white/30 uppercase">EMPATES</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-primary tracking-tighter tabular-nums drop-shadow-[0_0_8px_rgba(218,41,28,0.3)]">{losses}</span>
            <span className="text-[8px] font-black tracking-widest text-white/30 uppercase">DERROTAS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
