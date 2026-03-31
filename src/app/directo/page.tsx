"use client";

import { Radio, Youtube, Bell, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Directo() {
  return (
    <div className="flex flex-col gap-10 p-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <h1 className="text-3xl font-black tracking-tighter text-white">RETRANSMISIÓN<br /><span className="text-primary tracking-norm">EN DIRECTO</span></h1>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-light border border-white/5 text-white/40">
          <Share2 size={18} />
        </div>
      </header>

      {/* Main Status */}
      <section className="relative flex flex-col items-center justify-center gap-6 rounded-[3rem] bg-surface p-12 border border-white/5 overflow-hidden">
        {/* Pulsing decoration */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: [0, 0.1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="h-64 w-64 rounded-full border-2 border-white/10"
            />
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 3, opacity: [0, 0.05, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className="h-64 w-64 rounded-full border border-white/5"
            />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
                <Radio size={48} className="text-white/20" />
                <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                />
            </div>

            <div className="flex flex-col items-center gap-2">
                <h3 className="text-xl font-black tracking-tight text-white uppercase italic">FÓRA DE EMISIÓN</h3>
                <p className="max-w-[200px] text-center text-[10px] font-bold leading-relaxed text-white/30 uppercase tracking-widest">
                    NON HAI NINGUNHA RETRANSMISIÓN ACTIVA NO MOMENTO.
                </p>
            </div>
        </div>

        <button className="relative z-10 flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[11px] font-black tracking-[0.2em] text-black active:scale-95 transition-transform uppercase">
          CANLE DE YOUTUBE
          <Youtube size={16} />
        </button>
      </section>

      {/* Upcoming Event Info */}
      <section className="flex flex-col gap-4 rounded-3xl bg-surface-light/30 p-6 border border-white/5">
        <div className="flex items-center gap-2">
            <Bell size={14} className="text-primary" />
            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">PRÓXIMO DIRECTO</span>
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="text-lg font-black tracking-tight text-white uppercase italic">CERCEDENSE vs ORDES CF</h4>
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-1">DOMINGO 5 ABRIL · 17:00H</span>
        </div>
      </section>
    </div>
  );
}
