"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  "Prebenjamín",
  "Benjamín",
  "Alevín",
  "Infantil",
  "Cadete",
  "Juvenil",
  "Biberón",
];

export default function YouthAcademy() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-white/5 relative overflow-hidden" id="escuelas">
      {/* Decorative background overlay */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="fluid-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 md:pr-10">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Fútbol Base
            </motion.span>
            <div className="max-w-xl md:w-full">
              <h2 className="font-heading font-black text-fluid-h2 text-white uppercase tracking-tighter mb-4">
                A Nosa <span className="text-primary">Canteira</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 font-light leading-relaxed">
                As Escolas de Fútbol do Concello de Cerceda.
              </p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white/80 border-l-2 border-primary pl-4 italic text-lg"
              >
                O noso maior orgullo é ver medrar ás futuras promesas. Sete categorías dedicadas á formación integral, onde os valores son tan importantes como os resultados no terreo de xogo.
              </motion.p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mt-6">
              <motion.a
                href="/contacto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group inline-flex gap-3 items-center text-white border-b-2 border-primary pb-1 font-heading font-bold uppercase tracking-wider hover:text-primary hover:border-white transition-all duration-300 pr-2 hover:pr-4"
              >
                Inscrición
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/escuelas/resultados"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group inline-flex gap-3 items-center text-white/60 border-b-2 border-white/20 pb-1 font-heading font-bold uppercase tracking-wider hover:text-white hover:border-white transition-all duration-300 pr-2 hover:pr-4"
              >
                Ver Resultados
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </div>
          </div>

          {/* Grid of Categories */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 relative">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group relative aspect-square bg-surface border border-white/5 flex flex-col items-center justify-center p-6 text-center hover:bg-primary transition-colors duration-300 cursor-pointer overflow-hidden rounded-sm"
              >
                <div className="absolute right-0 bottom-0 text-white/5 group-hover:text-white/20 font-heading font-black text-8xl md:text-9xl transition-colors duration-500 translate-x-4 translate-y-4 select-none pointer-events-none transform group-hover:scale-110">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="font-heading font-bold text-lg md:text-2xl text-white uppercase relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {cat}
                </h3>
              </motion.div>
            ))}

            {/* Promo Card that spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="col-span-2 md:col-span-2 group relative overflow-hidden bg-surface border border-white/5 rounded-sm flex items-center justify-center p-6 text-center"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-primary/80 transition-all duration-500 z-0" />
              <div className="relative z-10 w-full flex flex-row items-center justify-between px-4 md:px-6">
                <p className="font-heading font-black text-2xl md:text-3xl uppercase text-white tracking-widest text-left leading-[1.1]">
                  Únete a <br />la Cantera
                </p>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform group-hover:-rotate-45 transition-transform duration-500">
                  <ArrowUpRight className="w-6 h-6 text-black" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
