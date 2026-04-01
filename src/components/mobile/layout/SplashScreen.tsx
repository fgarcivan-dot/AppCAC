"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Particle generator for the "Light Motes" effect
  const particles = Array.from({ length: 20 });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 1.2, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* 🌫️ LAYER 1: Stadium Mist / Fog Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary blur-[160px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [100, -100, 100],
            y: [50, -50, 50],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-red-900 blur-[140px] rounded-full"
        />
      </div>

      {/* ✨ LAYER 2: Particle Motes (Floating Dust) */}
      {mounted && particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 - 50 + "%", 
            y: Math.random() * 100 - 50 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: ["-10%", "10%"],
            opacity: [0, 0.3, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "easeInOut" 
          }}
          className="absolute h-1 w-1 bg-white rounded-full blur-[1px]"
        />
      ))}

      {/* 🛡️ LAYER 3: Shield & Spotlight Reveal */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        
        {/* Soft cenital spotlight */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 0.3, scale: 1 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-64 h-32 bg-white blur-[80px] rounded-full"
        />

        <div className="relative">
          {/* 🛡️ NEW HD SHIELD - Maximum sharpness 4K */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="relative h-48 w-48"
          >
            <Image
              src="/escudo_hd.png"
              alt="Club Atlético Cercedense Logo HD"
              fill
              className="object-contain"
              priority
              unoptimized={true}
              quality={100}
            />
          </motion.div>
        </div>

        {/* 🎭 LAYER 4: Hero Reveal Typography */}
        <div className="flex flex-col items-center mt-6">
          <motion.h1 
             initial={{ opacity: 0, letterSpacing: "1.2em" }}
             animate={{ opacity: 0.4, letterSpacing: "0.8em" }}
             transition={{ duration: 2.5, delay: 0.8 }}
             className="text-[10px] font-black text-white uppercase"
             style={{ fontFamily: 'NeueMontreal' }}
          >
            CLUB ATLÉTICO
          </motion.h1>
          
          <div className="relative mt-2 px-4 flex items-center justify-center">
            <h2 className="text-5xl font-black tracking-tighter text-white/5 uppercase italic whitespace-nowrap" style={{ fontFamily: 'Quakerhack' }}>
              CERCEDENSE
            </h2>
            <motion.h2 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 -50% 0 -50%)" }}
              transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 text-5xl font-black tracking-tighter text-white uppercase italic whitespace-nowrap flex items-center justify-center"
              style={{ fontFamily: 'Quakerhack' }}
            >
              CERCEDENSE
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Subtle Loading Progress Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-16 flex flex-col items-center gap-1"
      >
        <span className="text-[7px] font-black tracking-[0.4em] text-white uppercase">ESTADIO O ROXO</span>
        <div className="w-8 h-[1px] bg-primary" />
      </motion.div>
    </motion.div>
  );
}
