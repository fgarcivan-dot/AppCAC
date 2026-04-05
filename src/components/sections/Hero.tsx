"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Trophy, Home, Users, Calendar, Play, Star } from "lucide-react";
import { useEffect, useRef } from "react";

const HeroActionItem = ({ icon: Icon, text, delay }: { icon: React.ElementType, text: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-center gap-4 group cursor-pointer"
    >
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary group-hover:scale-110 shadow-lg">
            <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
        </div>
        <span className="text-white font-heading font-black text-xs tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
            {text}
        </span>
    </motion.div>
);

const latestResults = [
    { team: "Senior Masc.", result: "2 - 1", opponent: "Ordes", win: true },
    { team: "Senior Fem.", result: "3 - 0", opponent: "Boiro", win: true },
    { team: "Juvenil", result: "1 - 1", opponent: "Fisterra", draw: true },
    { team: "Cadete", result: "0 - 2", opponent: "Bergan", loss: true },
    { team: "Infantil", result: "4 - 1", opponent: "Victoria", win: true },
];

const ResultCard = ({ team, result, opponent, win, draw, loss, delay }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md min-w-[130px] flex-1 hover:bg-white/10 transition-colors cursor-default group"
    >
        <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] text-white/50 uppercase font-black tracking-widest">{team}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${win ? 'bg-primary shadow-[0_0_8px_rgba(218,41,28,0.6)]' : 'bg-white/40'}`} />
        </div>
        <div className="font-heading font-black text-2xl text-white group-hover:text-primary transition-colors transition-all">{result}</div>
        <span className="text-[9px] text-white/30 uppercase font-bold truncate mt-1 tracking-widest">vs {opponent}</span>
    </motion.div>
);

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollY } = useScroll();
    
    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]); 
    const yVideo = useTransform(scrollY, [0, 500], [0, 100]); 
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video play failed:", error);
            });
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="hero" className="relative h-screen min-h-[850px] flex items-center overflow-hidden bg-[#050505]">
            {/* Background Video / Deep Overlay */}
            <motion.div style={{ y: yVideo }} className="absolute inset-0 z-0 scale-110">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none" />
                <div className="absolute inset-24 border border-white/5 rounded-[4rem] z-10 pointer-events-none" />
                
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 opacity-10 bg-grid-tech animate-grid-float pointer-events-none" />

                {/* Video Background */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-60 scale-105 transition-all duration-1000"
                    style={{ pointerEvents: 'none' }}
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                    <source src="https://cdn.pixabay.com/video/2023/10/22/186115-877014603_large.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Vertical Brand Accent */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden 2xl:flex flex-col items-center gap-12"
            >
                <div className="w-px h-32 bg-primary" />
                <span className="text-white/20 font-black uppercase tracking-[1em] text-sm [writing-mode:vertical-lr] rotate-180">
                    ORGULLO &bull; CERCEDA
                </span>
                <div className="w-px h-32 bg-white/20" />
            </motion.div>

            <div className="fluid-container relative z-20 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-6xl"
                >
                    {/* Brand Identifier */}
                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-10">
                        <Star className="w-5 h-5 text-accent animate-pulse" />
                        <span className="text-white/40 font-black uppercase tracking-[0.6em] text-[10px] md:text-sm">Fundado en 1974 &bull; Galicia</span>
                        <Star className="w-5 h-5 text-accent animate-pulse" />
                    </motion.div>

                    <div className="relative mb-12">
                        <motion.h1 
                            variants={itemVariants}
                            className="font-heading font-black text-[12vw] md:text-[8vw] lg:text-[10vw] tracking-tighter uppercase text-white leading-none mb-2 select-none"
                        >
                            ORGULLO
                        </motion.h1>

                        <motion.div 
                            variants={itemVariants}
                            className="font-marker text-primary text-[15vw] md:text-[12vw] lg:text-[13vw] leading-[0.5] mb-12 origin-center drop-shadow-[0_20px_60px_rgba(218,41,28,0.5)] select-none"
                        >
                            CERCEDENSE
                        </motion.div>
                        
                        {/* Decorative Large Background Text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-heading font-black text-[25vw] leading-none pointer-events-none select-none z-[-1] tracking-tighter transition-transform duration-1000 hover:scale-105">
                            CERCEDA
                        </div>
                    </div>

                    <motion.p variants={itemVariants} className="max-w-xl mx-auto text-white font-bold uppercase tracking-[0.3em] mb-16 leading-relaxed opacity-40">
                        Máis ca un club, somos o latexo dun pobo unido polas cores <span className="text-primary italic">vermella e branca</span>.
                    </motion.p>

                    {/* Premium CTA Button */}
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Link 
                            href="/#socios"
                            className="group relative flex items-center bg-primary text-white pl-12 pr-6 py-6 font-heading font-black uppercase tracking-wider text-2xl rounded-sm transition-all hover:translate-y-[-5px] shadow-[0_25px_60px_rgba(218,41,28,0.4)] overflow-visible"
                        >
                            <span className="relative z-10 mr-16">Faite Socio</span>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-sm flex items-center justify-center shadow-lg transform translate-x-1 group-hover:rotate-[360deg] transition-all duration-700">
                                <Trophy className="w-8 h-8 text-primary" />
                            </div>
                        </Link>

                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-white/20 text-[9px] uppercase font-black tracking-widest mb-1">Próximo encontro</span>
                            <div className="flex items-center gap-4">
                                <span className="text-white font-bold text-lg tracking-tight">VS ORDES</span>
                                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-accent font-black">DIRECTO</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6"
            >
                <span className="text-white/20 text-[10px] uppercase font-black tracking-[0.5em] font-heading mb-2">Descubre o noso mundo</span>
                <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
}
