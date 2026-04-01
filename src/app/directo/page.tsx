"use client";

import { Radio, Youtube, Bell, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Directo() {
  const { theme } = useTheme();
  const { data } = useContent();
  const content = data.directoContent!;

  return (
    <div className={`flex flex-col gap-10 p-6  animate-in fade-in duration-700 transition-colors duration-1000 ${
      theme === 'day' ? 'bg-slate-200 text-slate-900' : 'bg-black text-white'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-4xl font-black tracking-tighter uppercase transition-colors duration-1000 ${
           theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>RETRANSMISIÓN<br /><span className="text-primary tracking-norm">EN DIRECTO</span></h1>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
          theme === 'day' 
            ? "bg-slate-100 border-slate-200 text-slate-400" 
            : "bg-white/5 border-white/5 text-white/40"
        }`}>
          <Share2 size={18} />
        </div>
      </header>

      {/* Main Status */}
      <section className={`relative flex flex-col items-center justify-center gap-6 rounded-[3rem] p-12 border overflow-hidden transition-all duration-1000 ${
        theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/[0.02] border-white/5 shadow-2xl"
      }`}>
        {/* Pulsing decoration */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: [0, theme === 'day' ? 0.05 : 0.1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className={`h-64 w-64 rounded-full border-2 ${theme === 'day' ? 'border-slate-300/20' : 'border-white/10'}`}
            />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
            <div className={`relative flex h-24 w-24 items-center justify-center rounded-full transition-colors duration-1000 ${
              theme === 'day' ? "bg-slate-200" : "bg-white/5"
            }`}>
                <Radio size={48} className={theme === 'day' ? "text-slate-400" : "text-white/20"} />
                <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
                />
            </div>

            <div className="flex flex-col items-center gap-2">
                <h3 className={`text-xl font-black tracking-tight uppercase italic transition-colors duration-1000 ${
                  theme === 'day' ? 'text-slate-900' : 'text-white'
                }`}>{content.statusText}</h3>
                <p className={`max-w-[200px] text-center text-[10px] font-bold leading-relaxed uppercase tracking-widest transition-colors duration-1000 ${
                  theme === 'day' ? 'text-slate-400' : 'text-white/30'
                }`}>
                    {content.description}
                </p>
            </div>
        </div>

        <a href={content.youtubeUrl} target="_blank" rel="noopener noreferrer" className={`relative z-10 flex items-center gap-3 rounded-full px-8 py-4 text-[11px] font-black tracking-[0.2em] active:scale-95 transition-all uppercase ${
          theme === 'day' 
            ? "bg-slate-900 text-white shadow-xl shadow-slate-300/50" 
            : "bg-white text-black"
        }`}>
          CANLE DE YOUTUBE
          <Youtube size={16} />
        </a>
      </section>

      {/* Upcoming Event Info */}
      <section className={`flex flex-col gap-4 rounded-3xl p-6 border transition-all duration-1000 ${
        theme === 'day' ? "bg-slate-100 border-slate-200" : "bg-white/[0.02] border-white/5 shadow-2xl"
      }`}>
        <div className="flex items-center gap-2">
            <Bell size={14} className="text-primary" />
            <span className={`text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
              theme === 'day' ? 'text-slate-400' : 'text-white/40'
            }`}>PRÓXIMO DIRECTO</span>
        </div>
        <div className="flex flex-col gap-1">
            <h4 className={`text-lg font-black tracking-tight uppercase italic transition-colors duration-1000 ${
              theme === 'day' ? 'text-slate-900' : 'text-white'
            }`}>{content.nextEventTitle}</h4>
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-1">{content.nextEventDate}</span>
        </div>
      </section>
    </div>
  );
}
