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
    <section className="py-24 bg-background" id="noticias">
        <div className="fluid-container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
                Actualidade
              </span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading font-black text-fluid-h2 text-white uppercase tracking-tighter mb-4"
              >
                Últimas <span className="text-primary">Novas</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/60 text-lg max-w-2xl"
              >
                A actualidade do club, crónicas de partidos, novas sobre a canteira e moito máis.
              </motion.p>
            </div>
            <button className="text-white/60 hover:text-white uppercase font-bold tracking-wider text-sm mt-4 md:mt-0 transition-colors hidden md:block border-b border-white/20 hover:border-white pb-1">
              Ver Todas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 min-h-[auto] lg:min-h-[800px]">
          {/* Main Featured News - Bento 2x2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 lg:col-span-4 lg:row-span-2 group cursor-pointer flex flex-col bg-surface/50 border border-white/5 rounded-3xl overflow-hidden glass-modern hover:border-primary/30 transition-all duration-700 shadow-2xl"
          >
            <div className="relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <img 
                src={news[0].image} 
                alt={news[0].title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-2xl">
                  DESTACADO
                </span>
              </div>
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex items-center gap-3 text-white/60 text-[10px] font-black uppercase tracking-widest mb-4">
                  <span>{news[0].category}</span>
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>{news[0].date}</span>
                </div>
                <h3 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.85] mb-6 tracking-tighter">
                  {news[0].title}
                </h3>
                <div className="flex items-center gap-4 text-white font-heading font-bold uppercase tracking-widest text-sm group-hover:gap-6 transition-all duration-500">
                  <span>Ler crónica completa</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary News - Bento 1x1 */}
          {news.slice(1).map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
              className="md:col-span-2 lg:col-span-2 group cursor-pointer flex flex-col bg-surface/50 border border-white/5 rounded-3xl overflow-hidden glass-modern hover:border-primary/30 transition-all duration-500 shadow-2xl"
            >
              <div className="relative aspect-square md:aspect-auto md:flex-1">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-accent text-black text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-20">
                   <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase leading-[0.9] tracking-tighter group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Call to Action News Card - Bento 1x1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 bg-primary group cursor-pointer flex flex-col items-center justify-center rounded-3xl p-8 text-center transition-all duration-500 hover:rotate-2 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-grid-tech animate-grid-float" />
            <h3 className="font-heading font-black text-3xl text-white uppercase leading-[0.8] mb-4 relative z-10">
              Queres saber <br /> máis?
            </h3>
            <p className="text-white/80 text-xs mb-6 font-bold uppercase tracking-wider relative z-10">Accede ao arquivo histórico de novas do Cercedense.</p>
            <div className="bg-white text-primary px-8 py-3 rounded-full font-heading font-black uppercase tracking-widest text-xs group-hover:bg-black group-hover:text-white transition-all relative z-10 shadow-xl">
              Ver Arquivo
            </div>
          </motion.div>
        </div>
        
        <button className="w-full text-center text-white/60 hover:text-white uppercase font-bold tracking-wider text-sm mt-12 transition-colors md:hidden border-t border-white/10 pt-6 block">
          Ver Todas las Noticias
        </button>
      </div>
    </section>
  );
}
