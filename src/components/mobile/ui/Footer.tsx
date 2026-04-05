import { Mail, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from "lucide-react";

interface FooterProps {
  theme: 'day' | 'night';
}

export function Footer({ theme }: FooterProps) {
  const isDay = theme === 'day';
  
  return (
    <footer className={`w-full pt-32 pb-40 px-10 relative overflow-hidden transition-colors duration-1000 ${
      isDay ? 'bg-slate-50' : 'bg-[#050505]'
    }`}>
      
      {/* 🏙️ Cinematic Architectural Watermark - Refined Size */}
      <div className={`absolute left-1/2 -translate-x-1/2 top-4 w-full flex justify-center pointer-events-none select-none opacity-[0.03] transition-colors duration-1000 font-black italic tracking-tighter ${
        isDay ? 'text-black' : 'text-white'
      }`}>
        <span className="text-[100px] leading-none whitespace-nowrap">CERCEDENSE</span>
      </div>

      <div className="relative z-10 flex flex-col gap-20">
        
        {/* Info Stack - Architectural Minimal */}
        <div className="flex flex-col gap-14">
          
          <div className="flex flex-col gap-6 group">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-4 bg-primary" />
              <span className={`text-[9px] font-black uppercase tracking-[0.5em] transition-colors duration-1000 ${isDay ? 'text-slate-400' : 'text-white/20'}`}>CONTACTO</span>
            </div>
            <a href="mailto:clubatleticocercedense@gmail.com" className={`text-xl font-black uppercase tracking-tighter transition-all duration-500 hover:text-primary ${
              isDay ? 'text-slate-900 border-b-2 border-slate-200' : 'text-white border-b-2 border-white/5'
            }`}>
              CA.CERCEDENSE
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-4 bg-primary" />
              <span className={`text-[9px] font-black uppercase tracking-[0.5em] transition-colors duration-1000 ${isDay ? 'text-slate-400' : 'text-white/20'}`}>SEDE OFICIAL</span>
            </div>
            <p className={`text-xl font-black uppercase tracking-tighter leading-tight transition-colors duration-1000 ${isDay ? 'text-slate-900' : 'text-white'}`}>
              CAMPO O ROXO<br/>
              CERCEDA, A CORUÑA
            </p>
          </div>

        </div>

        {/* Minimal Float Social */}
        <div className="flex items-center gap-10 pt-12">
          {[
            { icon: <Instagram size={24} />, link: "https://instagram.com/atleticocercedense" },
            { icon: <Twitter size={24} />, link: "https://twitter.com/atleticocercedense" },
            { icon: <Facebook size={24} />, link: "https://facebook.com/atleticocercedense" }
          ].map((social, i) => (
            <a 
              key={i} 
              href={social.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-all duration-500 hover:scale-125 hover:text-primary ${isDay ? 'text-slate-900 opacity-20 hover:opacity-100' : 'text-white opacity-20 hover:opacity-100'}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Final Elite Closure - Refined Spacing */}
        <div className="flex flex-col items-center gap-6 mt-16">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary opacity-20" />
            <span className={`text-[9px] font-black uppercase tracking-[1em] transition-colors duration-1000 ${isDay ? 'text-black' : 'text-white'}`}>CERCEDENSE</span>
          </div>
          <p className={`text-[9px] font-thin tracking-widest uppercase text-center w-full transition-colors duration-1000 ${
            isDay ? 'text-slate-300' : 'text-white/10'
          }`}>
            © 2025 CLUB ATLÉTICO CERCEDENSE
          </p>
        </div>

      </div>
    </footer>
  );
}
