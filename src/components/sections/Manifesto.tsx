"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <section ref={ref} className="py-32 md:py-64 bg-[#050505] relative overflow-hidden" id="manifesto">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-80 h-80 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="fluid-container relative z-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                <motion.div variants={itemVariants} className="flex items-center gap-6 mb-16">
                    <div className="w-16 h-px bg-primary" />
                    <span className="text-primary font-black tracking-[0.4em] uppercase text-xs md:text-sm">
                        O Noso Manifesto
                    </span>
                </motion.div>
                
                <div className="flex flex-col gap-12 md:gap-20">
                    <h2 className="font-heading font-black text-[12vw] md:text-[8vw] lg:text-[10vw] leading-[0.85] uppercase text-white flex flex-col items-start select-none">
                        <motion.span 
                            variants={itemVariants} 
                            className="text-stroke hover:text-white transition-all duration-700 cursor-default opacity-20 hover:opacity-100"
                        >
                            Non somos só
                        </motion.span>
                        <motion.span 
                            variants={itemVariants} 
                            className="text-stroke hover:text-white transition-all duration-700 cursor-default mb-8 md:mb-12 opacity-20 hover:opacity-100"
                        >
                            un club.
                        </motion.span>
                        
                        <motion.span 
                            variants={itemVariants} 
                            className="text-white drop-shadow-[0_20px_40px_rgba(218,41,28,0.2)] relative"
                        >
                            Somos familia.
                            <div className="absolute -right-12 top-0 text-primary text-4xl animate-pulse">!</div>
                        </motion.span>
                        
                        <motion.span 
                            variants={itemVariants} 
                            className="text-primary hover:scale-[1.02] transition-transform duration-500"
                        >
                            Somos esforzo.
                        </motion.span>
                        
                        <motion.span 
                            variants={itemVariants}
                            className="relative"
                        >
                            Somos Cerceda.
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 1 }}
                                className="absolute -bottom-4 left-0 h-2 bg-primary" 
                            />
                        </motion.span>
                    </h2>
                </div>

                {/* Stats Shortcut Overlay */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-16"
                >
                    {[
                        { label: "Fundación", val: "1974" },
                        { label: "Categorías", val: "12+" },
                        { label: "Membros", val: "+300" },
                        { label: "Paixón", val: "100%" }
                    ].map((stat, i) => (
                        <div key={i} className="group">
                            <div className="text-primary font-black text-xs uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{stat.label}</div>
                            <div className="text-white font-heading font-black text-4xl">{stat.val}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    </section>
    );
}
