"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  theme: 'day' | 'night';
  toggleTheme: () => void;
  pullDistance?: number;
  isRefreshing?: boolean;
}

export function Header({ theme, toggleTheme, pullDistance = 0, isRefreshing = false }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full h-header pt-safe border-b transition-colors duration-1000 ${
      theme === 'day' ? 'bg-slate-200 border-slate-300/40' : 'bg-black border-white/5'
    }`}>
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Theme Toggle Button (Always floats on the right) */}
        <button
          onClick={toggleTheme}
          className={`absolute right-4 p-2.5 rounded-xl transition-all duration-500 active:scale-90 ${
            theme === 'day' 
              ? 'bg-slate-100 text-orange-500 border border-slate-300/20 shadow-sm' 
              : 'bg-white/5 text-yellow-400 border border-white/5'
          }`}
        >
          {theme === 'day' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Club Identity (Atomic Centering) */}
        <div className="flex flex-col items-center justify-center gap-0.5 leading-none">
          <span 
            className={`text-[10px] font-black tracking-[0.45em] uppercase transition-colors duration-1000 ${
              theme === 'day' ? 'text-slate-400' : 'text-white/30'
            }`}
            style={{ fontFamily: 'NeueMontreal' }}
          >
            CLUB ATLÉTICO
          </span>
          <h1 
            className={`text-2xl font-normal tracking-tight uppercase transition-colors duration-1000 ${
              theme === 'day' ? 'text-slate-900' : 'text-white'
            }`}
            style={{ fontFamily: 'Quakerhack' }}
          >
            CERCEDENSE
          </h1>
        </div>

        {/* Pull-to-refresh Visual Hint */}
        {!isRefreshing && pullDistance > 20 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            className={`absolute bottom-0 w-8 h-1 rounded-full ${
              theme === 'day' ? 'bg-slate-400' : 'bg-white/20'
            }`}
          />
        )}
      </div>
    </header>
  );
}
