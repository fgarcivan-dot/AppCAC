"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink, Calendar } from "lucide-react";

interface SocialPostProps {
  imageUrl: string;
  caption: string;
  postUrl: string;
  date: string;
  theme?: "day" | "night";
}

export function SocialPost({ imageUrl, caption, postUrl, date, theme = "night" }: SocialPostProps) {
  return (
    <motion.a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="block w-full group overflow-hidden"
    >
      <div className={`relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden active:scale-[0.98] transition-all duration-1000 ${
        theme === 'day' ? "shadow-[0_20px_40px_-15px_rgba(218,41,28,0.2)]" : "shadow-3xl shadow-black/80"
      }`}>
        
        {/* Full Bleed Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl} 
          alt="Instagram Post" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-1000 group-hover:opacity-100" />
        
        {/* Instagram Floating Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-xl border border-white/20 text-white transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:scale-110">
          <Instagram size={20} />
        </div>

        {/* Floating Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/70">
              <Calendar size={12} className="text-primary" />
              <span className="text-[10px] font-black tracking-widest uppercase" style={{ fontFamily: 'NeueMontreal' }}>{date}</span>
            </div>
          </div>

          <p className="text-xl sm:text-2xl font-bold leading-[1.2] line-clamp-3 text-white drop-shadow-md">
            "{caption}"
          </p>

          <div className="flex items-center justify-between w-full mt-2">
             <span className="text-[10px] font-black text-white/50 tracking-[0.4em] uppercase transition-colors group-hover:text-white" style={{ fontFamily: 'NeueMontreal' }}>
                VER EN INSTAGRAM
             </span>
             <ExternalLink size={14} className="text-white/30 group-hover:text-primary transition-colors" />
          </div>

          {/* Interactive Progress Bar Hint */}
          <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-1000 ease-out" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
