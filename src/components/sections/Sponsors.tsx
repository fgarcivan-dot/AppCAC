"use client";

import { motion } from "framer-motion";

const sponsors = [
  "Coca-Cola", "Nike", "Estrella Galicia", "Gadis", "Abanca", "Xunta de Galicia", "Deputación da Coruña"
];

export default function Sponsors() {
  return (
    <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.p 
          initial={false}
          animate={{ opacity: 1 }}
          className="text-center text-primary font-black tracking-[0.4em] uppercase text-xs mb-12"
        >
          Patrocinadores Oficiais
        </motion.p>
        <motion.h2
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4 uppercase tracking-tighter"
        >
          Os Nosos <span className="text-primary">Patrocinadores</span>
        </motion.h2>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="text-white mt-4 max-w-2xl mx-auto text-lg text-center mb-12 opacity-60 font-light"
        >
          O apoio incondicional das empresas que fan posible que o balón siga rodando en Cerceda.
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 lg:gap-32 opacity-20 hover:opacity-100 transition-opacity duration-700">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="font-heading font-black text-xl md:text-2xl lg:text-3xl text-white tracking-widest hover:text-primary transition-all duration-500 cursor-pointer text-center select-none uppercase"
            >
              {sponsor}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
