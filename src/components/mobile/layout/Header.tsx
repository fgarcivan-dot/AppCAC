"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  theme: 'day' | 'night';
  toggleTheme: () => void;
  pullDistance?: number;
  isRefreshing?: boolean;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
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
      className={`fixed top-0 left-0 right-0 z-50 w-full h-header pt-safe border-b backdrop-blur-xl transition-colors duration-1000 ${
        theme === 'day' 
        ? 'bg-slate-50/85 border-slate-200/60 shadow-sm shadow-slate-200/20' 
        : 'bg-black/70 border-white/5'
      }`}
    >
      <div className="relative w-full h-full flex items-center px-4">
        
        {/* Identidad del Club (Logo + Texto a la Izquierda) */}
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 relative drop-shadow-md"
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
            <span 
              className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-600' : 'text-white/30'
              }`}
              style={{ fontFamily: 'NeueMontreal' }}
            >
              CLUB ATLÉTICO
            </span>
            <h1 
              className={`text-xl font-normal tracking-tight uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-900' : 'text-white'
              }`}
              style={{ fontFamily: 'Quakerhack' }}
            >
              CERCEDENSE
            </h1>
          </div>
        </div>

        {/* Theme Toggle Button (Flotando a la derecha) */}
        <button
          onClick={toggleTheme}
          className={`absolute right-4 p-2.5 rounded-2xl transition-all duration-500 active:scale-90 ${
            theme === 'day' 
              ? 'bg-white text-orange-500 border border-slate-200 shadow-sm' 
              : 'bg-white/5 text-yellow-400 border border-white/5'
          }`}
        >
          {theme === 'day' ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
        </button>
      </div>
    </motion.header>
  );
}
