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
      <div className="relative rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden active:scale-[0.98] transition-all">
        
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
          <div className="absolute top-6 right-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 group-hover:bg-primary transition-colors">
            <Instagram size={18} className="text-white" />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/40">
              <Calendar size={12} />
              <span className="text-[10px] font-black tracking-widest uppercase">{date}</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="text-[10px] font-black tracking-widest uppercase">INSTAGRAM</span>
              <ExternalLink size={12} />
            </div>
          </div>

          <p className="text-sm font-medium leading-relaxed text-white/80 line-clamp-3 italic">
            "{caption}"
          </p>

          <div className="h-px w-full bg-white/5" />

          <div className="flex items-center justify-center py-2">
            <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase group-hover:text-white transition-colors">
              Pulsar para ver la publicación
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
