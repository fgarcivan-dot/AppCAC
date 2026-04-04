"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeniorMatchCardProps {
  home: string;
  away: string;
  date: string;
  time: string;
  category: string;
  venue: string;
  index: number;
  theme?: "day" | "night";
}

export function SeniorMatchCard({ home, away, date, time, category, venue, index, theme = "night" }: SeniorMatchCardProps) {
  // Extract A or B from category (e.g., "SENIOR A" -> "A")
  const subCategory = category.split(" ").pop() || "A";
  const isHomeCercedense = home.toUpperCase().includes("CERCEDENSE");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className={`relative w-full h-[190px] rounded-[2rem] overflow-hidden border transition-all duration-1000 ${
        theme === 'day' 
          ? "bg-white border-slate-200 shadow-[0_20px_40px_-15px_rgba(218,41,28,0.1)]" 
          : "bg-zinc-900 border-white/5 shadow-[0_0_40px_-10px_rgba(218,41,28,0.2)]"
      }`}
    >
      {/* 🔮 Background Watermark: Giant A or B */}
      <div className={`absolute -right-4 -bottom-6 text-[140px] font-black italic select-none pointer-events-none transition-colors duration-1000 ${
        theme === 'day' ? "text-slate-100" : "text-white/[0.03]"
      }`}>
        {subCategory}
      </div>

      {/* 🔴 Accent Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        
        {/* Top: Metadata */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Trophy size={10} className="text-primary" />
              <span className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-400" : "text-white/40"
              }`}>
                {category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={9} className={theme === 'day' ? "text-slate-300" : "text-white/20"} />
              <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-400" : "text-white/40"
              }`}>
                {venue}
              </span>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full border backdrop-blur-xl transition-all duration-1000 ${
            theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/5"
          }`}>
            <span className={`text-[8px] font-black tracking-widest transition-colors duration-1000 ${
              theme === 'day' ? "text-slate-900" : "text-white"
            }`}>LIGA</span>
          </div>
        </div>

        {/* Middle: Teams */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-6 w-1 rounded-full transition-all duration-1000",
              isHomeCercedense ? "bg-primary shadow-[0_0_10px_rgba(218,41,28,0.5)]" : "bg-slate-500/20"
            )} />
            <span className={`text-xl font-black uppercase tracking-tighter leading-none transition-colors duration-1000 ${
              isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-white") : "text-white/40"
            }`}>
              {home}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-6 w-1 rounded-full transition-all duration-1000",
              !isHomeCercedense ? "bg-primary shadow-[0_0_10px_rgba(218,41,28,0.5)]" : "bg-slate-500/20"
            )} />
            <span className={`text-xl font-black uppercase tracking-tighter leading-none transition-colors duration-1000 ${
              !isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-white") : "text-white/40"
            }`}>
              {away}
            </span>
          </div>
        </div>

        {/* Bottom: Schedule */}
        <div className="flex justify-between items-end border-t border-white/5 pt-3 mt-1">
          <div className="flex items-center gap-3">
             <div className="flex flex-col">
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-1000 ${
                  theme === 'day' ? "text-slate-400" : "text-white/30"
                }`}>DOMINGO</span>
                <span className={`text-base font-black tabular-nums transition-colors duration-1000 ${
                  theme === 'day' ? "text-slate-900" : "text-white"
                }`}>{date}</span>
             </div>
          </div>
          
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 mb-0.5">
                <Clock size={10} className="text-primary" />
                <span className={`text-lg font-black tabular-nums transition-colors duration-1000 ${
                  theme === 'day' ? "text-slate-900" : "text-white"
                }`}>{time}</span>
             </div>
             <span className={`text-[7px] font-black tracking-[0.4em] uppercase transition-colors duration-1000 ${
               theme === 'day' ? "text-primary" : "text-primary/60"
             }`}>HORA DO PARTIDO</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
