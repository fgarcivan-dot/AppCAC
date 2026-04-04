"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

interface RefreshIndicatorProps {
  isRefreshing: boolean;
  yPosition: MotionValue<number>;
  theme?: "day" | "night";
}

export function RefreshIndicator({ isRefreshing, yPosition, theme = "night" }: RefreshIndicatorProps) {
  // Derive visual properties directly from the MotionValue for GPU-driven performance
  const opacity = useTransform(yPosition, [0, 60], [0, 1]);
  const yOffset = useTransform(yPosition, (val) => isRefreshing ? 0 : Math.min(val, 60));
  const letterSpacing = useTransform(yPosition, [0, 80], ["0.2em", "0.4em"]);

  return (
    <motion.div 
      style={{ opacity, y: yOffset }}
      className="absolute top-0 left-0 right-0 flex justify-center z-[60] pointer-events-none mt-4"
    >
      <motion.div 
        animate={isRefreshing ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={isRefreshing ? { repeat: Infinity, duration: 1.5 } : {}}
        className={`px-6 py-2.5 rounded-full border backdrop-blur-3xl shadow-xl transition-all duration-1000 flex items-center justify-center ${
          theme === 'day' ? "bg-white/80 border-slate-200 shadow-slate-200/50" : "bg-zinc-900/80 border-white/5 shadow-[0_0_30px_rgba(218,41,28,0.3)]"
        }`}
      >
        <motion.span
          style={{ letterSpacing, fontFamily: 'NeueMontreal' }}
          animate={isRefreshing ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
          transition={isRefreshing ? { repeat: Infinity, duration: 1.5 } : {}}
          className={`text-[10px] font-black uppercase transition-colors duration-1000 ${
            isRefreshing 
              ? "text-primary" 
              : (theme === 'day' ? "text-slate-400" : "text-white/40")
          }`}
        >
          {isRefreshing ? "ACTUALIZANDO" : "DESLIZA PARA ACTUALIZAR"}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
