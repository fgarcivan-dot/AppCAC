"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Trophy, Radio, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "INICIO", icon: Home, path: "/" },
  { name: "PARTIDOS", icon: Calendar, path: "/partidos" },
  { name: "RESULTADOS", icon: Trophy, path: "/resultados" },
  { name: "DIRECTO", icon: Radio, path: "/directo" },
  { name: "CONTACTO", icon: Phone, path: "/contacto" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-bottom-nav pb-safe border-t backdrop-blur-xl transition-all duration-1000 bg-white/80 border-black/5">
      <div className="flex h-20 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              scroll={false} 
              prefetch={false} // 🚫 Prevent background loads causing memory spikes on iOS
              className="relative flex h-full flex-1 flex-col items-center justify-center gap-1.5 transition-all"
            >
              {/* Active Dot Indicator with Layout Animation */}
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(218,41,28,0.4)]"
                />
              )}
              
              <div className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive ? "text-primary mt-1" : "text-foreground opacity-40 hover:opacity-100"
              )}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className={cn(
                "text-[9px] font-black tracking-widest uppercase",
                isActive ? "text-primary" : "text-foreground opacity-30"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
