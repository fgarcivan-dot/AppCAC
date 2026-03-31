"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Red Aura/Glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.4 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute h-64 w-64 rounded-full bg-primary blur-[80px]"
      />

      {/* Shield & Text Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="relative h-32 w-32 drop-shadow-[0_0_25px_rgba(218,41,28,0.6)]"
        >
          <Image
            src="/escudo.png"
            alt="Club Atlético Cercedense Logo"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex flex-col items-center -gap-1">
            <h1 className="text-[12px] font-black tracking-[0.6em] text-white/50 uppercase">
              CLUB ATLÉTICO
            </h1>
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
              CERCEDENSE
            </h2>
          </div>

          {/* Three Loading Dots */}
          <div className="mt-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(218,41,28,0.6)]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
