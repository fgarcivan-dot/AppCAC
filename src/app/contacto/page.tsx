"use client";

import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Contacto() {
  const { theme } = useTheme();
  const { data } = useContent();
  const content = data.contactoContent!;

  const infoItems = [
    { icon: MapPin, title: "DIRECCIÓN", value: content.address },
    { icon: Mail, title: "EMAIL", value: content.email },
    { icon: Phone, title: "TELÉFONO", value: content.phone },
  ];

  const socials = [
    { icon: Instagram, name: "Instagram", url: content.instagramUrl },
    { icon: Facebook, name: "Facebook", url: content.facebookUrl },
    { icon: Twitter, name: "Twitter", url: content.twitterUrl },
  ];

  return (
    <div className={`flex flex-col gap-10 p-6  animate-in fade-in duration-700 transition-colors duration-1000 ${
      theme === 'day' ? 'bg-slate-200 text-slate-900' : 'bg-black text-white'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-4xl font-black tracking-tighter uppercase transition-colors duration-1000 ${
           theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>CONTACTO<br /><span className="text-primary tracking-norm">DO CLUB</span></h1>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-[0_0_15px_rgba(218,41,28,0.4)]">
          <Shield size={24} className="text-white" />
        </div>
      </header>

      {/* Info Section */}
      <section className="flex flex-col gap-4">
        {infoItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 rounded-3xl p-5 border transition-all duration-1000 ${
              theme === 'day' ? 'bg-slate-100 border-slate-200' : 'bg-white/[0.02] border-white/5 active:bg-white/5'
            }`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-1000 ${
              theme === 'day' ? 'bg-slate-200 text-primary' : 'bg-white/5 text-primary'
            }`}>
              <item.icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className={`text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-400' : 'text-white/40'
              }`}>{item.title}</span>
              <span className={`text-xs font-bold uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-900' : 'text-white'
              }`}>{item.value}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Socials Card */}
      <section className={`rounded-[2.5rem] p-8 border transition-all duration-1000 ${
        theme === 'day' ? 'bg-slate-100 border-slate-200 shadow-xl shadow-slate-300/30' : 'bg-white/[0.02] border-white/5 shadow-2xl'
      }`}>
        <div className="flex flex-col items-center gap-6">
            <h3 className={`text-[10px] font-black tracking-[0.4em] uppercase transition-colors duration-1000 ${
              theme === 'day' ? 'text-slate-400' : 'text-white/30'
            }`}>SÍGUENOS</h3>
            <div className="flex gap-8">
                {socials.map((social) => (
                    <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={social.name}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
                          theme === 'day' 
                            ? "bg-slate-200 border-slate-300 text-slate-600 hover:text-primary" 
                            : "bg-black/60 border-white/10 text-white hover:text-primary"
                        }`}
                    >
                        <social.icon size={24} />
                    </motion.a>
                ))}
            </div>
        </div>
      </section>

      {/* Footer text */}
      <div className="mt-10 flex flex-col items-center text-center">
          <span className={`text-[8px] font-black tracking-[0.5em] uppercase transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/20'
          }`}>CLUB ATLÉTICO CERCEDENSE</span>
          <span className={`mt-1 text-[8px] font-bold uppercase tracking-widest leading-loose transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-300' : 'text-white/10'
          }`}>
              © 2026 ORGULLO DE CERCEDA.<br />
              POLÍTICA DE PRIVACIDADE · TERMOS DE USO
          </span>
      </div>
    </div>
  );
}
