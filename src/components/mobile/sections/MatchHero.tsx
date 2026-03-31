"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function MatchHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-primary p-8 shadow-[0_20px_50px_-12px_rgba(218,41,28,0.5)]"
    >
      {/* Background Pattern */}
      <div className="absolute right-[-20%] top-[-10%] opacity-10">
        <Calendar size={240} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-[0.3em] text-white/60">
            SENIOR MASCULINO · JORNADA 25
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black tracking-tighter text-white">
            CERCEDENSE <span className="text-white/40 italic">vs</span> ORDES CF
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
            <Calendar size={14} className="text-white" />
            <span className="text-xs font-bold text-white uppercase">Dom 5 Abr</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
            <Clock size={14} className="text-white" />
            <span className="text-xs font-bold text-white uppercase">17:00H</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
            <MapPin size={14} className="text-white" />
            <span className="text-xs font-bold text-white">Campo O Roxo</span>
          </div>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-black tracking-widest text-primary transition-transform active:scale-95">
          VER TODOS LOS PARTIDOS
          <span className="text-lg">›</span>
        </button>
      </div>
    </motion.div>
  );
}
