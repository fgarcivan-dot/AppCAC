"use client";

import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Camiseta Primeira Equipación",
    category: "Roupa Oficial",
    image: "/merch/1.jpg"
  },
  {
    id: 2,
    name: "Camiseta Segunda Equipación",
    category: "Roupa Oficial",
    image: "/merch/2.jpg"
  },
  {
    id: 3,
    name: "Bufanda Oficial Cercedense",
    category: "Accesorios",
    image: "/merch/3.jpg"
  },
  {
    id: 4,
    name: "Sudadera de Adestramento",
    category: "Roupa Oficial",
    image: "/merch/4.jpg"
  },
  {
    id: 5,
    name: "Chándal Completo",
    category: "Roupa Oficial",
    image: "/merch/5.jpg"
  },
  {
    id: 6,
    name: "Polo de Paseo",
    category: "Roupa Oficial",
    image: "/merch/6.jpg"
  }
];

export default function MerchGallery() {
  return (
    <section className="py-12 md:py-24 bg-white border-t border-black/5 relative overflow-hidden" id="merchandising">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-foreground uppercase tracking-tighter"
          >
            O Noso <span className="text-primary">Merchandising</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground text-lg lg:text-xl mt-4 max-w-2xl mx-auto font-light opacity-60"
          >
            Viste as nosas cores con orgullo. Descobre a liña oficial de roupa e accesorios do Club Atlético Cercedense.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white border border-black/5 rounded-sm overflow-hidden flex flex-col hover:border-primary/20 transition-all duration-300 shadow-sm"
            >
              <div className="aspect-square relative bg-slate-50 overflow-hidden flex items-center justify-center p-8">
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center opacity-20">
                  <span className="font-heading font-black text-6xl italic">CAC</span>
                </div>
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out relative z-10 drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
              </div>
              
              <div className="p-8 flex flex-col items-center text-center border-t border-black/5 relative z-20 bg-white">
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3">{product.category}</span>
                <h3 className="font-heading font-black text-2xl text-foreground uppercase leading-tight mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto bg-slate-50 border border-black/5 rounded-sm p-8 md:p-12 text-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <h4 className="font-heading font-black text-3xl md:text-4xl text-foreground uppercase mb-4">¿Queres conseguir o teu?</h4>
          <p className="text-foreground text-lg md:text-xl font-light leading-relaxed opacity-70">
            Todo o noso merchandising oficial está dispoñible para a súa venda exclusivamente nas <span className="text-foreground font-medium">oficinas do club</span> ou na nosa cantina os <span className="text-primary font-bold">días de partido</span>.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
