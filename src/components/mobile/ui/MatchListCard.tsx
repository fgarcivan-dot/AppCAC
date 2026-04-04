"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MatchListCardProps {
  home: string;
  away: string;
  date: string;
  time: string;
  category: string;
  venue: string;
  index: number;
}

export function MatchListCard({ home, away, date, time, category, venue, index }: MatchListCardProps) {
  const isRestDay = home.toUpperCase().includes("DESCANSO") || away.toUpperCase().includes("DESCANSO");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col gap-3 rounded-2xl bg-surface/40 p-4 border border-white/5 active:bg-white/5 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-black tracking-widest text-primary uppercase">
          {category}
        </span>
        <span className="text-[8px] font-bold text-white/20 uppercase tracking-wider">
          {isRestDay ? "XORNADA LIBRE" : venue}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          {isRestDay ? (
            <span className="text-sm font-black tracking-tighter text-primary uppercase">
              DESCANSA
            </span>
          ) : (
            <>
              <span className={cn("text-xs font-black tracking-tight", home === "CERCEDENSE" ? "text-white" : "text-white/40 uppercase")}>
                {home}
              </span>
              <span className={cn("text-xs font-black tracking-tight", away === "CERCEDENSE" ? "text-white" : "text-white/40 uppercase")}>
                {away}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[10px] font-black text-white tabular-nums">{date}</span>
          <span className={cn(
            "text-[10px] font-bold tracking-tighter uppercase",
            isRestDay ? "text-white/20" : "text-primary"
          )}>
            {time}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
