"use client";

import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Shield, SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Contacto() {
  const { data, loading } = useContent();

  if (loading) return <div className="h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const content = data.contacto || {};

  const infoItems = [
    { icon: MapPin, title: "DIRECCIÓN", value: content.address || "Cerceda" },
    { icon: Mail, title: "EMAIL", value: content.email || "gerencia@atleticocercedense.es" },
    { icon: Phone, title: "TELÉFONO", value: content.phone || "+34 600 000 000" },
  ];

  const socials = [
    { icon: Instagram, name: "Instagram", url: content.instagramUrl },
    { icon: Facebook, name: "Facebook", url: content.facebookUrl },
    { icon: Twitter, name: "Twitter", url: content.twitterUrl },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-950 pb-32">
      
      {/* 🏛️ Header - Restored App Style */}
      <header className="p-8 pb-4 flex items-center justify-between">
        <h1 className="text-4xl font-black tracking-tighter uppercase text-slate-950 leading-[0.9]">
            CONTACTO<br />
            <span className="text-primary tracking-normal">DO CLUB</span>
        </h1>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/20">
          <Shield size={24} className="text-white" />
        </div>
      </header>

      {/* 📍 Compact Info Items */}
      <section className="px-6 py-8 flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {infoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-[1.5rem] p-4 border bg-slate-50 border-black/5 hover:bg-slate-100 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary border border-black/5 shadow-sm">
                        <item.icon size={18} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-400 leading-none mb-1">{item.title}</span>
                        <span className="text-xs font-black uppercase text-slate-950 truncate">{item.value}</span>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 📧 Main Form Card (Integrated & Smaller) */}
      <section className="px-6 py-4">
        <div className="bg-slate-50 border border-black/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            
            {/* Atmospheric Detail */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none opacity-40 translate-x-1/2 -translate-y-1/2" />

            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-950 mb-10 flex items-center gap-4">
                Envíanos unha mensaxe
                <div className="h-[2px] w-8 bg-primary/20" />
            </h2>

            <form className="flex flex-col gap-8">
                
                {/* Horizontal Desktop Row: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nome</label>
                        <input 
                            type="text" 
                            placeholder="O teu nome completo"
                            className="w-full bg-white border border-black/5 rounded-xl p-5 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Correo Electrónico</label>
                        <input 
                            type="email" 
                            placeholder="ti@email.com"
                            className="w-full bg-white border border-black/5 rounded-xl p-5 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                        />
                    </div>
                </div>

                {/* Case Selection / Subject */}
                <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Asunto</label>
                    <input 
                        type="text" 
                        placeholder="Sobre que nos escribes?"
                        className="w-full bg-white border border-black/5 rounded-xl p-5 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                    />
                </div>

                {/* Vertical Message Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Mensaxe</label>
                    <textarea 
                        rows={4}
                        placeholder="Escribe a túa mensaxe aquí..."
                        className="w-full bg-white border border-black/5 rounded-2xl p-5 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold resize-none"
                    />
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                    <button 
                        type="submit"
                        className="w-full md:w-auto px-10 bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all py-5 rounded-xl flex items-center justify-center gap-4 text-white font-black uppercase text-[11px] tracking-[0.15em] shadow-[0_10px_20px_-5px_rgba(218,41,28,0.3)] group"
                    >
                        Enviar Mensaxe
                        <SendHorizontal size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </form>
        </div>
      </section>

      {/* Social Footer Card */}
      <section className="px-6 py-6">
        <div className="rounded-[2rem] p-8 border bg-slate-50 border-black/5 flex flex-col items-center gap-6">
             <h3 className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-400">SÍGUENOS</h3>
            <div className="flex gap-6">
                {socials.map((social) => (
                    <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={social.name}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-12 w-12 items-center justify-center rounded-full border bg-white border-black/5 text-slate-950 hover:text-primary transition-all shadow-sm"
                    >
                        <social.icon size={20} />
                    </motion.a>
                ))}
            </div>
        </div>
      </section>

      {/* Corporate Signoff */}
      <div className="mt-12 flex flex-col items-center text-center px-10 opacity-40">
          <span className="text-[9px] font-black tracking-[0.4em] uppercase">CLUB ATLÉTICO CERCEDENSE</span>
          <span className="mt-2 text-[8px] font-black uppercase tracking-widest leading-loose">
              Orgullo de Cerceda · 2026<br />
              POLÍTICA DE PRIVACIDADE · TERMOS DE USO
          </span>
      </div>

    </div>
  );
}
