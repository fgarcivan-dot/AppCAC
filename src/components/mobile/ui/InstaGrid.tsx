import { Instagram } from "lucide-react";
import { HomeContent } from '@/lib/dataService';

interface InstaGridProps {
  theme: 'day' | 'night';
  data?: HomeContent['instaGrid'];
}

const INSTA_IMAGES = [
  "https://images.unsplash.com/photo-1518605368461-1e1e11400a43?auto=format&fit=crop&q=80&w=400&h=400", // celebration
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400&h=400", // players on field
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=400&h=400", // stadium / fans
  "https://images.unsplash.com/photo-1628891435222-06592ce293c3?auto=format&fit=crop&q=80&w=400&h=400", // grass / boots
  "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=400&h=400", // soccer ball
  "https://images.unsplash.com/photo-1620242203719-2169ab7bcbb0?auto=format&fit=crop&q=80&w=400&h=400"  // pitch wide
];

export function InstaGrid({ theme, data }: InstaGridProps) {
  return (
    <div className="w-full flex lg:max-w-md mx-auto flex-col items-center mt-2 mb-8 px-4">
      {/* Title block */}
      <div className="w-full flex flex-col items-center text-center mt-6 mb-4">
        <h2 className={`text-4xl font-black tracking-tighter uppercase transition-colors duration-1000 ${
          theme === 'day' ? 'text-slate-900' : 'text-white'
        }`}>
          {data?.title1 || "A NOSA"}<br /><span className="text-primary tracking-normal">{data?.title2Highlight || "XENTE"}</span>
        </h2>
      </div>

      <p className={`w-full text-center text-sm font-medium mb-6 leading-relaxed ${
        theme === 'day' ? 'text-slate-800' : 'text-white/70'
      }`}>
        {data?.description || "Momentos de paixón. Xogadores, afección e canteira unidos por un mesmo sentimento."}
      </p>

      {/* Grid estilo Bento (Fotos Mixtas) */}
      <div className="grid grid-cols-2 gap-3 w-full mb-6 relative">
        {(data?.images?.length === 6 ? data.images : INSTA_IMAGES).map((src, i) => {
          // Diseño Mosaico: La foto 0 y la 3 serán gigantes y horizontales. Las demás serán pequeñas / verticales.
          const isWide = i === 0 || i === 3;
          
          return (
          <a key={i} href={data?.instagramUrl || "https://www.instagram.com/clubatleticocercedense/"} target="_blank" rel="noopener noreferrer" 
             className={`relative overflow-hidden rounded-3xl bg-[#0a0a0a] shadow-md border border-white/5 active:scale-95 transition-all group ${
               isWide ? "col-span-2 aspect-[16/9]" : "col-span-1 aspect-[4/5]"
             }`}>
            <img src={src} key={i} alt={`Cercedense Instagram ${i+1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            
            <div className="absolute top-3 right-3 text-white/50 group-hover:text-white transition-opacity">
              <Instagram size={14} />
            </div>

            {/* Overlay Text */}
            <div className="absolute bottom-4 left-4 flex flex-col text-white">
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.3em] opacity-80" style={{ fontFamily: 'NeueMontreal' }}>
                Club Atlético
              </span>
              <span className="text-xl sm:text-2xl uppercase tracking-tighter leading-none mt-1" style={{ fontFamily: 'Quakerhack' }}>
                Cercedense
              </span>
            </div>
          </a>
          );
        })}
      </div>

      <a 
        href={data?.instagramUrl || "https://www.instagram.com/cacercedense/"}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-3 w-full py-4 rounded-[1.5rem] font-bold uppercase tracking-widest transition-all active:scale-95 ${
          theme === 'day' 
            ? 'bg-white text-slate-900 border border-primary/20 hover:border-primary shadow-sm' 
            : 'bg-[#050505] text-white border border-primary/20 hover:border-primary shadow-2xl'
        }`}
      >
        <Instagram size={18} />
        {data?.btnText || "Ver Instagram Oficial"}
      </a>
    </div>
  );
}
