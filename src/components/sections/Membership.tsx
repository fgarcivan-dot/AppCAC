"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Trophy, Star, Users } from "lucide-react";

export default function Membership() {
  return (
        <section className="py-32 md:py-48 bg-[#050505] relative overflow-hidden" id="socios">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 bg-grid-tech opacity-5" />
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

            <div className="fluid-container relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
                    
                    <div className="flex-1 max-w-2xl text-center lg:text-left">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block text-primary font-black tracking-[0.4em] uppercase text-xs mb-6 px-4 py-2 bg-primary/10 rounded-full"
                        >
                            Campaña 2024/25
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-heading font-black text-6xl md:text-8xl text-white uppercase tracking-tighter leading-[0.85] mb-10"
                        >
                            ÚNETE Á <br /> <span className="text-stroke">LENDA VIVA.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white text-lg mb-12 font-bold uppercase tracking-widest leading-relaxed opacity-40"
                        >
                            A túa paixón é o noso motor. Sé parte da familia Cercedense e vive cada partido coma se estiveses no campo.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[
                                { icon: Trophy, text: "Acceso total ao Roxo" },
                                { icon: Star, text: "Vantaxes Exclusivas" },
                                { icon: Users, text: "Voz nas decisións" },
                                { icon: CheckCircle2, text: "Descontos en tenda" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                                        <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-white font-bold uppercase text-[10px] tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* The Elite Pass Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative perspective-1000 group"
                    >
                        <div className="w-[340px] md:w-[420px] h-[550px] md:h-[600px] bg-gradient-to-br from-[#111] to-black rounded-[2.5rem] p-1 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
                            
                            {/* Card Texture */}
                            <div className="absolute inset-0 bg-grid-tech opacity-10 mix-blend-overlay" />
                            <div className="absolute top-0 right-0 p-12 text-white/5 font-heading font-black text-[15rem] leading-none pointer-events-none select-none -translate-y-12 translate-x-12">
                                CAC
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-between p-10">
                                <div>
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-16 h-16 relative">
                                            <img src="/escudo.png" alt="CAC" className="w-full h-full object-contain filter brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-primary font-black text-xs tracking-[0.2em] uppercase">Elite Access</div>
                                            <div className="text-white text-[8px] font-black tracking-[0.3em] uppercase opacity-20">Season 24/25</div>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-8">
                                        <h3 className="font-heading font-black text-5xl text-white uppercase tracking-tighter mb-1">SOCIO</h3>
                                        <div className="h-1 w-12 bg-primary" />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="font-heading font-black text-8xl text-white tracking-tighter">50</span>
                                        <div className="flex flex-col">
                                            <span className="text-primary font-black text-2xl leading-none">€</span>
                                            <span className="text-white font-black text-[10px] tracking-widest uppercase opacity-20">Anual</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <button className="w-full bg-primary hover:bg-white text-white hover:text-black transition-all duration-500 font-heading font-black uppercase tracking-[0.2em] py-6 rounded-sm shadow-[0_20px_40px_rgba(218,41,28,0.3)]">
                                        Solicitar Alta
                                    </button>
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-white text-[9px] font-black uppercase tracking-widest opacity-20">Digital Member ID: #2024-XXXX</span>
                                        <div className="flex gap-1">
                                            {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-white/10" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scanning Light Effect */}
                            <motion.div 
                                animate={{ top: ["-100%", "200%"] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none -skew-y-12"
                            />
                        </div>

                        {/* Outer Glow */}
                        <div className="absolute -inset-4 bg-primary/20 blur-[60px] rounded-[3rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
