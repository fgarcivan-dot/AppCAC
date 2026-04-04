"use client";

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Match {
  type?: string;
  title: string;
  date: string;
  time?: string;
  home: string;
  away: string;
  score: string;
  result?: string;
  status?: "EN XOGO" | "PAUSA" | "FINALIZADO" | string;
  venue: string;
}

interface MatchCarouselProps {
  matches: Match[];
  theme?: "day" | "night";
  refreshKey?: number;
}

export function MatchCarousel({ matches, theme = "night", refreshKey = 0 }: MatchCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  // 🛡️ SURGICAL CENTERING: Force focus on index 1 (Current Matchday)
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 120;

    // Default focus target is index 1 (Middle card in a 3-card layout)
    const targetIndex = matches.length >= 3 ? 1 : 0;

    const forceCenter = () => {
      const container = scrollRef.current;
      const targetCard = document.getElementById(`match-card-${targetIndex}`);

      if (container && targetCard && container.clientWidth > 0) {
        const targetScrollLeft = targetCard.offsetLeft - (container.clientWidth / 2) + (targetCard.clientWidth / 2);
        container.scrollTo({ left: targetScrollLeft, behavior: 'auto' });
        if (Math.abs(container.scrollLeft - targetScrollLeft) < 10) {
          setMounted(true);
          setActiveIndex(targetIndex);
          return true;
        }
      }
      return false;
    };

    const timer = setInterval(() => {
      attempts++;
      const success = forceCenter();
      if (success && attempts > 15) clearInterval(timer);
      if (attempts >= maxAttempts) {
        setMounted(true);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [matches, refreshKey]); // Added refreshKey dependency

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!mounted) return;
    const container = e.currentTarget;
    const cardWidth = container.clientWidth || 375;
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index !== activeIndex && index >= 0 && index < matches.length) {
      setActiveIndex(index);
    }
  };

  return (
    <div className={`relative w-full py-2 overflow-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col gap-2">

        {/* Full-Bleed Swipe Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={`flex w-full overflow-x-auto scrollbar-hide px-0 gap-0 pb-4 ${mounted ? "snap-x snap-mandatory scroll-smooth" : "overflow-hidden"
            }`}
        >
          {matches.map((match, i) => {
            const isActive = activeIndex === i;
            const isRestDay = match.status?.trim().toUpperCase() === "DESCANSO" ||
              match.home?.trim().toUpperCase() === "DESCANSO" ||
              match.away?.trim().toUpperCase() === "DESCANSO";

            const isHomeCercedense = match.home.toUpperCase().includes("CERCEDENSE");
            const isPreMatch = !match.status || match.status?.toUpperCase() === "PRÓXIMO";

            return (
              <motion.div
                key={i}
                id={`match-card-${i}`}
                className="flex-none w-screen max-w-full px-6 snap-center snap-always"
              >
                {/* Elite Hero Card Container (190px) */}
                <div className={`w-full h-[190px] relative transition-all duration-1000 rounded-[2rem] overflow-hidden border ${theme === 'day'
                    ? "bg-white border-slate-200 shadow-[0_20px_40px_-15px_rgba(218,41,28,0.1)]"
                    : "bg-zinc-900 border-white/5 shadow-[0_0_40px_-10px_rgba(218,41,28,0.2)]"
                  }
                `}>

                  {/* 🔴 Status Bar (Indicator) */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-50 shadow-[0_0_20px_rgba(218,41,28,0.4)]" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pl-8">

                    {isRestDay ? (
                      /* Minimalist Rest Day Mode */
                      <div className="flex flex-col items-center justify-center flex-1">
                        <span className={`text-6xl font-black uppercase tracking-tighter leading-none transition-all duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                          }`}>
                          DESCANSA
                        </span>
                        <span className={`text-[9px] font-black tracking-[0.5em] mt-3 opacity-20 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                          {match.title}
                        </span>
                        <div className="mt-4 flex flex-col items-center gap-1 opacity-20">
                          <span className="text-[7px] font-black tracking-[0.5em] uppercase">{match.date}</span>
                          <div className="h-[1px] w-8 bg-current" />
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Top Metadata Row */}
                        <div className="flex justify-between items-start w-full">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <Calendar size={10} className="text-primary" />
                              <span className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-600" : "text-white/40"
                                }`}>
                                {match.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={9} className={theme === 'day' ? "text-slate-500" : "text-white/20"} />
                              <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors duration-1000 ${theme === 'day' ? "text-slate-600" : "text-white/40"
                                }`}>
                                {match.date} · {match.venue}
                              </span>
                            </div>
                          </div>
                          {/* Dynamic Status Pill - HIDDEN IF PRE-MATCH */}
                          {!isPreMatch && (
                            <div className={cn(
                              "px-4 py-1.5 rounded-xl border backdrop-blur-xl flex items-center justify-center gap-2 min-w-[70px] transition-all duration-1000",
                              theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/5"
                            )}>
                              {match.status === "EN XOGO" && (
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                              )}
                              <span className={cn(
                                "text-[8px] font-black tracking-widest uppercase transition-colors duration-1000",
                                match.status === "EN XOGO" ? "text-green-500" :
                                  (match.status === "DESCANSO" || match.status === "PAUSA") ? (theme === 'day' ? "text-slate-600" : "text-slate-400") :
                                    (match.status === "FIN" || match.status === "FINALIZADO") ? (
                                      match.result === "VITORIA" ? "text-green-500" :
                                        match.result === "EMPATE" ? (theme === 'day' ? "text-slate-600" : "text-white/40") :
                                          "text-primary" // DERROTA
                                    ) :
                                      (theme === 'day' ? "text-slate-900" : "text-white")
                              )}>
                                {((match.status === "FIN" || match.status === "FINALIZADO") && match.result)
                                  ? (match.result === "VITORIA" ? "VICTORIA" : match.result)
                                  : match.status}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Middle Content Row: Teams & Score */}
                        <div className="flex items-center justify-between gap-4 w-full">
                          <div className="flex flex-col gap-2 flex-1 mt-2">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "h-5 w-1 rounded-full",
                                isHomeCercedense ? "bg-primary" : "bg-slate-500/20"
                              )} />
                              <span className={`text-lg font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-primary") : (theme === 'day' ? "text-slate-500" : "text-white")
                                  }`}>
                                {match.home}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "h-5 w-1 rounded-full",
                                !isHomeCercedense ? "bg-primary" : "bg-slate-500/20"
                              )} />
                              <span className={`text-lg font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${!isHomeCercedense ? (theme === 'day' ? "text-slate-900" : "text-primary") : (theme === 'day' ? "text-slate-500" : "text-white")
                                  }`}>
                                {match.away}
                              </span>
                            </div>
                          </div>

                          {/* Score or Time Box - Squarer (rounded-xl) for a cleaner look */}
                          <div className={cn(
                            "flex flex-col items-center justify-center px-4 h-[45px] min-w-[75px] rounded-xl border backdrop-blur-md transition-all duration-1000 shrink-0",
                            theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/[0.12] border-white/10 shadow-inner"
                          )}>
                            <span className={cn(
                              "font-black tabular-nums tracking-tighter leading-none transition-colors duration-1000",
                              isPreMatch ? "text-lg text-primary" : "text-2xl",
                              theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            )}>
                              {isPreMatch ? (match.time || "VS") :
                                (match.score === "vs" || match.score.toUpperCase() === "POR DEFINIR" ? "VS" : match.score)
                              }
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 🧪 LIQUID MAGNETIC DOTS Indicator */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <span className={`text-[9px] font-black tracking-[0.2em] transition-colors duration-1000 ${theme === 'day' ? 'text-slate-500' : 'text-white/10'}`}>
            0{(activeIndex + 1)}
          </span>
          <div className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-black/5 backdrop-blur-sm border border-white/5">
            {matches.map((_, i) => {
              const isSelected = activeIndex === i;
              return (
                <div key={i} className="relative flex items-center justify-center w-2 h-2">
                  <motion.div
                    animate={{
                      scale: isSelected ? 1 : 0.5,
                      opacity: isSelected ? 1 : 0.3,
                      backgroundColor: isSelected ? "#DA291C" : (theme === 'day' ? "#94a3b8" : "rgba(255, 255, 255, 0.4)")
                    }}
                    className="w-full h-full rounded-full"
                  />
                  {isSelected && (
                    <motion.div
                      layoutId="liquid-focus"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="absolute inset-[-4px] rounded-full border border-primary/20 shadow-[0_0_15px_rgba(218,41,28,0.4)]"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <span className={`text-[9px] font-black tracking-[0.2em] transition-colors duration-1000 ${theme === 'day' ? 'text-slate-500' : 'text-white/10'}`}>
            0{matches.length}
          </span>
        </div>

      </div>
    </div>
  );
}
