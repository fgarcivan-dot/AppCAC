"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

export interface Match {
  type?: string;
  title: string;
  date: string;
  home: string;
  away: string;
  score: string;
  result?: string;
  venue: string;
}

interface MatchCarouselProps {
  matches: Match[];
}

export function MatchCarousel({ matches }: MatchCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // Reliable Auto-scroll to center on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (centerCardRef.current) {
        centerCardRef.current.scrollIntoView({ 
          behavior: "auto", 
          inline: "center", 
          block: "nearest" 
        });
      }
    }, 150); // Small delay to ensure layout is ready
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const cardWidth = 280 + 24;
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative w-full py-6 overflow-hidden">
      <div className="flex flex-col gap-10">
        
        {/* Horizontal Swiper Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 gap-6 pb-4 scroll-smooth"
        >
          {matches.map((match, i) => (
            <div 
              key={i}
              ref={i === 1 ? centerCardRef : null}
              className="flex-none w-[280px] snap-center"
            >
              <div className="w-full rounded-[3.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-10 flex flex-col items-center gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] min-h-[320px] justify-center text-center relative overflow-hidden group">
                
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Title Badge Ratio */}
                <div className="px-5 py-2 rounded-full bg-white/5 border border-white/5 text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">
                  {match.title}
                </div>

                {/* Score vs Teams */}
                <div className="flex flex-col items-center justify-center w-full gap-6">
                  <div className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">
                    {match.home}
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-7xl font-black text-white tracking-tighter leading-none drop-shadow-2xl">
                      {match.score}
                    </span>
                    <span className="text-[10px] font-black text-primary mt-6 tracking-[0.4em] uppercase">
                      {match.date}
                    </span>
                  </div>

                  <div className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">
                    {match.away}
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex items-center gap-3 text-white/10">
                  <MapPin size={10} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em]">
                    {match.venue}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Padding for last card */}
          <div className="flex-none w-6 h-1" />
        </div>

        {/* Elite Dash Indicators */}
        <div className="flex justify-center gap-2">
          {matches.map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                width: activeIndex === i ? 40 : 8,
                backgroundColor: activeIndex === i ? hexToRgb(activeIndex === i ? "#DA291C" : "#ffffff", activeIndex === i ? 1 : 0.1) : "rgba(255, 255, 255, 0.1)"
              }}
              style={{ backgroundColor: activeIndex === i ? "#DA291C" : "rgba(255,255,255,0.1)" }}
              className="h-1 rounded-full transition-all duration-500" 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to keep animation smooth if needed, but simple hex is fine for now
function hexToRgb(hex: string, alpha: number) {
  return hex === "#DA291C" ? `rgba(218, 41, 28, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
}
