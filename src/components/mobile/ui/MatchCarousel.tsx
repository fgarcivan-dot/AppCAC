"use client";

import { motion } from "framer-motion";
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
  const centerCardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Ultimate ID-based scrolling for Android WebViews
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20; // 2 seconds total (100ms * 20)

    const forceCenter = () => {
      const centerCard = document.getElementById('match-card-1');
      if (centerCard && scrollRef.current) {
        centerCard.scrollIntoView({
          behavior: 'auto',
          inline: 'center',
          block: 'nearest'
        });

        // Final verification: Is the card actually visible/centered?
        if (attempts > 2) {
          setMounted(true);
        }
        return true;
      }
      return false;
    };

    const timer = setInterval(() => {
      attempts++;
      forceCenter();

      // Safety fallback
      if (attempts > 10) setMounted(true);

      if (attempts >= maxAttempts) clearInterval(timer);
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
    <div className={`relative w-full py-2 overflow-hidden transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col gap-2">

        {/* Full-Bleed Panoramic Swiper Container */}
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
                ref={i === 1 ? centerCardRef : null}
                className="flex-none w-screen max-w-full px-6 snap-center"
              >
                {/* Stadium Atmosphere Backdrop: Dynamic styling for Day/Night */}
                <div className={`w-full h-[320px] relative transition-all duration-1000
                  rounded-[2.5rem] overflow-hidden border transition-all ${theme === 'day'
                    ? "bg-slate-100 border-slate-300/40 shadow-none"
                    : "bg-gradient-to-b from-zinc-900 via-black to-black border-white/5 shadow-2xl shadow-black/80"
                  }
                `}>

                  {/* Spotlight Radial Gradient - Disabled in Day Mode for maximum clarity */}
                  <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                      background: isActive && mounted
                        ? (theme === 'day'
                          ? `none`
                          : `radial-gradient(circle at center, rgba(218, 41, 28, 0.25) 0%, transparent 70%)`)
                        : (theme === 'day'
                          ? `none`
                          : `radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)`),
                      opacity: theme === 'day' ? 0 : 0.4
                    }}
                  />

                  {/* Panoramic HUD Labels */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">

                    {match.status === "DESCANSO" ? (
                      /* Minimalist Rest Day Mode: Show title + "DESCANSO" centered */
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-10">
                        <span className={`absolute top-10 text-[9px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-400" : "text-white/40"
                          }`} style={{ fontFamily: 'NeueMontreal' }}>
                          {match.title}
                        </span>
                        <motion.span
                          animate={{
                            scale: isActive ? 1 : 0.8,
                            opacity: isActive ? (theme === 'day' ? 0.6 : 0.3) : 0.1,
                          }}
                          className={`text-3xl sm:text-4xl font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_30px_rgba(218,41,28,0.4)]"
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
                          <span className={`text-[9px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-400" : "text-white/50"
                            }`} style={{ fontFamily: 'NeueMontreal' }}>
                            {match.title}
                          </span>
                          <div className={`flex items-center gap-2 transition-colors duration-1000 ${theme === 'day' ? "text-slate-300" : "text-white/40"
                            }`}>
                            <Calendar size={10} className="text-primary/60" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ fontFamily: 'NeueMontreal' }}>
                              {match.date}
                            </span>
                          </div>
                        </div>

                        {/* Middle Score: Absolute Center */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none ${(match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "FINALIZADO") || (match.score?.toLowerCase() === "vs")
                            ? ""
                            : "pt-4"
                          }`}>
                          <motion.span
                            animate={{
                              scale: isActive ? 1 : 0.8,
                              opacity: isActive ? 1 : (theme === 'day' ? 0.4 : 0.2),
                            }}
                            className={`font-black tracking-tighter transition-colors duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_50px_rgba(218,41,28,0.3)]"
                              } ${(match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "FINALIZADO") || (match.score?.toLowerCase() === "vs")
                                ? "text-2xl sm:text-3xl tracking-[0.2em]"
                                : "text-7xl sm:text-8xl"
                              }`}
                          >
                            {(match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "FINALIZADO") || (match.score?.toLowerCase() === "vs") ? (
                              <div className="flex flex-col items-center justify-center leading-[0.8] text-center">
                                {((match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "FINALIZADO") ? match.status : "POR DEFINIR") === "POR DEFINIR" ? (
                                  <>
                                    <span className={`text-4xl sm:text-5xl font-black tracking-widest uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_30px_rgba(218,41,28,0.3)]"
                                      }`}>POR</span>
                                    <span className={`text-4xl sm:text-5xl font-black tracking-widest uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_30px_rgba(218,41,28,0.3)]"
                                      }`}>DEFINIR</span>
                                  </>
                                ) : (
                                  <span className={`text-3xl sm:text-4xl font-black tracking-[0.2em] uppercase transition-colors duration-1000 ${theme === 'day' ? "text-slate-900" : "text-white drop-shadow-[0_0_30px_rgba(218,41,28,0.3)]"
                                    }`}>
                                    {(match.status && match.status !== "EN XOGO" && match.status !== "PAUSA" && match.status !== "FINALIZADO") ? match.status : match.score}
                                  </span>
                                )}
                              </div>
                            ) : (
                              match.score
                            )}
                          </motion.span>

                          {/* Live Status Indicator (Only shown during or after the game) */}
                          {match.status && (match.status === "EN XOGO" || match.status === "PAUSA" || match.status === "FINALIZADO") && (
                            <motion.div
                              animate={{ opacity: isActive ? 1 : 0 }}
                              className="flex items-center gap-2 mt-4"
                            >
                              {match.status === "EN XOGO" && (
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                              )}
                              <span
                                className={`text-[9px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${match.status === "EN XOGO" ? "text-green-500" :
                                  match.status === "PAUSA" ? (theme === 'day' ? "text-slate-300" : "text-white/40") :
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
                        <div className="flex justify-between items-end gap-10">
                          <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-bold text-primary tracking-[0.4em] uppercase" style={{ fontFamily: 'NeueMontreal' }}>LOCAL</span>
                            <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-1000 ${match.home.toUpperCase().includes("CERCEDENSE")
                                ? "text-primary"
                                : (theme === 'day' ? "text-slate-900" : "text-white")
                              }`} style={{ fontFamily: 'NeueMontreal' }}>{match.home}</span>
                          </div>

                          {/* Venue in bottom right info - Hidden if DESCANSO */}
                          {match.away !== "DESCANSO" && (
                            <div className="flex flex-col items-end gap-1">
                              <span className={`text-sm font-bold uppercase tracking-wider text-right transition-colors duration-1000 ${match.away.toUpperCase().includes("CERCEDENSE")
                                  ? "text-primary"
                                  : (theme === 'day' ? "text-slate-900" : "text-white")
                                }`} style={{ fontFamily: 'NeueMontreal' }}>{match.away}</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute top-1/2 left-0 w-1 h-20 -translate-y-1/2 rounded-r-full transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-100' : 'bg-white/5'
                    }`} />
                  <div className={`absolute top-1/2 right-0 w-1 h-20 -translate-y-1/2 rounded-l-full transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-100' : 'bg-white/5'
                    }`} />

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cinematic Underline Indicator */}
        <div className="flex justify-center gap-1">
          {matches.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: activeIndex === i ? 60 : 20,
                opacity: activeIndex === i ? 1 : 0.1,
                backgroundColor: activeIndex === i ? "#DA291C" : (theme === 'day' ? "#cbd5e1" : "rgba(255, 255, 255, 0.1)")
              }}
              className="h-0.5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
