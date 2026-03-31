"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Seniors", href: "/equipos" },
    { name: "Escolas", href: "/escuelas" },
    { name: "Partidos", href: "/partidos" },
    { name: "Directo", href: "/directo" },
    { name: "Resultados", href: "/escuelas/resultados" },
    { name: "Merchandising", href: "/tenda" },
    { name: "Novas", href: "/noticias" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1536px] z-50 transition-all duration-500 rounded-2xl ${isScrolled ? "glass-premium py-3 px-4 shadow-2xl translate-y-2 border-white/10" : "bg-transparent py-5 px-6"}`}
        style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            {/* Escudo */}
            <div className="w-8 h-10 md:w-10 md:h-12 relative transform group-hover:scale-110 transition-transform duration-500 flex-shrink-0 flex items-center justify-center">
              <img
                src="/escudo.png"
                alt="Escudo Cercedense"
                className="w-full h-full object-contain filter contrast-125 brightness-110 drop-shadow-[0_0_12px_rgba(218,41,28,0.6)]"
              />
            </div>

            {/* Title */}
            <span className="font-heading font-black text-xl md:text-2xl tracking-tighter uppercase leading-none block">
              Cercedense
            </span>
          </Link>

          {/* Desktop Nav - Optimized for Modern Dock */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.filter(l => ["Inicio", "Seniors", "Escolas", "Directo", "Tenda"].includes(l.name)).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.3em] hover:text-primary transition-all hover:scale-105 transform duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/#socios"
              className="ml-4 bg-primary text-white px-8 py-3 rounded-sm font-heading font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-primary/20"
            >
              Socio
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 bg-white/10 border border-white/10 rounded-xl"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background border-l border-white/10 flex flex-col"
          >
            <div className="p-6 flex justify-end" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }}>
              <button onClick={() => setIsOpen(false)} className="text-white p-2 flex items-center justify-center">
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-4xl uppercase font-bold tracking-tighter hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#socios"
                onClick={() => setIsOpen(false)}
                className="mt-8 bg-primary text-white px-8 py-4 rounded-sm font-heading text-xl font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors"
              >
                Faite Socio
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
