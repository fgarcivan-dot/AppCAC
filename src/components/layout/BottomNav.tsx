"use client";

import { Home, Calendar, Trophy, Radio, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const updatePath = () => {
      if (typeof window !== "undefined") {
        // Use pathname from window as source of truth for Capacitor
        const p = window.location.pathname;
        setCurrentPath(p);
      }
    };

    updatePath();
    window.addEventListener("popstate", updatePath);
    // Intersection observer or other triggers don't apply here, 
    // but just in case, we check on any click
    window.addEventListener("click", () => setTimeout(updatePath, 100));
    
    // Polling as ultimate fallback
    const interval = setInterval(updatePath, 500);
    
    return () => {
      window.removeEventListener("popstate", updatePath);
      clearInterval(interval);
    };
  }, [pathname]);

  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Partidos", href: "/partidos", icon: Calendar },
    { name: "Resultados", href: "/resultados", icon: Trophy },
    { name: "Directo", href: "/directo", icon: Radio },
    { name: "Contacto", href: "/contacto", icon: Phone },
  ];

  // Robust matching logic
  const checkActive = (itemHref: string) => {
    if (!currentPath) return itemHref === "/";
    
    const p = currentPath.toLowerCase();
    const h = itemHref.toLowerCase();
    
    if (h === "/") {
      // It's the home page if the path is empty, /, or just index.html
      return p === "/" || p === "" || p.endsWith("/index.html") || p.endsWith("/public/");
    }
    
    // For other pages, check if the path contains the segment
    // (e.g. /partidos matches /partidos/ or /partidos.html or /public/partidos/index.html)
    return p.includes(h);
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50 glass-premium rounded-2xl lg:hidden overflow-hidden shadow-2xl border-white/10">
      <div className="flex justify-around items-center h-16 px-2 relative">
        
        {/* DEBUGGER - Only visible if you know where to look, but help us identify the path */}
        {/* <div className="absolute -top-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100">
          <span className="text-[8px] text-white font-mono">{currentPath}</span>
        </div> */}

        {navItems.map((item) => {
          const isActive = checkActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setCurrentPath(item.href)} // Optimistic update
              className="relative flex flex-col items-center justify-center flex-1 h-full group transition-all duration-300"
            >
              <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? "scale-110" : "opacity-40"}`}>
                {/* We use hardcoded color #ef4444 (red-500) if active to be 100% sure */}
                <Icon 
                  className="w-5 h-5 transition-colors duration-300" 
                  style={{ color: isActive ? "#ef4444" : "white" }} 
                />
                
                {isActive && (
                  <>
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 rounded-xl -z-10 blur-md"
                      style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
                    />
                    {/* The Dot Indicator */}
                    <div 
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-[#1a1a1a] shadow-[0_0_10px_#ef4444]"
                      style={{ backgroundColor: "#ef4444" }}
                    />
                  </>
                )}
              </div>
              <span 
                className={`text-[9px] uppercase font-black tracking-tighter mt-1 transition-all`}
                style={{ 
                  color: isActive ? "#ef4444" : "rgba(255,255,255,0.3)",
                  opacity: isActive ? 1 : 0.4
                }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
