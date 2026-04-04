"use client";
import { motion, useTransform, MotionValue, AnimatePresence } from "framer-motion";

interface RefreshIndicatorProps {
  isRefreshing: boolean;
  yPosition: MotionValue<number>;
  theme?: "day" | "night";
}

export function RefreshIndicator({ isRefreshing, yPosition, theme = "night" }: RefreshIndicatorProps) {
  // 🔬 Cinematic HUD Physics
  const opacity = useTransform(yPosition, [0, 50], [0, 1]);
  const yOffset = useTransform(yPosition, (val) => isRefreshing ? 0 : Math.min(val, 60));
  const scale = useTransform(yPosition, [0, 80], [0.95, 1]);
  const scanPos = useTransform(yPosition, [0, 100], ["-100%", "200%"]);

  return (
    <motion.div 
      style={{ opacity, y: yOffset, scale }}
      className="absolute top-0 left-0 right-0 flex justify-center z-[60] pointer-events-none mt-6"
    >
      <div className="relative group">
        {/* 🌈 Outer Glow - Atmospheric Red Pulse */}
        <AnimatePresence>
          {isRefreshing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-2 bg-primary/20 blur-xl rounded-full"
            />
          )}
        </AnimatePresence>

        {/* 💎 Minimalist HUD Bar */}
        <div className={`relative px-8 py-2 rounded-full border backdrop-blur-2xl overflow-hidden transition-all duration-1000 flex items-center gap-3 ${
          theme === 'day' 
            ? "bg-white/60 border-slate-200 shadow-xl" 
            : "bg-black/40 border-white/10 shadow-2xl"
        }`}>
          
          {/* ⚡ Scanning Line (Only during swipe) */}
          {!isRefreshing && (
            <motion.div 
              style={{ left: scanPos }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
            />
          )}

          {/* 🔴 Status Pulse Dot */}
          <div className="relative flex items-center justify-center">
            <div className={`h-1.5 w-1.5 rounded-full ${isRefreshing ? 'bg-primary' : (theme === 'day' ? 'bg-slate-300' : 'bg-white/20')}`} />
            {isRefreshing && (
              <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-primary rounded-full"
              />
            )}
          </div>

          {/* ✍️ Technical Typography */}
          <span
            className={`text-[9px] font-black tracking-[0.6em] uppercase transition-colors duration-1000 ${
              isRefreshing 
                ? "text-primary" 
                : (theme === 'day' ? "text-slate-500" : "text-white/60")
            }`}
            style={{ fontFamily: 'NeueMontreal' }}
          >
            {isRefreshing ? "SYNCING DATA" : "DATABASE SYNC"}
          </span>

          {/* 📊 Visual Data Bits */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={isRefreshing ? { height: [2, 6, 2] } : { height: 2 }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                className={`w-0.5 rounded-full ${theme === 'day' ? 'bg-primary/30' : 'bg-white/10'}`}
              />
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

