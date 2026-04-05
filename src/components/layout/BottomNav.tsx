"use client";

import { Home, Calendar, Trophy, Radio, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Partidos", href: "/partidos", icon: Calendar },
    { name: "Resultados", href: "/resultados", icon: Trophy },
    { name: "Directo", href: "/directo", icon: Radio },
    { name: "Contacto", href: "/contacto", icon: Phone },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50 glass-premium rounded-2xl lg:hidden overflow-hidden shadow-2xl border-white/10">
      <div className="flex justify-around items-center h-16 px-2 relative">
        {/* Subtle background glow for the active item */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full group transition-all duration-300 active:scale-90"
            >
              <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? "text-primary bg-primary/10" : "text-white opacity-40 group-hover:opacity-100"}`}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
              <span className={`text-[8px] uppercase font-black tracking-widest mt-1 transition-all ${isActive ? "text-primary" : "text-white opacity-20"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
