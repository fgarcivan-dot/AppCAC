"use client";

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

export interface Match {
  type?: string;
  title: string;
  date: string;
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
}

export function MatchCarousel({ matches, theme = "night" }: MatchCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  // 🛡️ SURGICAL CENTERING: Pure Horizontal Math (No vertical jumps)
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 120;

    const forceCenter = () => {
      const container = scrollRef.current;
      const centerCard = document.getElementById('match-card-1');
      
      if (container && centerCard && container.clientWidth > 0) {
        const targetScrollLeft = centerCard.offsetLeft - (container.clientWidth / 2) + (centerCard.clientWidth / 2);
        container.scrollTo({ left: targetScrollLeft, behavior: 'auto' });
        if (Math.abs(container.scrollLeft - targetScrollLeft) < 10) {
          setMounted(true);
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
  }, [matches]);

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
          className={`flex w-full overflow-x-auto scrollbar-hide px-0 gap-0 pb-4 ${
            mounted ? "snap-x snap-mandatory scroll-smooth" : "overflow-hidden"
          }`}
        >
          {matches.map((match, i) => {
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                id={`match-card-${i}`}
                // 🛑 MANDATORY STOP: Forces one-by-one even with fast swiping
                className="flex-none w-screen max-w-full px-6 snap-center snap-always"
              >
                {/* Stadium Atmosphere Backdrop: White & Red Passion */}
                <div className={`w-full h-[320px] relative transition-all duration-1000
                  rounded-[2.5rem] overflow-hidden border ${theme === 'day'
                    ? "bg-white border-primary/10 shadow-[0_20px_40px_-15px_rgba(218,41,28,0.15)]"
                    : "bg-black border-primary/20 shadow-[0_0_40px_-5px_rgba(218,41,28,0.25)]"
                  }
                `}>

                  {/* Spotlight Radial Gradient - Heroic Red Flare */}
                  <div
                    className="absolute inset-0 transition-opacity duration-1000 pointer-events-none mix-blend-plus-lighter"
                    style={{
                      background: isActive && mounted
                        ? (theme === 'day'
                          ? `radial-gradient(circle at center, rgba(218, 41, 28, 0.05) 0%, transparent 70%)`
                          : `radial-gradient(circle at center, rgba(218, 41, 28, 0.4) 0%, transparent 70%)`)
                        : `none`,
                      opacity: 1
                    }}
                  />

                  {/* Panoramic HUD Labels */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">

                    {match.status?.trim().toUpperCase() === "DESCANSO" || 
                     match.home?.trim().toUpperCase() === "DESCANSO" || 
                     match.away?.trim().toUpperCase() === "DESCANSO" ? (
                      /* Minimalist Rest Day Mode: Centered Title + "DESCANSO" Label */
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-10">
                        <motion.span
                          animate={{ opacity: isActive ? 1 : 0.4 }}
                          className={`text-[10px] font-black tracking-[0.5em] uppercase mb-4 transition-colors duration-1000 ${theme === 'day' ? "text-primary" : "text-white/40"
                            }`}
                          style={{ fontFamily: 'NeueMontreal' }}
                        >
                          {match.title}
                        </motion.span>
                        <motion.span
                          animate={{
                            scale: isActive ? 1 : 0.8,
                            opacity: isActive ? 1 : 0.2,
                          }}
                          className={`text-4xl sm:text-5xl font-black tracking-[0.2em] uppercase text-center transition-colors duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_30px_rgba(218,41,28,0.5)]"
                            }`}
                          style={{ fontFamily: 'NeueMontreal' }}
                        >
                          DESCANSO
                        </motion.span>
                      </div>
                    ) : (
                      <>
                        {/* Top Row: Info */}
                        <div className="flex justify-between items-start">
                          <span className={`text-[9px] font-black tracking-[0.4em] uppercase transition-colors duration-1000 ${theme === 'day' ? "text-primary" : "text-white/60"
                            }`} style={{ fontFamily: 'NeueMontreal' }}>
                            {match.title}
                          </span>
                          <div className={`flex items-center gap-2 transition-colors duration-1000 ${theme === 'day' ? "text-slate-700" : "text-white/60"
                            }`}>
                            <Calendar size={10} className="text-primary/80" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ fontFamily: 'NeueMontreal' }}>
                              {match.date}
                            </span>
                          </div>
                        </div>

                        {/* Middle Score: Absolute Center */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none ${(match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "DESCANSO" && match.status !== "FIN" && match.status !== "FINALIZADO") || (match.score?.toLowerCase() === "vs") || (match.score?.toUpperCase() === "POR DEFINIR") || (match.score?.includes(":") || match.score?.toUpperCase().includes("H"))
                            ? ""
                            : "pt-4"
                          }`}>
                          <motion.span
                            animate={{
                              scale: isActive ? 1 : 0.8,
                              opacity: isActive ? 1 : (theme === 'day' ? 0.4 : 0.2),
                            }}
                            className={`font-black tracking-tighter transition-colors duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_50px_rgba(218,41,28,0.3)]"
                              } ${(match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "DESCANSO" && match.status !== "FIN" && match.status !== "FINALIZADO") || (match.score?.toLowerCase() === "vs") || (match.score?.toUpperCase() === "POR DEFINIR") || (match.score?.includes(":") || match.score?.toUpperCase().includes("H"))
                                ? "text-4xl sm:text-5xl tracking-[0.1em]"
                                : "text-7xl sm:text-8xl"
                              }`}
                          >
                            {(match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "DESCANSO" && match.status !== "FIN" && match.status !== "FINALIZADO") || (match.score?.toLowerCase() === "vs") || (match.score?.toUpperCase() === "POR DEFINIR") || (match.score?.includes(":") || match.score?.toUpperCase().includes("H")) ? (
                              <div className="flex items-center justify-center text-center opacity-80">
                                {match.score?.toUpperCase() === "POR DEFINIR" ? "VS" : match.score}
                              </div>
                            ) : (
                              match.score
                            )}
                          </motion.span>

                          {/* Live Status Indicator */}
                          {match.status && (match.status === "EN XOGO" || match.status === "PAUSA" || match.status === "DESCANSO" || match.status === "FIN" || match.status === "FINALIZADO") && (
                            <motion.div
                              animate={{ opacity: isActive ? 1 : 0 }}
                              className="flex items-center gap-2 mt-4"
                            >
                              {match.status === "EN XOGO" && (
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                              )}
                              <span
                                className={`text-[9px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${match.status === "EN XOGO" ? "text-green-500" :
                                  (match.status === "PAUSA" || match.status === "DESCANSO") ? (theme === 'day' ? "text-slate-400" : "text-slate-400") :
                                    (match.status === "FIN" || match.status === "FINALIZADO") ? "text-primary" :
                                      (theme === 'day' ? "text-slate-400" : "text-white")
                                  }`}
                                style={{ fontFamily: 'NeueMontreal' }}
                              >
                                {match.status}
                              </span>
                            </motion.div>
                          )}
                        </div>

                        {/* Bottom Row: Teams */}
                        <div className="flex justify-between items-end gap-10 relative z-20">
                          <div className="flex flex-col w-[55%] items-start relative">
                            {match.home !== "DESCANSO" && (
                              <div className="mb-2 px-1.5 py-0.5 bg-red-600 rounded-[4px] shadow-sm flex items-center justify-center">
                                <span className="text-[8px] font-black tracking-[0.1em] text-white uppercase leading-none" style={{ fontFamily: 'NeueMontreal' }}>LOCAL</span>
                              </div>
                            )}
                            <span className={`text-sm sm:text-base font-black uppercase tracking-widest leading-[1.1] break-words transition-colors duration-1000 ${match.home.toUpperCase().includes("CERCEDENSE")
                                ? "text-primary drop-shadow-sm"
                                : (theme === 'day' ? "text-slate-900" : "text-white")
                              }`} style={{ fontFamily: 'NeueMontreal' }}>{match.home}</span>
                          </div>

                          <div className="flex flex-col items-end gap-1 w-[45%] text-right">
                              <span className={`text-sm sm:text-base font-black uppercase tracking-widest leading-[1.1] break-words transition-colors duration-1000 ${match.away.toUpperCase().includes("CERCEDENSE")
                                  ? "text-primary drop-shadow-sm"
                                  : (theme === 'day' ? "text-slate-900" : "text-white")
                                }`} style={{ fontFamily: 'NeueMontreal' }}>{match.away}</span>
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

        {/* 🎬 SEGMENTED PILL SLIDER: Cleanest integrated HUD indicator */}
        <div className="flex justify-center mt-2">
          <div className={`relative flex items-center p-1 rounded-full border backdrop-blur-xl transition-[background,border] duration-1000 ${
            theme === 'day' 
              ? "bg-slate-100/50 border-slate-200" 
              : "bg-white/5 border-white/5"
          }`}>
            
            {/* The Floating Red Pill Background */}
            <motion.div
              layoutId="active-pill"
              animate={{ 
                x: activeIndex * 48 // 48px is the width of each segment (40px + gap)
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute left-1 h-[24px] w-[40px] rounded-full bg-primary shadow-[0_5px_15px_rgba(218,41,28,0.3)] z-10"
            />

            {/* Segments Container */}
            <div className="relative flex items-center gap-2 px-1 z-20">
              {matches.map((_, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={i}
                    className={`w-[40px] flex items-center justify-center transition-colors duration-500`}
                  >
                    <span 
                      className={`text-[9px] font-black tracking-tighter transition-colors duration-500 ${
                        isActive 
                          ? "text-white" 
                          : (theme === 'day' ? "text-slate-400" : "text-white/20")
                      }`}
                      style={{ fontFamily: 'NeueMontreal' }}
                    >
                      {i + 1}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Total indicator HUD style */}
        <div className="flex justify-center mt-2 opacity-30">
          <span className="text-[7px] font-black tracking-[0.5em] uppercase">
            {activeIndex + 1} / {matches.length}
          </span>
        </div>

      </div>
    </div>
  );
}
