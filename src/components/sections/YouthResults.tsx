"use client";

import { motion } from "framer-motion";

const categories = [
  { name: "Xuvenil", result: "6 - 0", opponent: "Unión Campestre", outcome: "Victoria", home: true },
  { name: "Cadete", result: "6 - 0", opponent: "Carral B", outcome: "Victoria", home: true },
  { name: "Infantil", result: "1 - 2", opponent: "San Tirso C", outcome: "Derrota", home: true },
  { name: "Alevín A", result: "Derrota", opponent: "Olimpico B", outcome: "Derrota", home: false },
  { name: "Alevín B", result: "Derrota", opponent: "A.Arteixo C", outcome: "Derrota", home: false },
  { name: "Benxamín A", result: "Vitoria", opponent: "sada cf b", outcome: "Victoria", home: false },
  { name: "Benxamín B", result: "Vitoria", opponent: "Sd brexo lema", outcome: "Victoria", home: false },
  { name: "Prebenxamín", result: "Vitoria", opponent: "Victoria C.F B", outcome: "Victoria", home: false },
  { name: "Biberón", result: "Descanso", opponent: "", outcome: "Descanso", home: true },
];

export default function YouthResults() {
  const playedMatches = categories.filter(c => c.outcome !== 'Descanso');
  const totalMatches = playedMatches.length;
  const wins = categories.filter(c => c.outcome === 'Victoria').length;
  const draws = categories.filter(c => c.outcome === 'Empate').length;
  const losses = categories.filter(c => c.outcome === 'Derrota').length;

  return (
    <section className="py-24 bg-surface min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Fútbol Base
          </motion.p>
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter mb-4"
            >
              Resultados da <span className="text-primary">Canteira</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg mb-8 font-light"
            >
              Última Xornada
            </motion.p>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-surface/50 border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-white/5 group-hover:bg-primary transition-colors duration-500" />

              <div className="flex justify-between items-center mb-8 pl-2">
                <div className="flex flex-col">
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter leading-none">{cat.name}</h3>
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mt-1">Canteira</span>
                </div>
                {cat.result.includes('-') && (
                  <div className="flex flex-col items-center">
                    <span className={`uppercase font-black text-[9px] tracking-[0.2em] px-3 py-1 rounded-full border ${cat.outcome === 'Victoria' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      cat.outcome === 'Empate' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                      {cat.outcome === 'Victoria' ? 'Vitoria' : cat.outcome}
                    </span>
                  </div>
                )}
              </div>

              {cat.outcome === 'Descanso' ? (
                <div className="flex items-center justify-center bg-black/40 p-5 rounded-lg border border-white/5 group-hover:bg-primary/5 transition-colors duration-500 min-h-[5.5rem]">
                  <span className="font-heading font-black text-lg text-white/20 uppercase tracking-[0.3em] text-center">
                    DESCANSO
                  </span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between bg-black/40 p-6 rounded-lg border border-white/5 group-hover:bg-primary/5 transition-all duration-500 gap-5 sm:gap-2">
                  <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                    <span className="font-heading font-black text-white uppercase tracking-tight text-sm sm:text-base block sm:inline truncate">
                      {cat.home ? "Cercedense" : cat.opponent}
                    </span>
                  </div>
                  
                  <div className="shrink-0 text-center flex flex-col items-center justify-center min-w-[110px] border-y sm:border-y-0 sm:border-x border-white/10 py-3 sm:py-0 px-5">
                    <span className={`font-heading font-black text-3xl sm:text-4xl tracking-tighter drop-shadow-lg ${
                      cat.result.includes('-') ? 'text-accent' : 
                      (cat.outcome === 'Victoria' ? 'text-green-500' : 
                       cat.outcome === 'Empate' ? 'text-gray-400' : 'text-red-500')
                    }`}>
                      {cat.result}
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-right w-full sm:w-auto">
                    <span className="font-heading font-black uppercase tracking-tight text-sm sm:text-base block sm:inline truncate text-white/40 group-hover:text-white/80 transition-colors">
                      {!cat.home ? "Cercedense" : cat.opponent}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>   </div>

        {/* Global Stats Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 mb-4 bg-surface-light border border-white/5 p-6 md:p-8 rounded-sm shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter mb-8 text-center flex items-center justify-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Balance da Xornada
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          </h3>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-2/3">
              <div className="flex h-6 md:h-8 w-full rounded-full overflow-hidden bg-black/40 mb-4 shadow-inner ring-1 ring-white/10">
                <div style={{ width: `${totalMatches ? (wins / totalMatches) * 100 : 0}%` }} className="bg-green-500 hover:brightness-110 transition-all duration-300 relative group cursor-pointer flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div style={{ width: `${totalMatches ? (draws / totalMatches) * 100 : 0}%` }} className="bg-gray-500 hover:brightness-110 transition-all duration-300 relative group cursor-pointer flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div style={{ width: `${totalMatches ? (losses / totalMatches) * 100 : 0}%` }} className="bg-red-500 hover:brightness-110 transition-all duration-300 relative group cursor-pointer flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between px-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/50">
                <span className="text-green-500">Vitorias ({Math.round(totalMatches ? (wins / totalMatches) * 100 : 0)}%)</span>
                <span className="text-gray-400">Empates ({Math.round(totalMatches ? (draws / totalMatches) * 100 : 0)}%)</span>
                <span className="text-red-500">Derrotas ({Math.round(totalMatches ? (losses / totalMatches) * 100 : 0)}%)</span>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-between gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6 text-center">
              <div className="flex flex-col items-center">
                <span className="font-heading font-black text-4xl md:text-5xl text-green-500 drop-shadow-md">{wins}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-heading font-black text-4xl md:text-5xl text-gray-500 drop-shadow-md">{draws}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-heading font-black text-4xl md:text-5xl text-red-500 drop-shadow-md">{losses}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
