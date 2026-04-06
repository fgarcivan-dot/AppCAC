"use client";

import { motion } from "framer-motion";

import { useContent } from "../mobile/layout/ContentProvider";

export default function Teams() {
  const { data, loading } = useContent();

  if (loading || !data?.equipos) {
    return <div className="py-24 bg-background flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  const teamsData = [
    {
      key: "masculino",
      name: "Senior Masculino",
      category: "3ª Futgal A Coruña G3",
      image: "/teams/senior-masculino.jpg",
      staff: "Corpo Técnico A",
      squad: "22 Xogadores",
      dynamic: data.equipos.masculino
    },
    {
      key: "femenino",
      name: "Senior Feminino",
      category: "3ª División Galega Feminina",
      image: "/teams/senior-feminino.jpg",
      staff: "Corpo Técnico B",
      squad: "20 Xogadoras",
      dynamic: data.equipos.femenino
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden" id="equipos">
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
            className="font-heading font-black text-5xl md:text-7xl text-foreground uppercase tracking-tighter leading-none"
          >
            Equipos <span className="text-primary">Seniors</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teamsData.map((team, index) => {
            const lastMatch = team.dynamic?.matches?.[0];
            const isHomeCercedense = lastMatch?.home?.toUpperCase().includes("CERCEDENSE");
            const result = lastMatch?.result || (lastMatch?.status === "FIN" ? "FIN" : "PENDENTE");

            return (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative rounded-[2.5rem] overflow-hidden border border-black/5 bg-white flex flex-col h-full shadow-lg transition-all duration-700 hover:border-primary/20"
              >
                <div className="aspect-[16/10] overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-4 py-1.5 rounded-full bg-slate-100 border border-black/5 backdrop-blur-xl shadow-sm">
                      <span className="text-[8px] font-black tracking-[0.4em] text-foreground uppercase">{team.squad}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 pb-10 relative flex-1 flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-heading font-black text-3xl text-foreground uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">{team.name}</h3>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 shadow-sm">
                         <span className="text-[9px] font-black text-primary uppercase">{team.dynamic?.posicion || "-º"}</span>
                      </div>
                    </div>
                    <span className="text-foreground/30 font-black uppercase tracking-[0.3em] text-[9px] mt-2">{team.category}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-slate-50 border border-black/5">
                      <span className="text-[8px] font-black tracking-[0.3em] text-foreground/30 uppercase">Corpo Técnico</span>
                      <span className="text-[9px] font-bold text-foreground uppercase tracking-widest truncate max-w-[60%]">{team.staff}</span>
                    </div>
                  </div>

                  {/* Último Resultado Panel - Mini Elite Style */}
                  <div className="mt-auto bg-slate-50 border border-black/5 rounded-[1.8rem] p-6 relative overflow-hidden group-hover:bg-slate-100 transition-all shadow-inner">
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span className="text-foreground/40 uppercase font-black text-[8px] tracking-[0.4em]">ÚLTIMO RESULTADO</span>
                      </div>
                      <span className="text-foreground/20 uppercase font-black text-[8px] tracking-[0.4em]">{lastMatch?.date || "-"}</span>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      <div className="flex flex-col gap-2 flex-1">
                        <span className={`text-sm font-black uppercase tracking-tight ${isHomeCercedense ? 'text-foreground' : 'text-foreground/40'}`}>
                          {lastMatch?.home || "CLUB A"}
                        </span>
                        <span className={`text-sm font-black uppercase tracking-tight ${!isHomeCercedense ? 'text-foreground' : 'text-foreground/40'}`}>
                          {lastMatch?.away || "CLUB B"}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 px-4 bg-primary rounded-2xl border border-primary min-w-[70px] shadow-xl shadow-primary/20">
                        <span className="font-heading font-black text-2xl text-white tabular-nums tracking-tighter shadow-sm">{lastMatch?.score || "0-0"}</span>
                        <span className={`uppercase font-black text-[7px] tracking-[0.3em] mt-1 px-2 py-0.5 rounded-full ${
                          result.toLowerCase().includes('vitoria') ? 'bg-white/20 text-white' :
                          result.toLowerCase().includes('empate') ? 'bg-white/10 text-white/80' :
                          'bg-white/20 text-white'
                        }`}>
                          {result.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
