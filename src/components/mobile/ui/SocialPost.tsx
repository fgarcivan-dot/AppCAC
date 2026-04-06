"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink, Calendar } from "lucide-react";

interface SocialPostProps {
  imageUrl: string;
  caption: string;
  postUrl: string;
  date: string;
}

export function SocialPost({ imageUrl, caption, postUrl, date }: SocialPostProps) {
  return (
    <motion.a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="block w-full group overflow-hidden"
    >
      <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden active:scale-[0.98] transition-all duration-1000 shadow-xl shadow-black/5">
        
        {/* Full Bleed Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl} 
          alt="Instagram Post" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-1000 group-hover:opacity-100" />
        
        {/* Instagram Floating Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:scale-110">
          <Instagram size={20} />
        </div>

        {/* Floating Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Calendar size={12} className="text-primary" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">{date}</span>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-black leading-none uppercase tracking-tighter text-white drop-shadow-md">
            {caption}
          </p>

          <div className="flex items-center justify-between w-full mt-2">
             <span className="text-[10px] font-black text-white/50 tracking-[0.5em] uppercase transition-colors group-hover:text-white group-hover:opacity-100 opacity-60">
                VER EN INSTAGRAM
             </span>
             <ExternalLink size={14} className="text-white opacity-30 group-hover:text-primary transition-colors hover:opacity-100" />
          </div>

          {/* Interactive Progress Bar Hint */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-1000 ease-out" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
