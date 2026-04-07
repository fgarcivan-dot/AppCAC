"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Trophy, Radio, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { name: "INICIO", icon: Home, path: "/", key: "home" },
  { name: "PARTIDOS", icon: Calendar, path: "/partidos", key: "partidos" },
  { name: "RESULTADOS", icon: Trophy, path: "/resultados", key: "resultados" },
  { name: "DIRECTO", icon: Radio, path: "/directo", key: "directo" },
  { name: "CONTACTO", icon: Phone, path: "/contacto", key: "contacto" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [activeUrl, setActiveUrl] = useState("");

  useEffect(() => {
    const updatePath = () => {
      if (typeof window !== "undefined") {
        setActiveUrl(window.location.href.toLowerCase());
      }
    };

    updatePath();
    window.addEventListener("popstate", updatePath);
    window.addEventListener("click", () => setTimeout(updatePath, 150));
    const interval = setInterval(updatePath, 1000);
    
    return () => {
      window.removeEventListener("popstate", updatePath);
      clearInterval(interval);
    };
  }, [pathname]);

  const checkIsActive = (itemPath: string, itemKey: string) => {
    const current = activeUrl;
    
    // Non-home items: Check if URL contains the path or key
    if (itemPath !== "/") {
      return current.includes(itemPath.toLowerCase()) || current.includes(itemKey);
    }

    // Home item: Only active if NO other nav item is active
    const isOtherActive = navItems
      .filter(nav => nav.path !== "/")
      .some(nav => current.includes(nav.path.toLowerCase()) || current.includes(nav.key));

    return !isOtherActive;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-bottom-nav pb-safe border-t backdrop-blur-xl bg-white/95 border-black/5 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex h-20 items-center justify-around px-2 min-w-full">
        {navItems.map((item) => {
          const isActive = checkIsActive(item.path, item.key);
          
          return (
            <Link
              key={item.name}
              href={item.path}
              scroll={false} 
              prefetch={false}
              onClick={() => setActiveUrl(item.path.toLowerCase())}
              className="relative flex h-full flex-1 flex-col items-center justify-center gap-1 transition-all active:scale-90"
            >
              {/* The "Punto Rojo" (Red Dot Indicator) requested by user - NO SHADOWS */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[#da291c] z-10"
                  />
                )}
              </AnimatePresence>
              
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300 relative",
                isActive ? "text-[#da291c] translate-y-1" : "text-black opacity-30"
              )}>
                <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
              </div>
              
              <span className={cn(
                "text-[8px] font-black tracking-widest uppercase transition-colors duration-300",
                isActive ? "text-[#da291c]" : "text-black opacity-20"
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
