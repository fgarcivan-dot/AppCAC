import { Ticket, ShoppingBag, Users } from "lucide-react";
import { HomeContent } from '@/lib/dataService';

interface MembershipBannerProps {
  theme: 'day' | 'night';
  data?: HomeContent['membership'];
}

export function MembershipBanner({ theme, data }: MembershipBannerProps) {
  const isDay = theme === 'day';
  return (
    <div className="w-full flex flex-col items-center mt-6 mb-16 px-4">
      {/* Main Section Title (matching A Nosa Xente) */}
      <div className="w-full flex flex-col items-center text-center mt-2 mb-6">
        <h2 className={`text-4xl font-black tracking-tighter uppercase transition-colors duration-1000 ${
          isDay ? 'text-slate-900' : 'text-white'
        }`}>
          {data?.mainTitleLine1 || "FAITE"}<br /><span className="text-primary tracking-normal">{data?.mainTitleHighlight || "SOCIO"}</span>
        </h2>
      </div>

      <div className={`w-full max-w-[100%] lg:max-w-md mx-auto relative overflow-hidden flex flex-col items-center px-6 py-10 rounded-[2.5rem] backdrop-blur-3xl shadow-xl transition-all duration-1000 ${
        isDay ? 'bg-white border border-primary/10 shadow-[0_10px_30px_-15px_rgba(218,41,28,0.1)]' : 'bg-[#050505] border border-white/5 shadow-2xl'
      }`}>
      {/* Background Accent */}
      <div
        className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000"
        style={{
          background: isDay ? 'rgba(218, 41, 28, 0.1)' : 'rgba(218, 41, 28, 0.2)'
        }}
      />
      
      <p className={`relative z-10 text-sm md:text-base text-center font-medium leading-relaxed mb-8 ${
        isDay ? 'text-slate-600' : 'text-slate-400'
      }`}>
        {data?.description ? data.description.split('\\n').map((line: string, i: number) => <span key={i}>{line}<br /></span>) : (
          <>
            Máis ca un club, somos unha comunidade. Facerse socio significa apoiar aos nosos equipos, dende o prebenxamín ata o primeiro equipo. 
            <br/><br/>
            As túas cores, o teu escudo, a túa xente.
          </>
        )}
      </p>

      {/* Benefits */}
      <div className="w-full flex flex-col gap-4 mb-8 relative z-10">
        <div className={`flex items-center gap-4 p-4 rounded-2xl ${isDay ? 'bg-white border border-primary/5 shadow-sm' : 'bg-black border border-white/5'}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            <Ticket size={18} />
          </div>
          <span className={`text-[13px] md:text-sm font-semibold tracking-wide ${isDay ? 'text-slate-800' : 'text-white/90'}`}>{data?.benefit1 || "Acceso a todos os partidos na casa"}</span>
        </div>
        
        <div className={`flex items-center gap-4 p-4 rounded-2xl ${isDay ? 'bg-white border border-primary/5 shadow-sm' : 'bg-black border border-white/5'}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            <ShoppingBag size={18} />
          </div>
          <span className={`text-[13px] md:text-sm font-semibold tracking-wide ${isDay ? 'text-slate-800' : 'text-white/90'}`}>{data?.benefit2 || "Descontos en merchandising oficial"}</span>
        </div>

        <div className={`flex items-center gap-4 p-4 rounded-2xl ${isDay ? 'bg-white border border-primary/5 shadow-sm' : 'bg-black border border-white/5'}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            <Users size={18} />
          </div>
          <span className={`text-[13px] md:text-sm font-semibold tracking-wide ${isDay ? 'text-slate-800' : 'text-white/90'}`}>{data?.benefit3 || "Voz e voto nas asembleas do club"}</span>
        </div>
      </div>

      {/* Button CTA */}
      <a 
        href={data?.btnLink || "/contacto"}
        className="relative z-10 w-full flex items-center justify-center gap-2 py-4 rounded-full bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(218,41,28,0.4)] hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all"
      >
        <span>{data?.btnText || "Solicitar Alta"}</span>
      </a>
      
      <p className="relative z-10 text-[10px] font-medium tracking-wide opacity-50 text-foreground mt-6 uppercase text-center w-full mt-6">
        {data?.footerNote || "Tamén dispoñemos de abono familiar e xubilado."}
      </p>
    </div>
    </div>
  );
}
