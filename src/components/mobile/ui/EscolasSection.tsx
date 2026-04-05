import { GraduationCap, Shield, Users, Trophy } from "lucide-react";
import { HomeContent } from '@/lib/dataService';

interface EscolasSectionProps {
  data?: HomeContent['escolas'];
}

export function EscolasSection({ data }: EscolasSectionProps) {
  const FEATURES = [
    { 
      icon: <GraduationCap size={28} />, 
      title: data?.tecnificacion?.title || "Tecnificación", 
      desc: data?.tecnificacion?.desc || "Desenvolvemento deportivo e persoal dende os 4 anos.",
      span: "col-span-1"
    },
    { 
      icon: <Shield size={28} />, 
      title: data?.metodoloxia?.title || "Método", 
      desc: data?.metodoloxia?.desc || "Respecto e esforzo.",
      span: "col-span-1"
    },
    { 
      icon: <Users size={28} />, 
      title: data?.cafyd?.title || "Staff", 
      desc: data?.cafyd?.desc || "Dirección Elite.",
      span: "col-span-1"
    },
    { 
      icon: <Trophy size={28} />, 
      title: data?.direccion?.title || "Ligas", 
      desc: data?.direccion?.desc || "Competición autonómica.",
      span: "col-span-1"
    }
  ];

  return (
    <div className="w-full py-14 px-6 transition-colors duration-1000 relative overflow-hidden bg-[#050505]">
      
      {/* Cinematic Aura */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 🏛️ Official Header Structure - Scaling Up */}
      <div className="flex flex-col items-center text-center mb-12 relative z-10">
        
        {/* Main Title - Impactful Typography */}
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none mb-3 text-white">
          ESCOLAS DE<br />
          <span className="text-primary italic drop-shadow-[0_0_15px_rgba(218,41,28,0.3)]">FÚTBOL</span>
        </h2>
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white opacity-40">
          CONCELLO DE CERCEDA
        </span>

        {/* Cinematic Badge Integration */}
        <div className="relative h-[280px] w-full flex items-center justify-center mt-[-100px] pointer-events-none">
          <img 
            src="/images/escolas_concello_logo.png" 
            alt="Cerceda Badge" 
            className="h-[280px] max-w-full w-auto object-contain transition-all duration-1000 opacity-90 brightness-110 contrast-125"
          />
        </div>

        <p className="-mt-10 text-[10px] font-black tracking-[0.3em] uppercase leading-relaxed max-w-[320px] mx-auto transition-colors duration-1000 text-white opacity-60">
          O noso maior orgullo é ver medrar ás futuras promesas. Nove categorías dedicadas á formación integral, onde los valores son tan importantes como los resultados no terreo de xogo.
        </p>

      </div>

      {/* Categories Grid - 2 High-End Vertical Cards */}
      <div className="grid grid-cols-2 gap-4 w-full relative z-10">
        {FEATURES.map((item, i) => (
          <div key={i} className={`p-5 rounded-[1.8rem] flex flex-col gap-4 border transition-all duration-500 group active:scale-95 ${item.span} bg-white/5 border-white/5 hover:border-primary/30 shadow-2xl shadow-black`}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-white">
              {item.icon}
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-[15px] font-black uppercase tracking-tight transition-colors duration-500 text-white">
                {item.title}
              </h3>
              <p className="text-[10px] font-black leading-relaxed transition-colors duration-1000 text-white opacity-40 uppercase tracking-widest">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
