"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Trophy, Ghost } from "lucide-react";
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

export function SeniorMatchCard({ home, away, date, time, category, venue, index }: SeniorMatchCardProps) {

  // 🏷️ DYNAMIC WATERMARK LOGIC
  const getWatermark = (cat: string) => {
    const uppercaseCat = cat.toUpperCase();
    if (uppercaseCat.includes("SENIOR")) return uppercaseCat.split(" ").pop() || "S";
    if (uppercaseCat.includes("ALEVÍN")) return "AL-" + (uppercaseCat.split(" ").pop() || "A");
    if (uppercaseCat.includes("BENXAMÍN")) return "BX-" + (uppercaseCat.split(" ").pop() || "A");
    if (uppercaseCat.includes("PREBENXAMÍN")) return "PB";
    if (uppercaseCat.includes("BIBERÓN")) return "BB";
    if (uppercaseCat.includes("XUVENIL")) return "XU";
    if (uppercaseCat.includes("CADETE")) return "CD";
    if (uppercaseCat.includes("INFANTIL")) return "IF";
    return uppercaseCat.charAt(0);
  };

  const watermarkText = getWatermark(category);
  const isRestDay = home.toUpperCase().includes("DESCANSO") || away.toUpperCase().includes("DESCANSO");
  const isHomeCercedense = home.toUpperCase().includes("CERCEDENSE");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="relative w-full min-h-[210px] h-auto rounded-[2.2rem] overflow-hidden border transition-all duration-1000 bg-white border-black/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] pb-6"
    >
      {/* 🔮 Background Watermark */}
      <div className="absolute -right-4 -bottom-6 text-[140px] font-black italic select-none pointer-events-none transition-colors duration-1000 text-black/[0.02]">
        {watermarkText}
      </div>

      {/* 🔴 Accent Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 pl-7">

        {/* Top: Metadata */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Trophy size={10} className="text-primary" />
              <span className="text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 text-foreground opacity-40">
                {category}
              </span>
            </div>
            {!isRestDay && (
              <div className="flex items-center gap-2">
                <MapPin size={9} className="text-foreground opacity-20" />
                <span className="text-[8px] font-bold uppercase tracking-widest transition-colors duration-1000 text-foreground opacity-40">
                  {venue}
                </span>
              </div>
            )}
          </div>

          {!isRestDay && (
            <div className="px-3 py-1 rounded-xl border backdrop-blur-xl flex items-center justify-center transition-all duration-1000 bg-slate-50 border-black/5 shadow-sm">
              <span className="text-[8px] font-black tracking-widest transition-colors duration-1000 text-foreground">LIGA</span>
            </div>
          )}
        </div>

        {/* Middle: Teams or Rest Message */}
        {isRestDay ? (
          <div className="flex flex-col justify-center items-center py-2">
            <span className="text-5xl font-black uppercase tracking-tighter leading-none transition-all duration-1000 text-foreground">
              DESCANSA
            </span>
            <span className="text-[9px] font-black tracking-[0.5em] mt-3 opacity-20 text-foreground">
              {category}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-6 w-1 rounded-full transition-all duration-1000",
                isHomeCercedense ? "bg-primary" : "bg-black/5"
              )} />
              <span className={`text-lg font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${isHomeCercedense ? "text-primary" : "text-foreground"}`}>
                {home}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-6 w-1 rounded-full transition-all duration-1000",
                !isHomeCercedense ? "bg-primary" : "bg-black/5"
              )} />
              <span className={`text-lg font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${!isHomeCercedense ? "text-primary" : "text-foreground"}`}>
                {away}
              </span>
            </div>
          </div>
        )}

        {/* Bottom: Schedule */}
        <div className="flex justify-between items-end border-t border-black/5 pt-3 mt-1">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-1000 text-foreground opacity-20">DOMINGO</span>
              <span className="text-base font-black tabular-nums transition-colors duration-1000 text-foreground">{date}</span>
            </div>
          </div>

          {/* Time Oval (Pill) Container */}
          <div className="flex flex-col items-end">
            {!isRestDay && (
              <>
                <div className="flex items-center gap-2 mb-0.5">
                  <Clock size={16} className="text-primary" />
                  <span className="text-2xl font-black tabular-nums transition-colors duration-1000 text-foreground">{time}</span>
                </div>
                <span className="text-[8px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 text-primary opacity-60">
                  HORA DO PARTIDO
                </span>
              </>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
