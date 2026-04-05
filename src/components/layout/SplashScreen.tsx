"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden animate-splash-hide"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,41,28,0.15)_0%,transparent_70%)]" />

      <div className="relative flex flex-col items-center">
        {/* Animated Glow Circle */}
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-64 h-64 bg-primary/20 blur-[80px] rounded-full"
        />

        {/* Logo Animation (Visible by default) */}
        <motion.div
          initial={false}
          animate={{ 
            scale: [0.95, 1],
            opacity: 1 
          }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-6"
        >
          <Image
            src="/escudo.png"
            alt="Club Atlético Cercedense Logo"
            fill
            className="object-contain filter brightness-110 contrast-125"
            priority
          />
        </motion.div>

        {/* Text Animation (Visible by default) */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tighter text-white mb-2 uppercase">
            AT. <span className="text-primary">CERCEDENSE</span>
          </h1>
          <p className="font-heading text-[10px] uppercase tracking-[0.4em] text-white font-black opacity-40">
            ORGULLO DE CERCEDA
          </p>
        </motion.div>
      </div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
      />
    </motion.div>
  );
}
