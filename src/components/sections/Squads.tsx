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
  const [activeTab, setActiveTab] = useState<"mens" | "womens">("mens"); return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden" id="plantillas">
      <div className="absolute top-0 right-0 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="fluid-container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-fluid-h2 text-white uppercase tracking-tighter"
          >
            Os Nosos <span className="text-primary">Xogadores</span>
          </motion.h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 max-w-sm mx-auto sm:max-w-none">
            <button
              onClick={() => setActiveTab("mens")}
              className={`px-8 py-4 font-heading font-bold uppercase tracking-wider text-sm transition-all rounded-sm ${activeTab === 'mens' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-surface border border-white/10 text-white/50 hover:text-white hover:border-white/30'}`}
            >
              Senior Masculino
            </button>
            <button
              onClick={() => setActiveTab("womens")}
              className={`px-8 py-4 font-heading font-bold uppercase tracking-wider text-sm transition-all rounded-sm ${activeTab === 'womens' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-surface border border-white/10 text-white/50 hover:text-white hover:border-white/30'}`}
            >
              Senior Feminino
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
          {squads[activeTab].map((player, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-surface group relative overflow-hidden rounded-sm border border-white/5 flex flex-col shadow-xl"
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-surface-light shrink-0">
                {/* Fallback pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="font-heading font-black text-8xl">{player.number}</span>
                </div>

                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out relative z-10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />

                {/* Red gradient overlay */}
                <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-background via-background/80 to-transparent z-20" />

                {/* Player Number Watermark */}
                <div className="absolute top-3 right-3 z-20 text-white font-heading font-black text-2xl lg:text-3xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 drop-shadow-md bg-primary/80 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-sm">
                  {player.number}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col relative z-30 -mt-20">
                <p className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1 drop-shadow-md">{player.position}</p>
                <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase leading-tight drop-shadow-lg">{player.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
