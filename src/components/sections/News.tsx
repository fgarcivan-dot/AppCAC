"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const news = [
  {
    title: "Victoria vital en el descuento",
    category: "Senior Masculino",
    date: "22 Mar 2026",
    image: "/news/1.jpg"
  },
  {
    title: "El Cadete A se proclama campeón de liga",
    category: "Fútbol Base",
    date: "20 Mar 2026",
    image: "/news/2.jpg"
  },
  {
    title: "Nueva campaña de abonos para socios",
    category: "Club",
    date: "18 Mar 2026",
    image: "/news/3.jpg"
  }
];

export default function News() {
  return (
    <section className="py-24 bg-background overflow-hidden" id="noticias">
        <div className="fluid-container relative z-10 px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-primary rounded-full" />
                <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">
                  ACTUALIDADE
                </span>
              </div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-heading font-black text-5xl md:text-7xl text-white uppercase tracking-tighter leading-none"
              >
                Últimas <span className="text-primary">Novas</span>
              </motion.h2>
            </div>
            <button className="hidden md:flex items-center gap-3 text-white/40 hover:text-white uppercase font-black tracking-[0.3em] text-[10px] transition-all duration-500 group">
              VER ARQUIVO COMPLETO
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <ArrowRight size={12} className="text-white" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            
            {/* Main Featured News - Elite Style */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 group cursor-pointer relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900 group shadow-2xl transition-all duration-700 hover:border-primary/30"
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img 
                  src={news[0].image} 
                  alt={news[0].title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-70"
                />
              </div>

              <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                <div className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/20 backdrop-blur-xl flex items-center justify-center self-start">
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase text-primary">DESTACADO</span>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex items-center gap-4 text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span>{news[0].category}</span>
                  </div>
                  <div className="h-px w-8 bg-white/10" />
                  <span>{news[0].date}</span>
                </div>
                <h3 className="font-heading font-black text-4xl md:text-5xl text-white uppercase leading-[0.9] mb-8 tracking-tighter group-hover:text-primary transition-colors">
                  {news[0].title}
                </h3>
                <div className="flex items-center gap-4 text-white font-black uppercase tracking-[0.3em] text-[10px] group-hover:gap-6 transition-all duration-500">
                  <span>LER CRÓNICA</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary News - Elite Minimalist Grid */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {news.slice(1).map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex-1 group cursor-pointer relative rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-xl transition-all duration-500 hover:border-primary/20"
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] opacity-30 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                  </div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-3">
                       <span className="text-primary text-[8px] font-black uppercase tracking-[0.3em]">{item.category}</span>
                       <h3 className="font-heading font-black text-xl text-white uppercase leading-tight tracking-tighter group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-white/20 text-[8px] font-black uppercase tracking-[0.4em] mt-auto">{item.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-4 text-white/40 hover:text-white uppercase font-black tracking-[0.3em] text-[10px] mt-12 transition-all md:hidden border-t border-white/5 pt-8">
            VER TODAS AS NOVAS
            <ArrowRight size={12} />
          </button>
        </div>
    </section>
  );
}
