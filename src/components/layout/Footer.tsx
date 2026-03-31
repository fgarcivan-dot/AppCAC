import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10" id="contact">
      <div className="fluid-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
                <span className="font-heading font-bold text-white text-sm uppercase italic">CAC</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tighter uppercase">Cercedense</span>
            </Link>
            <p className="text-white/60 text-sm max-w-sm mt-4">
              Club Atlético Cercedense. Formando futuro, compitiendo hoy. Más que un equipo, somos una familia unida por la pasión al fútbol.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 font-bold">
                IG
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 font-bold">
                TW
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 font-bold">
                FB
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider text-white">Ligazóns</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/equipos" className="text-white/60 hover:text-primary transition-colors text-sm">Seniors</Link>
              <Link href="/escuelas" className="text-white/60 hover:text-primary transition-colors text-sm">Escolas de Fútbol</Link>
              <Link href="/noticias" className="text-white/60 hover:text-primary transition-colors text-sm">Novas</Link>
              <Link href="/#socios" className="text-white/60 hover:text-primary transition-colors text-sm">Faite Socio</Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider text-white">Contacto</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <p>O Roxo, Cerceda, <br />Galicia, España</p>
              </div>
              <p className="text-white/60 text-sm">c.a.cercedense@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-xs">
          <p>&copy; {new Date().getFullYear()} Club Atlético Cercedense. Todos os dereitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos de Servizo</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
