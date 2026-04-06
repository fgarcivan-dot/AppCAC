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
  refreshKey?: number;
}

export function MatchCarousel({ matches, refreshKey = 0 }: MatchCarouselProps) {
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
                {/* Elite Hero Card Container (Flexible min-height) */}
                <div className="w-full min-h-[200px] h-auto relative transition-all duration-1000 rounded-[2.2rem] overflow-hidden border bg-white border-black/5 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] pb-4">

                  {/* 🔴 Status Bar (Indicator) */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-50 shadow-[0_0_20px_rgba(218,41,28,0.4)]" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-20 pl-7">

                    {isRestDay ? (
                      /* Minimalist Rest Day Mode */
                      <div className="flex flex-col items-center justify-center flex-1 pr-4">
                        <span className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none text-foreground">
                          DESCANSA
                        </span>
                        <span className="text-[9px] font-black tracking-[0.5em] mt-3 opacity-40 text-foreground">
                          {match.title}
                        </span>
                        <div className="mt-4 flex flex-col items-center gap-1 opacity-20">
                          <span className="text-[7px] font-black tracking-[0.5em] uppercase text-foreground">{match.date}</span>
                          <div className="h-[1px] w-8 bg-foreground" />
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Top Metadata Row */}
                        <div className="flex justify-between items-start w-full">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <Calendar size={10} className="text-primary" />
                               <span className="text-[9px] font-black tracking-[0.3em] uppercase text-foreground/80">
                                 {match.title}
                               </span>
                            </div>
                             <div className="flex items-center gap-2">
                               <MapPin size={9} className="text-foreground/40" />
                               <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                                 {match.date} · {match.venue}
                               </span>
                             </div>
                          </div>
                          {/* Dynamic Status Pill - HIDDEN IF PRE-MATCH */}
                          {!isPreMatch && (
                             <div className="px-4 py-1.5 rounded-xl flex items-center justify-center gap-2 min-w-[70px] bg-slate-50">
                              {match.status === "EN XOGO" && (
                                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                              )}
                              <span className={cn(
                                "text-[8px] font-black tracking-widest uppercase transition-colors duration-1000",
                                match.status === "EN XOGO" ? "text-primary" :
                                   (match.status === "DESCANSO" || match.status === "PAUSA") ? "text-foreground/40" :
                                     (match.status === "FIN" || match.status === "FINALIZADO") ? (
                                       match.result === "VITORIA" ? "text-primary" :
                                         match.result === "EMPATE" ? "text-foreground/40" :
                                           "text-primary" // DERROTA
                                     ) :
                                       "text-foreground"
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
                                isHomeCercedense ? "bg-primary" : "bg-black/5"
                               )} />
                               <span className={`text-base sm:text-lg font-black uppercase tracking-tighter leading-tight ${isHomeCercedense ? "text-primary" : "text-foreground"}`}>
                                 {match.home}
                               </span>
                             </div>
                             <div className="flex items-center gap-3">
                               <div className={cn(
                                 "h-5 w-1 rounded-full",
                                 !isHomeCercedense ? "bg-primary" : "bg-black/5"
                               )} />
                               <span className={`text-base sm:text-lg font-black uppercase tracking-tighter leading-tight ${!isHomeCercedense ? "text-primary" : "text-foreground"}`}>
                                 {match.away}
                               </span>
                            </div>
                          </div>

                          {/* Score or Time Box - Squarer (rounded-xl) for a cleaner look */}
                           <div className="flex flex-col items-center justify-center px-4 h-[45px] min-w-[75px] rounded-xl shrink-0 bg-primary shadow-lg shadow-primary/20">
                             <span className={cn(
                               "font-black tabular-nums tracking-tighter leading-none text-white",
                               isPreMatch ? "text-lg" : "text-2xl"
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
          <span className={`text-[9px] font-black tracking-[0.2em] transition-colors duration-1000 text-foreground opacity-20`}>
            0{(activeIndex + 1)}
          </span>
          <div className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-slate-100 border border-black/5">
            {matches.map((_, i) => {
              const isSelected = activeIndex === i;
              return (
                <div key={i} className="relative flex items-center justify-center w-2 h-2">
                  <motion.div
                    animate={{
                      scale: isSelected ? 1 : 0.5,
                      opacity: isSelected ? 1 : 0.3,
                      backgroundColor: isSelected ? "#DA291C" : "rgba(0, 0, 0, 0.2)"
                    }}
                    className="w-full h-full rounded-full"
                  />
                  {isSelected && (
                    <motion.div
                      layoutId="liquid-focus"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="absolute inset-[-4px] rounded-full border border-primary/20 shadow-[0_0_15px_rgba(218,41,28,0.2)]"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <span className={`text-[9px] font-black tracking-[0.2em] transition-colors duration-1000 text-foreground opacity-20`}>
            0{matches.length}
          </span>
        </div>

      </div>
    </div>
  );
}
