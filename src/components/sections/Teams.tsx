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
    <section className="py-24 bg-surface" id="equipos">
      <div className="fluid-container relative z-10">
        <div className="text-center mb-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-fluid-h2 text-white uppercase tracking-tighter"
          >
            Equipos <span className="text-primary">Seniors</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-4 max-w-2xl mx-auto text-lg"
          >
            A máxima expresión do noso club. Os equipos que levan o nome de Cerceda por toda Galicia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-sm bg-background border border-white/5 flex flex-col h-full"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-surface-light shrink-0">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-8 relative flex-1 flex flex-col">
                {/* Decorative line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />

                <h3 className="font-heading font-bold text-3xl text-white uppercase mb-2 group-hover:text-primary transition-colors">{team.name}</h3>
                <p className="text-white/50 font-bold uppercase tracking-widest text-sm mb-6">{team.category}</p>

                <div className="flex flex-col gap-3 text-white/70 text-sm mb-8">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="uppercase text-xs font-bold tracking-wider text-white/50">Cadro</span>
                    <span className="font-medium text-white">{team.squad}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="uppercase text-xs font-bold tracking-wider text-white/50">Corpo Técnico</span>
                    <span className="font-medium text-right text-white max-w-[60%] truncate" title={team.staff}>{team.staff}</span>
                  </div>
                </div>

                {/* Último Resultado Panel */}
                <div className="mt-auto bg-surface-light border border-white/5 rounded-sm p-5 relative overflow-hidden group-hover:border-white/10 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[20px] -translate-y-1/2 translate-x-1/2" />

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/40 uppercase font-bold text-[10px] tracking-widest leading-none">Último Partido</span>
                    <span className="text-white/40 uppercase font-bold text-[10px] tracking-widest leading-none">{team.lastMatch.competition}</span>
                  </div>

                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex flex-col items-center flex-1">
                      <span className="font-heading font-bold text-white uppercase tracking-wider text-sm lg:text-base text-center break-words w-full px-1">
                        {team.lastMatch.isHome ? "Cercedense" : team.lastMatch.opponent}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center px-4 shrink-0">
                      <span className="font-heading font-black text-3xl text-white tracking-widest">{team.lastMatch.score}</span>
                      <span className={`uppercase font-bold text-[10px] tracking-widest mt-1 px-2.5 py-1 rounded-sm ${team.lastMatch.result.toLowerCase() === 'victoria' || team.lastMatch.result.toLowerCase() === 'vitoria' ? 'bg-green-500/20 text-green-500' :
                        team.lastMatch.result.toLowerCase() === 'empate' ? 'bg-gray-500/20 text-gray-400' :
                          'bg-red-500/20 text-red-500'
                        }`}>
                        {team.lastMatch.result.toLowerCase() === 'victoria' || team.lastMatch.result.toLowerCase() === 'vitoria' ? 'Vitoria' :
                          team.lastMatch.result.toLowerCase() === 'empate' ? 'Empate' : 'Derrota'}
                      </span>
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <span className="font-heading font-bold text-white/50 uppercase tracking-wider text-sm lg:text-base text-center break-words w-full px-1">
                        {team.lastMatch.isHome ? team.lastMatch.opponent : "Cercedense"}
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
