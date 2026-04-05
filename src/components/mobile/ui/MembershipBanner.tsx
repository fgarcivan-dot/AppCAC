import { Ticket, ShoppingBag, Users, Zap } from "lucide-react";
import { HomeContent } from '@/lib/dataService';

interface MembershipBannerProps {
  theme: 'day' | 'night';
  data?: HomeContent['membership'];
}

export function MembershipBanner({ theme, data }: MembershipBannerProps) {
  const isDay = theme === 'day';
  
  return (
    <div className={`w-full relative py-16 px-6 transition-colors duration-1000 ${
      isDay ? 'bg-slate-50' : 'bg-[#020202]'
    }`}>
      
      {/* 🔮 Cinematic Moving Light Streaks */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" />

      <div className={`relative z-10 w-full rounded-[3rem] overflow-hidden transition-all duration-1000 shadow-2xl border ${
        isDay 
          ? 'bg-white border-white' 
          : 'bg-[#0a0a0a] border-white/5'
      }`}>
        
        {/* Holographic Header Background */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-40 animate-pulse" />
        
        <div className="p-10 relative z-10">
          {/* Header */}
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-center gap-3">
              <Zap size={12} className="text-secondary fill-secondary animate-pulse" />
              <span className={`text-[9px] font-black tracking-[0.5em] uppercase ${isDay ? 'text-slate-400' : 'text-white/20'}`}>
                CAC ELITE PASS
              </span>
            </div>
            <h2 className={`text-5xl font-black tracking-tighter uppercase leading-[0.8] transition-colors duration-1000 ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}>
              {data?.mainTitleLine1 || "FAITE"}<br />
              <span className="text-primary italic tracking-normal drop-shadow-[0_0_15px_rgba(218,41,28,0.3)]">{data?.mainTitleHighlight || "SOCIO"}</span>
            </h2>
          </div>

          {/* Cinematic Benefits Flow - Refined Spacing */}
          <div className="flex flex-col gap-3 mb-12">
            {[
              { icon: <Ticket size={18} />, text: data?.benefit1 || "Entrada libre partidos" },
              { icon: <ShoppingBag size={18} />, text: data?.benefit2 || "15% Desconto Tenda" },
              { icon: <Users size={18} />, text: data?.benefit3 || "Voz e Voto Activo" }
            ].map((benefit, i) => (
              <div key={i} className={`flex items-center gap-6 p-5 rounded-[1.8rem] border transition-all duration-500 group ${
                isDay ? 'bg-slate-50 border-slate-100 hover:border-primary/10' : 'bg-white/5 border-white/5 hover:border-primary/10'
              }`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform bg-primary/5">
                  {benefit.icon}
                </div>
                <span className={`text-[12px] font-black uppercase tracking-widest transition-colors duration-500 ${isDay ? 'text-slate-800' : 'text-white'}`}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* Luxury Action Button - Refined Size */}
          <a 
            href={data?.btnLink || "/contacto"}
            className={`flex items-center justify-center gap-5 w-full py-6 rounded-[1.8rem] font-black uppercase text-[10px] tracking-[0.5em] transition-all active:scale-[0.98] ${
              isDay 
                ? 'bg-slate-900 text-white shadow-xl hover:bg-primary' 
                : 'bg-primary text-white shadow-[0_0_40px_rgba(218,41,28,0.3)] hover:bg-white hover:text-black'
            }`}
          >
            {data?.btnText || "INSCRICIÓN DIRECTA" }
          </a>

        </div>
      </div>
    </div>
  );
}
