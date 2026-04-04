"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProResultCardProps {
  home: string;
  away: string;
  score: string;
  date: string;
  time?: string;
  venue: string;
  category: string;
  result: "VITORIA" | "DERROTA" | "EMPATE";
  status?: string;
  index: number;
  theme?: "day" | "night";
}

export function ProResultCard({ home, away, score, date, time, venue, category, result, status, index, theme = "night" }: ProResultCardProps) {

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
  const isRestDay = home.toUpperCase().includes("DESCANSO") || away.toUpperCase().includes("DESCANSO");
  const isPreMatch = !status || status?.toUpperCase() === "PRÓXIMO";

  // 🚦 Result Styling - Precision HUD
  const getResultConfig = () => {
    if (isRestDay) return { color: "text-white/20", bar: "bg-white/10", glow: "", text: "DESCANSA" };

    // Default label logic
    const displayResult = result === "VITORIA" ? "VICTORIA" : result;

    // Status Overrides
    if (status === "EN XOGO") return { color: "text-green-500", bar: "bg-green-500", glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]", text: "EN XOGO" };
    if (status === "DESCANSO" || status === "PAUSA") return { color: theme === 'day' ? "text-slate-600" : "text-slate-400", bar: "bg-slate-400/50", glow: "", text: "DESCANSO" };

    // Finished Match logic
    if (status === "FIN" || status === "FINALIZADO") {
      switch (result) {
        case "VITORIA":
          return { color: "text-green-500", bar: "bg-green-500", glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]", text: "VICTORIA" };
        case "EMPATE":
          return { color: theme === 'day' ? "text-slate-600" : "text-white/40", bar: "bg-slate-400/50", glow: "", text: "EMPATE" };
        case "DERROTA":
          return { color: "text-primary", bar: "bg-primary", glow: "shadow-[0_0_20px_rgba(218,41,28,0.4)]", text: "DERROTA" };
        default:
          return { color: "text-primary", bar: "bg-primary", glow: "shadow-[0_0_20px_rgba(218,41,28,0.4)]", text: "FIN" };
      }
    }

    return { color: "text-white/40", bar: "bg-white/10", glow: "", text: status || result || "LIGA" };
  };

  const config = getResultConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      className={`relative w-full h-[190px] rounded-[2rem] overflow-hidden border transition-all duration-1000 ${theme === 'day'
          ? "bg-white border-slate-200 shadow-[0_20px_40px_-15px_rgba(218,41,28,0.1)]"
          : "bg-zinc-900 border-white/5 shadow-[0_0_40px_-10px_rgba(218,41,28,0.2)]"
        }`}
    >
      {/* 🔮 Background Watermark */}
      <div className={`absolute -right-4 -bottom-6 text-[140px] font-black italic select-none pointer-events-none transition-colors duration-1000 ${theme === 'day' ? "text-slate-100" : "text-white/[0.03]"
        }`}>
        {watermarkText}
      </div>

      {/* 🔴 Status Bar (Indicator) */}
      <div className={cn(
        "absolute top-0 left-0 w-1.5 h-full transition-all duration-1000",
        config.bar,
        config.glow
      )} />

      <div className={cn(
        "absolute inset-0 flex flex-col z-10 p-6",
        isRestDay ? "justify-center items-center" : "justify-between pl-8"
      )}>

        {/* Top: Metadata (Hide for Rest to allow perfect center, or show small above) */}
        {!isRestDay && (
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <Trophy size={10} className="text-primary" />
                <span className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-600" : "text-white/40"
                  }`}>
                  {category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={9} className={theme === 'day' ? "text-slate-500" : "text-white/20"} />
                <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors duration-1000 ${theme === 'day' ? "text-slate-500" : "text-white/40"
                  }`}>
                  ÚLTIMA XORNADA · {date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={9} className={theme === 'day' ? "text-slate-500" : "text-white/20"} />
                <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors duration-1000 ${theme === 'day' ? "text-slate-500" : "text-white/40"
                  }`}>
                  {venue}
                </span>
              </div>
            </div>

            {/* Dynamic Status Pill - HIDDEN IF PRE-MATCH */}
            {!isPreMatch && (
              <div className={cn(
                "px-4 py-1.5 rounded-xl border backdrop-blur-xl flex items-center justify-center gap-2 min-w-[80px] transition-all duration-1000",
                theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/5"
              )}>
                {status === "EN XOGO" && (
                  <div className="h-1.5 w-1.5 rounded-xl bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                )}
                <span className={cn(
                  "text-[8px] font-black tracking-widest uppercase text-center",
                  config.color
                )}>
                  {config.text}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Middle: Content */}
        {isRestDay ? (
          <div className="flex flex-col items-center justify-center">
            <span className={`text-6xl font-black uppercase tracking-tighter leading-none transition-all duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              }`}>
              DESCANSA
            </span>
            <span className={`text-[9px] font-black tracking-[0.5em] mt-3 opacity-20 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
               {category}
            </span>
            <div className="mt-4 flex flex-col items-center gap-1 opacity-20">
              <span className="text-[7px] font-black tracking-[0.5em] uppercase">{date}</span>
              <div className="h-[1px] w-8 bg-current" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-5 w-1 rounded-xl",
                  isHomeCercedense ? "bg-primary" : "bg-slate-500/20"
                )} />
                <span className={`text-lg font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-primary") : (theme === 'day' ? "text-slate-500" : "text-white")
                  }`}>
                  {home}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-5 w-1 rounded-xl",
                  !isHomeCercedense ? "bg-primary" : "bg-slate-500/20"
                )} />
                <span className={`text-lg font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${!isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-primary") : (theme === 'day' ? "text-slate-500" : "text-white")
                  }`}>
                  {away}
                </span>
              </div>
            </div>

            {/* Score Box - Squarer (rounded-xl) for a cleaner look */}
            <div className={cn(
              "flex flex-col items-center justify-center px-4 h-[45px] min-w-[75px] rounded-xl border backdrop-blur-md transition-all duration-1000 shrink-0",
              theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/[0.12] border-white/10 shadow-inner"
            )}>
              <span className={cn(
                "font-black tabular-nums tracking-tighter leading-none transition-colors duration-1000",
                isPreMatch ? "text-lg text-primary" : "text-2xl",
                theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              )}>
                {isPreMatch ? (time || "VS") : score}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
