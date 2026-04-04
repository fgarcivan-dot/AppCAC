"use client";

import { SeasonStats } from "@/components/mobile/sections/SeasonStats";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { useContent } from "@/components/mobile/layout/ContentProvider";
import { ProResultCard } from "@/components/mobile/ui/ProResultCard";

export default function Resultados() {
  const { theme } = useTheme();
  const { data, loading } = useContent();

  if (loading) return <div className="h-screen flex items-center justify-center bg-black"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const resData = data.resultados;
  const config = data.config;

  if (!resData) return null;

  const maleResults = resData.lista.filter(r => r.category === "SENIOR MASCULINO");
  const femaleResults = resData.lista.filter(r => r.category === "SENIOR FEMININO");
  const canteiraResults = resData.lista.filter(r => !r.category.includes("SENIOR"));

  const maleResult = maleResults[0];
  const femaleResult = femaleResults[0];

  return (
    <div className={`flex flex-col gap-8 p-6 animate-in fade-in duration-700 transition-colors duration-1000 ${
      theme === 'day' ? 'bg-slate-200 text-slate-900' : 'bg-black text-white'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className={`text-4xl font-black tracking-tighter uppercase italic transition-colors duration-1000 ${
           theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>
          ÚLTIMA<br /><span className="text-primary tracking-norm">XORNADA</span>
        </h1>
        <div className="flex flex-col items-end text-right">
          <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/40'
          }`}>
            {config?.temporada || "TEMP. 24/25"}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-300' : 'text-white/20'
          }`}>
            {config?.mesResultados || "MARZO 2025"}
          </span>
        </div>
      </header>

      {/* Senior Section */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <span className={`text-[10px] font-black tracking-[0.5em] uppercase transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/40'
          }`}>SÉNIOR</span>
          <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-300' : 'bg-white/5'}`} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Masculino */}
          <div className="flex flex-col gap-3">
             {maleResult && (
                <ProResultCard
                  home={maleResult.home}
                  away={maleResult.away}
                  score={maleResult.score}
                  date={maleResult.date}
                  time={maleResult.time}
                  venue={maleResult.venue}
                  category="SENIOR MASCULINO"
                  result={maleResult.result as "VITORIA" | "DERROTA" | "EMPATE"}
                  status={maleResult.status}
                  index={0}
                  theme={theme}
                />
             )}
             <SeasonStats 
                wins={resData.balanceMasculino.victorias} 
                draws={resData.balanceMasculino.empates} 
                losses={resData.balanceMasculino.derrotas} 
                theme={theme}
             />
          </div>

          {/* Femenino */}
          <div className="flex flex-col gap-3">
             {femaleResult && (
                <ProResultCard
                  home={femaleResult.home}
                  away={femaleResult.away}
                  score={femaleResult.score}
                  date={femaleResult.date}
                  time={femaleResult.time}
                  venue={femaleResult.venue}
                  category="SENIOR FEMININO"
                  result={femaleResult.result as "VITORIA" | "DERROTA" | "EMPATE"}
                  status={femaleResult.status}
                  index={1}
                  theme={theme}
                />
             )}
             <SeasonStats 
                wins={resData.balanceFemenino.victorias} 
                draws={resData.balanceFemenino.empates} 
                losses={resData.balanceFemenino.derrotas} 
                theme={theme}
             />
          </div>
        </div>
      </section>

      {/* Canteira Section */}
      <section className="flex flex-col gap-6 pb-20">
        <div className="flex items-center gap-3 px-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <span className={`text-[10px] font-black tracking-[0.5em] uppercase transition-colors duration-1000 ${
            theme === 'day' ? 'text-slate-400' : 'text-white/40'
          }`}>CANTEIRA</span>
          <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-300' : 'bg-white/5'}`} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {canteiraResults.map((res, idx) => (
            <ProResultCard
                key={res.id}
                home={res.home}
                away={res.away}
                score={res.score}
                date={res.date}
                time={res.time}
                venue={res.venue}
                category={res.category}
                result={res.result as "VITORIA" | "DERROTA" | "EMPATE"}
                status={res.status}
                index={idx}
                theme={theme}
              />
          ))}
        </div>
      </section>
    </div>
  );
}
