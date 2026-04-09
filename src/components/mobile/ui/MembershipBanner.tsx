"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HomeContent } from '@/lib/dataService';
import { cn } from "@/lib/utils";

interface MembershipBannerProps {
  data?: HomeContent['membership'];
}

export function MembershipBanner({ data }: MembershipBannerProps) {
  return (
    <div className="w-full relative py-20 px-6 bg-white border-t border-black/5 transition-colors duration-1000">
      
      {/* 🔮 Background Atmospheric Light (Light Mode) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-40" />

      {/* 🚀 Main Integrated Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 📝 External Editorial Title - Synced with InstaGrid style */}
        <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.85] text-slate-950" style={{ fontFamily: 'Quakerhack' }}>
                Faite <br /> <span className="text-primary">Socio</span>
            </h2>
        </div>

        <div className="bg-slate-50/50 border border-black/5 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
                
                {/* 📝 Content Area (Left) */}
                <div className="lg:col-span-7 flex flex-col items-start gap-12 p-10 md:p-16">
                    <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                        Máis ca un club, somos unha comunidade. Facerse socio significa apoiar aos nosos equipos, dende o prebenxamín ata o primeiro equipo. 
                        <span className="block mt-2 font-bold text-slate-800">As túas cores, o teu escudo, a túa xente.</span>
                    </p>

                {/* Vertical Benefits Flow */}
                <div className="flex flex-col gap-4 w-full">
                    {[
                        "Acceso a todos os partidos na casa",
                        "Descontos en merchandising oficial",
                        "Voz e voto nas asembleas do club"
                    ].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-5 group p-4 bg-white/50 border border-black/[0.03] rounded-2xl transition-all hover:bg-white hover:shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={16} />
                            </div>
                            <span className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.05em] text-slate-600 group-hover:text-slate-950 transition-colors">
                                {benefit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 💳 The Membership Card (Right) - Elevated Integration */}
            <div className="lg:col-span-5 bg-slate-100/50 flex flex-col items-center justify-center p-8 md:p-16 border-l border-black/5">
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[400px] bg-slate-950 rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-black/30 overflow-hidden group"
                >
                    {/* Subtle Holographic Shine */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none opacity-20 -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative z-10 flex flex-col gap-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                                Campaña de abonos 24/25
                            </span>
                            <h3 className="text-4xl font-black uppercase text-white tracking-tighter" style={{ fontFamily: 'Quakerhack' }}>
                                Socio
                            </h3>
                        </div>

                        <div className="flex flex-col gap-1">
                             <div className="flex items-end gap-2">
                                 <span className="text-6xl font-black text-primary tracking-tighter">50</span>
                                 <div className="flex flex-col mb-2">
                                     <span className="text-xl font-black text-white">€</span>
                                     <span className="text-[9px] font-black uppercase text-white/20 tracking-widest leading-none">/ ano</span>
                                 </div>
                             </div>
                        </div>

                        {/* CTA Button */}
                        <a 
                            href="/contacto"
                            className="group relative flex items-center justify-center gap-4 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-primary-dark active:scale-[0.98] shadow-2xl shadow-primary/20"
                        >
                            Solicitar alta
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>

                        <p className="text-[10px] font-bold text-center text-white/10 leading-relaxed uppercase tracking-tighter">
                            Tamén dispoñemos de abono familiar e xubilado.
                        </p>
                    </div>

                    {/* Subtle Background Tag */}
                    <div className="absolute -bottom-6 -right-6 text-[140px] font-black text-white/5 select-none pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity">
                        #
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
    </div>
    </div>
  );
}
