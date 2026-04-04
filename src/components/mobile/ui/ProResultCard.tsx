"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProResultCardProps {
  home: string;
  away: string;
  score: string;
  date: string;
  category: string;
  result: "VITORIA" | "DERROTA" | "EMPATE";
  index: number;
  theme?: "day" | "night";
}

export function ProResultCard({ home, away, score, date, category, result, index, theme = "night" }: ProResultCardProps) {
  
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
  const isHomeCercedense = home.toUpperCase().includes("CERCEDENSE");

  // 🚦 Result Styling
  const getResultConfig = () => {
    switch (result) {
      case "VITORIA":
        return { color: "text-green-500", bar: "bg-green-500", glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]" };
      case "EMPATE":
        return { color: theme === 'day' ? "text-slate-400" : "text-white/40", bar: "bg-slate-400/50", glow: "" };
      case "DERROTA":
        return { color: "text-primary", bar: "bg-primary", glow: "shadow-[0_0_20px_rgba(218,41,28,0.4)]" };
      default:
        return { color: "text-white/40", bar: "bg-white/10", glow: "" };
    }
  };

  const config = getResultConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      className={`relative w-full h-[155px] rounded-[2rem] overflow-hidden border transition-all duration-1000 ${
        theme === 'day' 
          ? "bg-white border-slate-200 shadow-[0_20px_40px_-15px_rgba(218,41,28,0.1)]" 
          : "bg-zinc-900 border-white/5 shadow-[0_0_40px_-10px_rgba(218,41,28,0.2)]"
      }`}
    >
      {/* 🔮 Background Watermark */}
      <div className={`absolute -right-4 -bottom-4 text-[100px] font-black italic select-none pointer-events-none transition-colors duration-1000 ${
        theme === 'day' ? "text-slate-100" : "text-white/[0.03]"
      }`}>
        {watermarkText}
      </div>

      {/* 🔴 Status Bar (Indicator) */}
      <div className={cn(
        "absolute top-0 left-0 w-1.5 h-full transition-all duration-1000",
        config.bar,
        config.glow
      )} />

      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pl-6">
        
        {/* Top: Metadata */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Trophy size={10} className="text-primary" />
              <span className={`text-[8px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-400" : "text-white/40"
              }`}>
                {category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={9} className={theme === 'day' ? "text-slate-300" : "text-white/20"} />
              <span className={`text-[7px] font-bold uppercase tracking-widest transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-400" : "text-white/40"
              }`}>
                {date}
              </span>
            </div>
          </div>
          
          <div className={cn(
            "px-3 py-1 rounded-full border backdrop-blur-xl transition-all duration-1000",
            theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/5"
          )}>
            <span className={cn(
              "text-[7px] font-black tracking-widest uppercase",
              config.color
            )}>
              {result}
            </span>
          </div>
        </div>

        {/* Middle: Teams & Score */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
             <div className="flex items-center gap-2.5">
                <div className={cn(
                  "h-4 w-1 rounded-full",
                  isHomeCercedense ? "bg-primary" : "bg-slate-500/20"
                )} />
                <span className={`text-base font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${
                  isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-white") : "text-white/40"
                }`}>
                  {home}
                </span>
             </div>
             <div className="flex items-center gap-2.5">
                <div className={cn(
                  "h-4 w-1 rounded-full",
                  !isHomeCercedense ? "bg-primary" : "bg-slate-500/20"
                )} />
                <span className={`text-base font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${
                  !isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-white") : "text-white/40"
                }`}>
                  {away}
                </span>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white/5 px-3 py-2 rounded-xl min-w-[70px] border border-white/5 shadow-inner">
             <span className={`text-3xl font-black tabular-nums tracking-tighter transition-colors duration-1000 ${
               theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
             }`}>
               {score}
             </span>
          </div>
        </div>

        {/* Bottom Row: Accent */}
        <div className="flex justify-between items-center opacity-30">
           <span className="text-[6px] font-black tracking-[0.4em] uppercase">ROXO HUD</span>
           <div className="h-[1px] flex-1 mx-3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
           <span className="text-[6px] font-black tracking-[0.4em] uppercase">CAC</span>
        </div>

      </div>
    </motion.div>
  );
}
