"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Loader2 } from "lucide-react";

interface RefreshIndicatorProps {
  isRefreshing: boolean;
  yPosition: MotionValue<number>;
  theme?: "day" | "night";
}

export function RefreshIndicator({ isRefreshing, yPosition, theme = "night" }: RefreshIndicatorProps) {
  // Derive visual properties directly from the MotionValue for GPU-driven performance
  const opacity = useTransform(yPosition, [0, 60], [0, 1]);
  const rotation = useTransform(yPosition, [0, 120], [0, 720]);
  const yOffset = useTransform(yPosition, (val) => isRefreshing ? 0 : Math.min(val, 60));

  return (
    <motion.div 
      style={{ opacity, y: yOffset }}
      className="absolute top-[var(--header-height)] mt-4 left-0 right-0 flex justify-center z-[60] pointer-events-none"
    >
      <div className={`p-3 rounded-full border backdrop-blur-3xl shadow-xl transition-all duration-1000 ${
        theme === 'day' ? "bg-white/80 border-slate-200 shadow-slate-200/50" : "bg-zinc-900/80 border-white/5 shadow-[0_0_30px_rgba(218,41,28,0.3)]"
      }`}>
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : {}}
          style={!isRefreshing ? { rotate: rotation } : {}}
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
