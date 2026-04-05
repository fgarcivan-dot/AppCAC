import { Instagram } from "lucide-react";
import { HomeContent } from '@/lib/dataService';

interface InstaGridProps {
  data?: HomeContent['instaGrid'];
}

const DEFAULT_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=600&h=400",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1518605368461-1e1e11400a43?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600&h=400",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1511886918991-62f9288e1467?auto=format&fit=crop&q=80&w=400&h=400",
];

export function InstaGrid({ data }: InstaGridProps) {
  // Robust Logic: Take data images, but if less than 6, pad with defaults
  const rawImages = data?.images || [];
  const imagesToShow = [...rawImages];
  
  if (imagesToShow.length < 6) {
    const needed = 6 - imagesToShow.length;
    imagesToShow.push(...DEFAULT_PLACEHOLDERS.slice(6 - needed));
  }

  // Final slice to exactly 6 for the 1-2-1-2 pattern
  const finalImages = imagesToShow.slice(0, 6);

  return (
    <div className="w-full py-16 relative overflow-hidden transition-colors duration-1000 bg-[#050505]">
      
      {/* 🌊 Background Light Leaks */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col mb-12 items-center text-center relative z-10 px-8">
        <div className="flex items-center gap-3 mb-5">
          <Instagram size={18} className="text-primary opacity-60" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white opacity-40">SOCIAL FEED</span>
        </div>
        <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.85] text-white">
          A NOSA<br />
          <span className="text-primary italic drop-shadow-[0_0_15px_rgba(218,41,28,0.3)]">XENTE</span>
        </h2>
        <p className="mt-6 text-[10px] font-black tracking-[0.3em] uppercase text-white opacity-60">
          {data?.description || "Momentos de paixón. Xogadores, afección e canteira unidos por un mesmo sentimento."}
        </p>
      </div>

      {/* 🎞️ Static Color Grid - 1-2-1-2 Layout (No links) */}
      <div className="grid grid-cols-2 gap-3 px-6 relative z-10">
        {finalImages.map((src, i) => {
          const isFullWidth = i === 0 || i === 3;
          
          return (
            <div key={i} 
               className={`group relative overflow-hidden rounded-[2rem] transition-all duration-700 border ${
                 isFullWidth ? "col-span-2 aspect-[16/9]" : "col-span-1 aspect-square"
               } border-white/5 shadow-2xl shadow-black`}>
              
              <img src={src} key={src} alt="Cercedense Instagram" className="object-cover w-full h-full group-hover:scale-105 transition-all duration-1000" loading="lazy" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 flex flex-col text-white opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-[12px] font-black tracking-tighter uppercase italic leading-none">ATLÉTICO</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] mt-1">CERCEDENSE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🏷️ Solid Dynamic CTA (Keeping link only in button) */}
      <div className="px-6 relative z-10 w-full mt-10">
        <a 
          href={data?.instagramUrl || "https://www.instagram.com/cacercedense/"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-5 w-full py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.5em] transition-all active:scale-[0.98] bg-primary text-white shadow-[0_0_30px_rgba(218,41,28,0.3)] hover:scale-[1.02]"
        >
          {data?.btnText || "INSTAGRAM OFICIAL"}
        </a>
      </div>

    </div>
  );
}
