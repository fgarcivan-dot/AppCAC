"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  pullDistance?: number;
  isRefreshing?: boolean;
}

export function Header({ }: HeaderProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY;
    if (latest > 100 && diff > 10) {
      setHidden(true);
    } else if (diff < -10) {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full h-header pt-safe border-b border-black/5 backdrop-blur-xl bg-white/80 shadow-sm transition-colors duration-1000"
    >
      <div className="relative w-full h-full flex items-center px-4">
        
        {/* Identidad del Club (Logo + Texto a la Izquierda) */}
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image 
              src="/escudo.png" 
              alt="Escudo" 
              fill
              className="object-contain"
            />
          </motion.div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[9px] font-black tracking-[0.5em] uppercase text-foreground opacity-40">
              CAC ELITE PASS
            </span>
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.8] text-primary italic">
              CERCEDENSE
            </h2>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
