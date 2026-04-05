"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, Users, ArrowUpRight, Newspaper, Star } from "lucide-react";
import Link from "next/link";

const BentoTile = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={`glass-premium rounded-[2rem] p-8 group relative overflow-hidden ${className}`}
    >
        {children}
    </motion.div>
);

export default function ClubHub() {
    return (
        <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden" id="club-hub">
            <div className="fluid-container">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block"
                        >
                            O Día a Día
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-heading font-black text-6xl md:text-8xl text-white uppercase tracking-tighter leading-none"
                        >
                            CLUB <span className="opacity-10">ARENA</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[700px]">
                    {/* Featured: Next Match */}
                    <BentoTile className="md:col-span-2 md:row-span-2 !bg-primary relative group">
                        <div className="absolute top-0 right-0 p-12 text-white/5 font-heading font-black text-[12rem] leading-none pointer-events-none select-none -translate-y-8 translate-x-8">
                            VS
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em]">Próximo Encontro</span>
                                </div>
                                <h3 className="font-heading font-black text-6xl md:text-7xl text-white uppercase tracking-tighter mb-4">
                                    SENIOR MASC. <br /> VS ORDES
                                </h3>
                                <p className="text-white/80 font-bold tracking-widest uppercase">Domingo 30 &bull; 17:00H &bull; O Roxo</p>
                            </div>
                            <Link href="/directo" className="bg-white text-primary w-fit px-8 py-4 rounded-full font-heading font-black uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2">
                                Ver en Directo <PlayIcon />
                            </Link>
                        </div>
                    </BentoTile>

                    {/* Latest Result */}
                    <BentoTile className="md:col-span-2 bg-[#0a0a0a] border-white/5">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-white font-black uppercase tracking-[0.3em] text-[10px] opacity-40">Último Resultado</span>
                            <Trophy className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white text-xs mb-1 font-bold uppercase opacity-60">Senior Fem.</div>
                                <div className="font-heading font-black text-5xl text-white">3 - 0</div>
                                <div className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">Vitoria Crucial</div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-xs mb-1 font-bold uppercase opacity-30">Rival</div>
                                <div className="font-neue text-3xl text-white uppercase italic tracking-tighter">BOIRO</div>
                            </div>
                        </div>
                    </BentoTile>

                    {/* Academy Stats */}
                    <BentoTile className="bg-[#0a0a0a] border-white/5">
                        <div className="flex flex-col h-full justify-between">
                            <Star className="w-6 h-6 text-primary mb-4" />
                            <div>
                                <div className="text-4xl font-heading font-black text-white mb-1">+200</div>
                                <div className="text-white font-black uppercase tracking-widest text-[10px] opacity-40">Nenos na Escola</div>
                            </div>
                        </div>
                    </BentoTile>

                    {/* Quick Link: Squads */}
                    <BentoTile className="bg-[#0a0a0a] border-white/5 group hover:!bg-white transition-colors duration-500">
                        <Link href="/teams" className="flex flex-col h-full justify-between">
                            <Users className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            <div className="flex items-end justify-between">
                                <span className="font-heading font-black text-3xl text-white group-hover:text-black transition-colors uppercase leading-none">Plantillas</span>
                                <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-black transition-colors" />
                            </div>
                        </Link>
                    </BentoTile>
                </div>
            </div>
        </section>
    );
}

const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);
