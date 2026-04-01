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
      <div className={`relative rounded-[2.5rem] border overflow-hidden active:scale-[0.98] transition-all duration-1000 ${
        theme === 'day' ? "bg-slate-100 border-slate-200 shadow-none" : "bg-white/[0.02] border-white/5 shadow-2xl"
      }`}>
        
        {/* Header-less Instagram Style (Minimalist) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt="Instagram Post" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Subtle Overlay Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          
          {/* Instagram Icon Badge */}
          <div className={`absolute top-6 right-6 p-3 rounded-2xl border transition-colors ${
            theme === 'day' ? "bg-slate-100/80 border-slate-100 group-hover:bg-primary" : "bg-white/10 border-white/10 group-hover:bg-primary"
          }`}>
            <Instagram size={18} className={theme === 'day' ? "text-slate-900 group-hover:text-white" : "text-white"} />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 transition-colors duration-1000 ${theme === 'day' ? "text-slate-400" : "text-white/40"}`}>
              <Calendar size={12} />
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: 'NeueMontreal' }}>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: 'NeueMontreal' }}>INSTAGRAM</span>
              <ExternalLink size={12} />
            </div>
          </div>

          <p className={`text-sm font-medium leading-relaxed line-clamp-3 italic transition-colors duration-1000 ${
            theme === 'day' ? "text-slate-700" : "text-white/80"
          }`}>
            "{caption}"
          </p>

          <div className={`h-px w-full transition-colors duration-1000 ${theme === 'day' ? "bg-slate-100" : "bg-white/5"}`} />

          <div className="flex items-center justify-center py-2">
            <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
              theme === 'day' ? "text-slate-300 group-hover:text-slate-900" : "text-white/20 group-hover:text-white"
            }`} style={{ fontFamily: 'NeueMontreal' }}>
              Pulsar para ver la publicación
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
