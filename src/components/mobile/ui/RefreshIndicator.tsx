"use client";
import { motion, useTransform, MotionValue, AnimatePresence } from "framer-motion";

interface RefreshIndicatorProps {
  isRefreshing: boolean;
  yPosition: MotionValue<number>;
  theme?: "day" | "night";
}

export function RefreshIndicator({ isRefreshing, yPosition }: RefreshIndicatorProps) {
  // 🌊 Liquid Physics & Atmospheric Glow
  const opacity = useTransform(yPosition, [0, 40], [0, 1]);
  const glowHeight = useTransform(yPosition, [0, 100], [0, 120]);
  const textY = useTransform(yPosition, [0, 80], [-20, 20]);
  const bladeWidth = useTransform(yPosition, [0, 80], ["0%", "100%"]);

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute top-0 left-0 right-0 z-[60] pointer-events-none"
    >
      {/* 🔴 Atmospheric Header Glow */}
      <motion.div 
        style={{ height: glowHeight }}
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-2xl"
      />

      {/* ⚡ The "Blade" - Razor thin progress line */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <motion.div 
          style={{ width: isRefreshing ? "100%" : bladeWidth }}
          animate={isRefreshing ? { opacity: [0.2, 1, 0.2] } : { opacity: 1 }}
          transition={isRefreshing ? { repeat: Infinity, duration: 1.5 } : {}}
          className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>

      {/* ✍️ Ethereal Floating Typography */}
      <motion.div 
        style={{ y: isRefreshing ? 25 : textY }}
        className="flex flex-col items-center justify-center pt-2"
      >
        <div className="relative group">
          <motion.span
            animate={isRefreshing ? { 
              letterSpacing: ["0.6em", "1em", "0.6em"],
              opacity: [0.3, 1, 0.3]
            } : { 
              letterSpacing: "0.6em",
              opacity: 1
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`text-[8px] font-black uppercase transition-colors duration-1000 ${
              isRefreshing 
                ? "text-primary drop-shadow-[0_0_10px_rgba(218,41,28,0.5)]" 
                : "text-foreground opacity-40"
            }`}
          >
            {isRefreshing ? "ACTUALIZANDO" : "CERCEDENSE SYNC"}
          </motion.span>
          
          {/* Subtle underline pulse */}
          <AnimatePresence>
            {isRefreshing && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="h-[0.5px] bg-primary absolute -bottom-1 left-0 shadow-[0_0_8px_rgba(218,41,28,0.8)]"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
