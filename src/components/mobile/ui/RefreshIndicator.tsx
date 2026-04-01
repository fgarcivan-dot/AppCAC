"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface RefreshIndicatorProps {
  isRefreshing: boolean;
  pullDistance: number;
  theme?: "day" | "night";
}

export function RefreshIndicator({ isRefreshing, pullDistance, theme = "night" }: RefreshIndicatorProps) {
  // Only show if we've pulled a bit or if we're currently refreshing
  const isVisible = pullDistance > 3 || isRefreshing;
  
  if (!isVisible) return null;

  // Calculate rotation and opacity based on pull distance
  const opacity = Math.min(pullDistance / 30, 1);
  const rotation = (pullDistance / 40) * 360;

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: isRefreshing ? 20 : 0, opacity: opacity }}
      className="absolute top-24 left-0 right-0 flex justify-center z-[60] pointer-events-none"
    >
      <div className={`p-3 rounded-full border backdrop-blur-3xl shadow-xl transition-all duration-1000 ${
        theme === 'day' ? "bg-white/80 border-slate-200 shadow-slate-200/50" : "bg-zinc-900/80 border-white/5 shadow-[0_0_30px_rgba(218,41,28,0.3)]"
      }`}>
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : { rotate: rotation }}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : { type: "spring", damping: 15 }}
        >
          <Loader2 
            size={20} 
            className={`transition-colors duration-1000 ${
              isRefreshing 
                ? "text-primary animate-pulse" 
                : (theme === 'day' ? "text-slate-300" : "text-white/20")
            }`} 
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
