"use client";

import { motion } from "framer-motion";

const teams = [
  {
    name: "Senior Masculino",
    category: "3ª Futgal A Coruña G3",
    image: "/teams/senior-masculino.jpg",
    staff: "Adestrador Principal, Segundo Adestrador, Prep. Físico",
    squad: "22 Xogadores",
    lastMatch: {
      competition: "Jornada 23",
      opponent: "S.D Pontecarreira",
      isHome: true,
      score: "1 - 0",
      result: "Victoria"
    }
  },
  {
    name: "Senior Feminino",
    category: "3ª División Galega Feminina G2",
    image: "/teams/senior-feminino.jpg",
    staff: "Corpo Técnico Filial",
    squad: "20 Xogadores",
    lastMatch: {
      competition: "Jornada 24",
      opponent: "a.d culleredo",
      isHome: false,
      score: "1 - 8",
      result: "vitoria"
    }
  }
];

export default function Teams() {
  return (
    <section className="py-24 bg-background overflow-hidden" id="equipos">
      <div className="fluid-container relative z-10 px-6">
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">
              ESTRUCTURA ELITE
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-5xl md:text-7xl text-white uppercase tracking-tighter leading-none"
          >
            Equipos <span className="text-primary">Seniors</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900 flex flex-col h-full shadow-2xl transition-all duration-700 hover:border-primary/20"
            >
              <div className="aspect-[16/10] overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                />
                <div className="absolute top-6 left-6 z-20">
                   <div className="px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl">
                      <span className="text-[8px] font-black tracking-[0.4em] text-white uppercase">{team.squad}</span>
                   </div>
                </div>
              </div>

              <div className="p-8 pb-10 relative flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading font-black text-3xl text-white uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">{team.name}</h3>
                  <span className="text-white/30 font-black uppercase tracking-[0.3em] text-[9px] mt-2">{team.category}</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                   <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
                      <span className="text-[8px] font-black tracking-[0.3em] text-white/30 uppercase">Corpo Técnico</span>
                      <span className="text-[9px] font-bold text-white uppercase tracking-widest truncate max-w-[60%]">{team.staff}</span>
                   </div>
                </div>

                {/* Último Resultado Panel - Mini Elite Style */}
                <div className="mt-auto bg-white/[0.03] border border-white/5 rounded-[1.8rem] p-6 relative overflow-hidden group-hover:bg-white/[0.05] transition-all">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2">
                       <div className="w-1 h-1 rounded-full bg-primary" />
                       <span className="text-white/40 uppercase font-black text-[8px] tracking-[0.4em]">ÚLTIMO PARTIDO</span>
                    </div>
                    <span className="text-white/20 uppercase font-black text-[8px] tracking-[0.4em]">{team.lastMatch.competition}</span>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                       <span className={`text-sm font-black uppercase tracking-tight ${team.lastMatch.isHome ? 'text-white' : 'text-white/40'}`}>
                          {team.lastMatch.isHome ? "CERCEDENSE" : team.lastMatch.opponent}
                       </span>
                       <span className={`text-sm font-black uppercase tracking-tight ${!team.lastMatch.isHome ? 'text-white' : 'text-white/40'}`}>
                          {!team.lastMatch.isHome ? "CERCEDENSE" : team.lastMatch.opponent}
                       </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 px-4 bg-black/40 rounded-2xl border border-white/5 min-w-[70px]">
                       <span className="font-heading font-black text-2xl text-white tabular-nums tracking-tighter">{team.lastMatch.score}</span>
                       <span className={`uppercase font-black text-[7px] tracking-[0.3em] mt-1 px-2 py-0.5 rounded-full ${
                          team.lastMatch.result.toLowerCase().includes('vitoria') ? 'bg-green-500/20 text-green-500' :
                          team.lastMatch.result.toLowerCase().includes('empate') ? 'bg-white/10 text-white/40' :
                          'bg-primary/20 text-primary'
                        }`}>
                        {team.lastMatch.result.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
