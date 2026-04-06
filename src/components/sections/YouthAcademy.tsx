"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Target, Database, Activity, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  { 
    icon: <Target size={32} />, 
    title: "TECNIFICACIÓN", 
    subtitle: "PROGRAMA DE DESENROLO E TECNIFICACIÓN DE XOGADORES",
    desc: "Fomento de habilidades técnicas individuais adaptadas a cada etapa do crecemento deportivo profundo."
  },
  { 
    icon: <Database size={32} />, 
    title: "METODOLOXÍA", 
    subtitle: "METODOLOXÍA DE ADESTRAAAMENTO PROPIA",
    desc: "Sistema de traballo cohesionado en todas as categorías para unha evolución progresiva e sólida."
  },
  { 
    icon: <Activity size={32} />, 
    title: "ÁREA CAFYD", 
    subtitle: "POTENCIACIÓN DO FÍSICO",
    desc: "Preparación física especializada e prevención de lesións supervisada por licenciados en CAFYD."
  },
  { 
    icon: <Trophy size={32} />, 
    title: "DIRECCIÓN", 
    subtitle: "DIRECCIÓN DEPORTIVA PROFESIONAL",
    desc: "Supervisión profesional do equipo técnico e seguimento individualizado de cada alumno e categoría."
  }
];

export default function YouthAcademy() {
  return (
    <section className="py-32 md:py-48 bg-white border-t border-black/5 relative overflow-hidden" id="escuelas">
      
      <div className="fluid-container relative z-10">
        
        {/* 🏛️ Strategic Club Header - Light Mode */}
        <div className="flex flex-col items-start mb-24 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary font-black tracking-[0.5em] uppercase text-[11px]">
                  Fútbol Base Cercedano
              </span>
            </motion.div>
            
            <h2 className="font-heading font-black text-fluid-h1 text-slate-950 uppercase tracking-tighter mb-4 leading-[0.9]">
              A Nosa <br /><span className="text-primary italic">Canteira</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-12">
                CONCELLO DE CERCEDA
            </p>
            
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-slate-400 text-xl font-bold leading-relaxed max-w-2xl uppercase tracking-tighter"
            >
                Coidamos o talento dende a base, combinando a disciplina deportiva coa formación en valores humanos.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Stats Sidebar - App Theme Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-10 lg:sticky lg:top-40">
             <div className="flex flex-col gap-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Seccións</p>
                 <p className="text-5xl font-black text-slate-950 tracking-tighter">07</p>
             </div>
             <div className="flex flex-col gap-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Sedes</p>
                 <p className="text-5xl font-black text-primary tracking-tighter">02</p>
             </div>
             
             <motion.a
                href="/contacto"
                target="_blank"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-[2rem] shadow-xl shadow-primary/10 hover:scale-105 active:scale-95 transition-all"
              >
                Inscrición Online
                <ArrowUpRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>
          </div>

          {/* Grid of Categories - App Sync Style */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {FEATURES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "group relative bg-white border border-black/5 p-12 flex flex-col transition-all duration-500 cursor-pointer overflow-hidden rounded-[2.5rem] shadow-sm",
                  "hover:bg-slate-50/50 hover:border-primary/20"
                )}
              >
                {/* 🚩 Feature Icon - Standard block */}
                <div className="relative w-14 h-14 flex items-center justify-center mb-10 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {item.icon}
                </div>

                <div className="flex flex-col gap-4">
                  {/* Title - App Black */}
                  <h3 className="font-black text-3xl uppercase tracking-tighter text-slate-950 leading-none">
                    {item.title}
                  </h3>

                  {/* Subtitle - Club Red */}
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary leading-snug">
                    {item.subtitle}
                  </p>

                  {/* Description - App Gray */}
                  <p className="text-[14px] font-medium leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Promo Card - Dark Billboard (Kept for visual contrast) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 group relative overflow-hidden bg-slate-950 rounded-[3.5rem] shadow-2xl mt-10 border border-black/5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 opacity-20 grayscale"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1200&auto=format&fit=crop')" }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-24 gap-12 w-full">
                <div className="flex flex-col gap-6 text-center md:text-left">
                    <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Portal de cantera</p>
                    <p className="font-heading font-black text-5xl md:text-7xl uppercase text-white tracking-widest leading-[0.85]">
                        ÚNETE Á <br /><span className="text-primary italic">A CANTEIRA</span>
                    </p>
                </div>
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 active:scale-90">
                    <ArrowUpRight className="w-12 h-12" />
                </div>
              </div>

              {/* Massive back typography overlay */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none text-white">
                  <p className="text-[200px] font-black italic tracking-tighter uppercase" style={{ WebkitTextStroke: '2px currentColor' }}>CERCEDA</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
