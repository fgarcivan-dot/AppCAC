"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const squads = {
  mens: [
    { name: "Iván Lorenzo", position: "Porteiro", number: "1", image: "/players/mens/1.jpg" },
    { name: "Nome Xogador", position: "Defensa", number: "2", image: "/players/mens/2.jpg" },
    { name: "Nome Xogador", position: "Defensa", number: "3", image: "/players/mens/3.jpg" },
    { name: "Nome Xogador", position: "Defensa", number: "4", image: "/players/mens/4.jpg" },
    { name: "Nome Xogador", position: "Defensa", number: "5", image: "/players/mens/5.jpg" },
    { name: "Nome Xogador", position: "Centrocampista", number: "6", image: "/players/mens/6.jpg" },
    { name: "Nome Xogador", position: "Centrocampista", number: "8", image: "/players/mens/8.jpg" },
    { name: "Nome Xogador", position: "Dianteiro", number: "9", image: "/players/mens/9.jpg" },
    { name: "Nome Xogador", position: "Centrocampista", number: "10", image: "/players/mens/10.jpg" },
    { name: "Nome Xogador", position: "Dianteiro", number: "11", image: "/players/mens/11.jpg" },
    { name: "Nome Xogador", position: "Defensa", number: "12", image: "/players/mens/12.jpg" },
    { name: "Nome Xogador", position: "Porteiro", number: "13", image: "/players/mens/13.jpg" },
    { name: "Nome Xogador", position: "Centrocampista", number: "14", image: "/players/mens/14.jpg" },
    { name: "Nome Xogador", position: "Defensa", number: "15", image: "/players/mens/15.jpg" },
    { name: "Nome Xogador", position: "Dianteiro", number: "16", image: "/players/mens/16.jpg" },
  ],
  womens: [
    { name: "Nome Xogadora", position: "Porteira", number: "1", image: "/players/womens/1.jpg" },
    { name: "Nome Xogadora", position: "Defensa", number: "2", image: "/players/womens/2.jpg" },
    { name: "Nome Xogadora", position: "Defensa", number: "3", image: "/players/womens/3.jpg" },
    { name: "Nome Xogadora", position: "Defensa", number: "4", image: "/players/womens/4.jpg" },
    { name: "Nome Xogadora", position: "Defensa", number: "5", image: "/players/womens/5.jpg" },
    { name: "Nome Xogadora", position: "Centrocampista", number: "6", image: "/players/womens/6.jpg" },
    { name: "Nome Xogadora", position: "Centrocampista", number: "8", image: "/players/womens/8.jpg" },
    { name: "Nome Xogadora", position: "Dianteira", number: "9", image: "/players/womens/9.jpg" },
    { name: "Nome Xogadora", position: "Centrocampista", number: "10", image: "/players/womens/10.jpg" },
    { name: "Nome Xogadora", position: "Dianteira", number: "11", image: "/players/womens/11.jpg" },
  ]
};

export default function Squads() {
  const [activeTab, setActiveTab] = useState<"mens" | "womens">("mens");
  
  return (
    <section className="py-12 md:py-24 bg-[#050505] relative overflow-hidden" id="plantillas">
      <div className="fluid-container relative z-10 px-6">
        <div className="flex flex-col gap-8 mb-16 items-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">
                NOSO POTENCIAL
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-heading font-black text-5xl md:text-7xl text-white uppercase tracking-tighter leading-none text-center"
            >
              Os Nosos <br/> <span className="text-primary">Xogadores</span>
            </motion.h2>
          </div>

          {/* Elite Tab Selector */}
          <div className="w-full max-w-[400px] relative backdrop-blur-3xl rounded-full p-[2px] border border-white/10 flex items-center bg-[#0a0a0a] shadow-2xl">
            <motion.div 
              animate={{ x: activeTab === "mens" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-[0_0_20px_rgba(218,41,28,0.4)]"
            />
            <button 
              onClick={() => setActiveTab("mens")}
              className={`relative z-10 flex-1 py-4 text-[10px] font-black tracking-widest uppercase transition-all duration-500 ${
                activeTab === "mens" ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              Sénior Masculino
            </button>
            <button 
              onClick={() => setActiveTab("womens")}
              className={`relative z-10 flex-1 py-4 text-[10px] font-black tracking-widest uppercase transition-all duration-500 ${
                activeTab === "womens" ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              Sénior Feminino
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
          {squads[activeTab].map((player, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a] flex flex-col shadow-2xl hover:border-primary/20 transition-all duration-500"
            >
              <div className="aspect-[3/4.5] overflow-hidden relative bg-[#111] shrink-0">
                {/* Number Watermark HUD */}
                <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex items-center justify-center">
                   <span className="text-white font-black text-xl tracking-tighter">{player.number}</span>
                </div>

                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
              </div>

              <div className="p-6 pt-0 relative z-20 flex flex-col items-center text-center -mt-16">
                 <div className="flex flex-col gap-1 items-center">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="w-1 h-1 rounded-full bg-primary" />
                       <span className="text-primary font-black uppercase tracking-[0.3em] text-[9px]">{player.position}</span>
                    </div>
                    <h3 className="font-heading font-black text-xl text-white uppercase leading-tight tracking-tighter group-hover:text-primary transition-colors">{player.name}</h3>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
