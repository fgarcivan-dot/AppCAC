import { Target, Database, Activity, Trophy } from "lucide-react";
import { HomeContent } from '@/lib/dataService';
import { cn } from "@/lib/utils";

interface EscolasSectionProps {
  data?: HomeContent['escolas'];
}

export function EscolasSection({ data }: EscolasSectionProps) {
  const FEATURES = [
    { 
      icon: <Target size={24} />, 
      title: "TECNIFICACIÓN", 
      subtitle: "PROGRAMA DE DESENROLO E TECNIFICACIÓN DE XOGADORES",
      desc: "Fomento de habilidades técnicas individuais adaptadas a cada etapa do crecemento deportivo profundo."
    },
    { 
      icon: <Database size={24} />, 
      title: "METODOLOXÍA", 
      subtitle: "METODOLOXÍA DE ADESTRAAAMENTO PROPIA",
      desc: "Sistema de traballo cohesionado en todas as categorías para unha evolución progresiva e sólida."
    },
    { 
      icon: <Activity size={24} />, 
      title: "ÁREA CAFYD", 
      subtitle: "POTENCIACIÓN DO FÍSICO",
      desc: "Preparación física especializada e prevención de lesións supervisada por licenciados en CAFYD."
    },
    { 
      icon: <Trophy size={24} />, 
      title: "DIRECCIÓN", 
      subtitle: "DIRECCIÓN DEPORTIVA PROFESIONAL",
      desc: "Supervisión profesional do equipo técnico e seguimento individualizado de cada alumno e categoría."
    }
  ];

  return (
    <div className="w-full py-20 px-6 bg-white border-t border-black/5 relative overflow-hidden">
      
      {/* 🏛️ Header - App-Synced Color Scheme */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        
        {/* Main Title - App Standard Typography */}
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.85] text-slate-950">
            ESCOLAS DE <br />
            <span className="text-primary tracking-norm block mt-1">FÚTBOL</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mt-4">
            CONCELLO DE CERCEDA
          </p>
        </div>
        
        {/* Cinematic Badge Integration - App Mode */}
        <div className="relative h-[240px] w-full flex items-center justify-center mt-[-80px] pointer-events-none">
          <img 
            src="/images/escolas_concello_logo.png" 
            alt="Cerceda Badge" 
            className="h-[240px] max-w-full w-auto object-contain transition-all duration-1000 opacity-90"
          />
        </div>

        <p className="-mt-8 text-[11px] font-bold tracking-[0.2em] uppercase leading-relaxed max-w-[320px] mx-auto text-slate-400">
          FORMACIÓN DE FUTURAS PROMESAS <br /> VALORES • DEPORTE • ELITE
        </p>

      </div>

      {/* Categories Grid - Light Mode Adaptation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full relative z-10">
        {FEATURES.map((item, i) => (
          <div 
            key={i} 
            className={cn(
              "relative bg-white border border-black/5 p-8 rounded-[2rem] transition-all duration-500 group active:scale-[0.98] overflow-hidden shadow-sm flex flex-col",
              "hover:border-primary/20 hover:bg-slate-50/50"
            )}
          >
            {/* 🚩 Feature Icon - Compact Standard block */}
            <div className="relative w-10 h-10 flex items-center justify-center mb-6 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {item.icon}
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Title - Compact App Black */}
              <h3 className="font-black text-xl uppercase tracking-tighter text-slate-950 leading-none">
                {item.title}
              </h3>

              {/* Subtitle - Club Red */}
              <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-snug">
                {item.subtitle}
              </p>

              {/* Description - Standard App Gray */}
              <p className="text-[12px] font-medium leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
