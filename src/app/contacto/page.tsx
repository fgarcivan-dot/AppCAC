"use client";

import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Shield } from "lucide-react";
import { motion } from "framer-motion";

const infoItems = [
  { icon: MapPin, title: "DIRECCIÓN", value: "CAMPO O ROXO, CERCEDA" },
  { icon: Mail, title: "EMAIL", value: "c.a.cercedense@gmail.com" },
  { icon: Phone, title: "TELÉFONO", value: "+34 600 000 000" },
];

const socials = [
  { icon: Instagram, name: "Instagram" },
  { icon: Facebook, name: "Facebook" },
  { icon: Twitter, name: "Twitter" },
];

export default function Contacto() {
  return (
    <div className="flex flex-col gap-10 p-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <h1 className="text-3xl font-black tracking-tighter text-white">CONTACTO<br /><span className="text-primary tracking-norm">DO CLUB</span></h1>
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
            className="flex items-center gap-4 rounded-3xl bg-surface p-5 border border-white/5 active:bg-white/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-primary">
              <item.icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase font-heading">{item.title}</span>
              <span className="text-xs font-bold text-white uppercase">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Socials Card */}
      <section className="rounded-[2.5rem] bg-surface-light p-8 border border-white/5">
        <div className="flex flex-col items-center gap-6">
            <h3 className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase font-heading">SÍGUENOS</h3>
            <div className="flex gap-8">
                {socials.map((social) => (
                    <motion.div 
                        key={social.name}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white active:text-primary transition-colors"
                    >
                        <social.icon size={24} />
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer text */}
      <div className="mt-10 flex flex-col items-center text-center">
          <span className="text-[8px] font-black tracking-[0.5em] text-white/20 uppercase font-heading">CLUB ATLÉTICO CERCEDENSE</span>
          <span className="mt-1 text-[8px] font-bold text-white/10 uppercase tracking-widest leading-loose">
              © 2026 ORGULLO DE CERCEDA.<br />
              POLÍTICA DE PRIVACIDADE · TERMOS DE USO
          </span>
      </div>
    </div>
  );
}
