"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

const upcomingMatches = [
  {
    id: 1,
    team: "Senior Masculino",
    competition: "Preferente Galicia",
    home: "Cercedense",
    away: "Rival FC",
    date: "28",
    month: "Mar",
    time: "17:00H",
    location: "O Roxo",
    featured: false,
  },
  {
    id: 2,
    team: "Senior Feminino",
    competition: "Primera Galicia",
    home: "Rival CF",
    away: "Cercedense B",
    date: "29",
    month: "Mar",
    time: "12:00H",
    location: "Campo Anexo",
    featured: false,
  },
  { id: 3, team: "Juvenil", competition: "Liga Local", home: "Cercedense", away: "SD Fisterra", date: "28", month: "Mar", time: "10:30H", location: "O Roxo", featured: false },
  { id: 4, team: "Cadete", competition: "Liga Comarcal", home: "Bergantiños FC", away: "Cercedense", date: "29", month: "Mar", time: "11:00H", location: "As Eiroas", featured: false },
  { id: 5, team: "Infantil", competition: "Liga Local", home: "Cercedense", away: "Victoria CF", date: "28", month: "Mar", time: "12:15H", location: "O Roxo", featured: false },
  { id: 6, team: "Alevín", competition: "F8 A Coruña", home: "Imperátor", away: "Cercedense", date: "28", month: "Mar", time: "19:00H", location: "A Grela", featured: false },
  { id: 7, team: "Alevín B", competition: "F8 A Coruña", home: "Cercedense", away: "Sport. Coruñés", date: "29", month: "Mar", time: "10:00H", location: "O Roxo", featured: false },
  { id: 8, team: "Benjamín", competition: "F8 Comarcal", home: "Cercedense", away: "CD As Pontes", date: "28", month: "Mar", time: "16:00H", location: "O Roxo", featured: false },
  { id: 9, team: "Benjamín B", competition: "F8 Comarcal", home: "San Tirso SD", away: "Cercedense", date: "29", month: "Mar", time: "11:30H", location: "O Monte", featured: false },
  { id: 10, team: "Prebenjamín", competition: "F8 Iniciación", home: "Galicia Caranza", away: "Cercedense", date: "28", month: "Mar", time: "12:00H", location: "Caranza", featured: false },
  { id: 11, team: "Biberón", competition: "Amistoso", home: "Cercedense", away: "Atlético Arteixo", date: "29", month: "Mar", time: "16:30H", location: "O Roxo", featured: false },
];

export default function Matches() {
  return (
    <section className="py-24 bg-white min-h-[80vh] relative overflow-hidden" id="partidos">
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="fluid-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
              Calendario
            </span>
            <h2 className="font-heading font-black text-fluid-h2 text-foreground uppercase tracking-tighter">
              Próximos Partidos
            </h2>
          </div>
          <button className="text-foreground font-bold tracking-wider text-sm mt-4 md:mt-0 transition-colors hidden md:block border-b border-primary/20 hover:border-primary pb-1">
            Ver Calendario Completo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {upcomingMatches.map((match, i) => (
            <motion.div 
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${match.featured ? 'bg-primary border-primary-dark shadow-[0_20px_50px_rgba(218,41,28,0.3)]' : 'bg-white border-black/5 shadow-lg'} border rounded-sm p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
            >
              {match.featured && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 z-0" />
              )}
              
              <div className={`flex flex-col gap-1 mb-8 border-b ${match.featured ? 'border-white/20' : 'border-black/5'} pb-4 relative z-10`}>
                <span className={`${match.featured ? 'text-white' : 'text-primary'} uppercase font-black text-sm tracking-widest`}>{match.team}</span>
                <span className={`${match.featured ? 'text-white/80' : 'text-foreground/40'} uppercase font-bold text-xs tracking-widest`}>{match.competition}</span>
              </div>
              
              <div className="flex justify-between items-center gap-4 py-2 relative z-10">
                <div className="flex flex-col justify-center items-center gap-1 shrink-0">
                  <span className={`font-heading font-black text-5xl ${match.featured ? 'text-white' : 'text-foreground'}`}>{match.date}</span>
                  <span className={`uppercase font-bold text-xs tracking-widest ${match.featured ? 'text-white' : 'text-primary'}`}>{match.month}</span>
                </div>
                <div className={`h-12 w-px ${match.featured ? 'bg-white/30' : 'bg-black/5'}`} />
                <div className="flex-1 px-4 flex flex-col justify-center">
                  <h3 className={`font-heading font-black text-xl md:text-2xl ${match.featured ? 'text-white' : 'text-foreground'} uppercase tracking-tight leading-tight mb-4`}>
                    {match.home} <br/> <span className={`${match.featured ? 'text-white/60' : 'text-foreground/30'} text-lg md:text-xl`}>vs {match.away}</span>
                  </h3>
                  <div className={`flex flex-col gap-2 ${match.featured ? 'text-white' : 'text-foreground/60'} text-xs font-medium uppercase tracking-wider`}>
                    <div className="flex items-center gap-2"><Clock className={`w-4 h-4 ${match.featured ? 'text-white' : 'text-primary'}`} /> {match.time}</div>
                    <div className="flex items-center gap-2"><MapPin className={`w-4 h-4 ${match.featured ? 'text-white' : 'text-primary'}`} /> {match.location}</div>
                  </div>
                </div>
              </div>
              
              {match.featured && (
                <button className="mt-8 bg-black text-white font-heading font-bold uppercase tracking-widest py-3 w-full rounded-sm hover:bg-white hover:text-black transition-colors relative z-10 text-sm">
                  Mercar Entradas
                </button>
              )}
            </motion.div>
          ))}
        </div>
        
        <button className="w-full text-center text-foreground/40 hover:text-foreground uppercase font-bold tracking-wider text-sm mt-10 transition-colors md:hidden border-t border-black/5 pt-6 block">
          Ver Calendario Completo
        </button>
      </div>
    </section>
  );
}
