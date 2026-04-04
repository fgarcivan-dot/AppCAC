import { ArrowRight, Activity, Brain, Shield, Crosshair } from 'lucide-react';
import Link from 'next/link';
import { HomeContent } from '@/lib/dataService';

interface EscolasSectionProps {
  theme: 'day' | 'night';
  data?: HomeContent['escolas'];
}

export function EscolasSection({ theme, data }: EscolasSectionProps) {
  const isDay = theme === 'day';

  return (
    <div className="w-full flex flex-col items-center mt-6 mb-12 px-4 z-10">
      {/* Main Section Title (matching A Nosa Xente) */}
      <div className="w-full flex flex-col items-center text-center mt-2 mb-6">
        <h2 className={`text-4xl font-black tracking-tighter uppercase transition-colors duration-1000 ${isDay ? 'text-slate-900' : 'text-white'
          }`}>
          {data?.headerTitleLine1 || "A NOSA"}<br /><span className="text-primary tracking-normal">{data?.headerTitleHighlight || "CANTEIRA"}</span>
        </h2>
      </div>

      {/* Canteira Header Block */}
      <div className={`w-full p-6 rounded-[2rem] backdrop-blur-3xl shadow-lg border transition-all duration-1000 mb-6 flex flex-col items-center text-center ${isDay ? 'bg-white border-primary/10 shadow-[0_10px_30px_-15px_rgba(218,41,28,0.1)]' : 'bg-black border-white/5 shadow-2xl'
        }`}>

        <h3 className={`text-[20px] sm:text-2xl font-extrabold uppercase tracking-widest mb-4 leading-snug ${isDay ? 'text-slate-900' : 'text-white'
          }`} style={{ fontFamily: 'NeueMontreal' }}>
          {data?.title ? data.title.split('\\n').map((line: string, i: number) => <span key={i}>{line}<br /></span>) : (
            <>Escolas de Fútbol<br />Concello de Cerceda</>
          )}
        </h3>

        <p className={`text-sm font-medium leading-relaxed mb-6 ${isDay ? 'text-slate-600' : 'text-slate-400'
          }`}>
          {data?.description || "O noso maior orgullo é ver medrar ás futuras promesas. Categorías dedicadas á formación integral, onde os valores son tan importantes como os resultados no terreo de xogo."}
        </p>

        <Link href={data?.btnLink || "/resultados?tab=canteira"} passHref>
          <div className={`mt-2 flex w-full items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${isDay ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-white/5 text-white/90 border border-white/10'
            }`}>
            {data?.btnText || "Ver Resultados da Canteira"} <ArrowRight size={14} />
          </div>
        </Link>
      </div>

      {/* Modelo Formativo Grid (Bento Box) */}
      <div className="w-full mb-6 flex flex-col items-center text-center">
        <h4 className={`text-[10px] uppercase font-bold tracking-[0.4em] mb-4 px-2 ${isDay ? 'text-slate-600' : 'text-slate-400'}`} style={{ fontFamily: 'NeueMontreal' }}>{data?.modeloFormativoTitle || "O Noso Modelo Formativo"}</h4>
        <div className="grid grid-cols-2 gap-3">

          {/* Tecnificación */}
          <div className={`p-4 rounded-[1.5rem] flex flex-col items-center text-center border transition-all duration-1000 ${isDay ? 'bg-white border-primary/5 shadow-sm hover:border-primary/20' : 'bg-[#050505] border-white/5 hover:border-primary/20'
            }`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Crosshair size={14} />
            </div>
            <h5 className={`font-extrabold text-[11px] mb-1 tracking-widest uppercase ${isDay ? 'text-slate-900' : 'text-white'}`} style={{ fontFamily: 'NeueMontreal' }}>{data?.tecnificacion?.title || "Tecnificación"}</h5>
            <p className={`text-[10px] leading-snug font-medium ${isDay ? 'text-slate-600' : 'text-slate-500'}`}>{data?.tecnificacion?.desc || "Fomento de habilidades individuais en cada etapa de crecemento."}</p>
          </div>

          {/* Metodoloxía */}
          <div className={`p-4 rounded-[1.5rem] flex flex-col items-center text-center border transition-all duration-1000 ${isDay ? 'bg-white border-primary/5 shadow-sm hover:border-primary/20' : 'bg-[#050505] border-white/5 hover:border-primary/20'
            }`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Brain size={14} />
            </div>
            <h5 className={`font-extrabold text-[11px] mb-1 tracking-widest uppercase ${isDay ? 'text-slate-900' : 'text-white'}`} style={{ fontFamily: 'NeueMontreal' }}>{data?.metodoloxia?.title || "Metodoloxía"}</h5>
            <p className={`text-[10px] leading-snug font-medium ${isDay ? 'text-slate-600' : 'text-slate-500'}`}>{data?.metodoloxia?.desc || "Sistema de traballo cohesionado para unha evolución progresiva."}</p>
          </div>

          {/* Área CAFYD */}
          <div className={`p-4 rounded-[1.5rem] flex flex-col items-center text-center border transition-all duration-1000 ${isDay ? 'bg-white border-primary/5 shadow-sm hover:border-primary/20' : 'bg-[#050505] border-white/5 hover:border-primary/20'
            }`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Activity size={14} />
            </div>
            <h5 className={`font-extrabold text-[11px] mb-1 tracking-widest uppercase ${isDay ? 'text-slate-900' : 'text-white'}`} style={{ fontFamily: 'NeueMontreal' }}>{data?.cafyd?.title || "Área CAFYD"}</h5>
            <p className={`text-[10px] leading-snug font-medium ${isDay ? 'text-slate-600' : 'text-slate-500'}`}>{data?.cafyd?.desc || "Preparación física supervisada por licenciados profesionais."}</p>
          </div>

          {/* Dirección */}
          <div className={`p-4 rounded-[1.5rem] flex flex-col items-center text-center border transition-all duration-1000 ${isDay ? 'bg-white border-primary/5 shadow-sm hover:border-primary/20' : 'bg-[#050505] border-white/5 hover:border-primary/20'
            }`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Shield size={14} />
            </div>
            <h5 className={`font-extrabold text-[11px] mb-1 tracking-widest uppercase ${isDay ? 'text-slate-900' : 'text-white'}`} style={{ fontFamily: 'NeueMontreal' }}>{data?.direccion?.title || "Dirección"}</h5>
            <p className={`text-[10px] leading-snug font-medium ${isDay ? 'text-slate-600' : 'text-slate-500'}`}>{data?.direccion?.desc || "Supervisión da área técnica e seguimento de cada categoría."}</p>
          </div>

        </div>
      </div>

      {/* Join Canteira CTA (Hero Photo Card) */}
      <Link href={data?.uneteLink || "/contacto"} className="w-full relative rounded-[2.5rem] overflow-hidden aspect-[4/3] sm:aspect-video flex items-end p-6 active:scale-[98%] transition-transform shadow-[0_15px_40px_-15px_rgba(218,41,28,0.3)] border border-white/10 group">

        {/* Background Image */}
        <img
          src={data?.uneteImage || "https://images.unsplash.com/photo-1518605368461-1e1e11400a43?auto=format&fit=crop&q=80&w=800&h=600"}
          alt="Únete á Canteira"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col w-full">
          <h4 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-3 text-white drop-shadow-md">
            ÚNETE Á<br /><span className="text-primary tracking-normal drop-shadow-[0_0_20px_rgba(218,41,28,0.8)]">CANTEIRA</span>
          </h4>

          <div className="flex items-center justify-between w-full">
            <p className="text-xs sm:text-sm font-medium text-white/90 max-w-[70%]">
              {data?.uneteDesc || "Inscricións abertas para xogadores do prebenxamín ao xuvenil."}
            </p>

            <div className="min-w-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(218,41,28,0.6)]">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </Link>

    </div>
  );
}
