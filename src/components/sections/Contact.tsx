"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-24 bg-[#050505]" id="contacto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              ¿Tienes dudas?
            </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading font-black text-5xl md:text-6xl text-white uppercase tracking-tighter mb-4"
              >
                Ponte en <span className="text-primary">Contacto</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white text-lg font-light leading-relaxed mb-12 opacity-70" // Added mb-12 to match original spacing
              >
                Tes algunha dúbida, queres inscribir ao teu fillo/a ou desexas colaborar co club? Escríbenos e responderemos o antes posible.
              </motion.p>
            
            <div className="flex flex-col gap-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="w-14 h-14 bg-[#0a0a0a] border border-white/10 rounded-sm flex flex-shrink-0 items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-heading font-bold uppercase tracking-wider text-xl mb-2">Dirección</h4>
                  <p className="text-white leading-relaxed font-light text-lg opacity-60">Campo de Fútbol O Roxo<br/>Cerceda, A Coruña, Galicia</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-6"
              >
                <div className="w-14 h-14 bg-[#0a0a0a] border border-white/10 rounded-sm flex flex-shrink-0 items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-heading font-bold uppercase tracking-wider text-xl mb-2">Email</h4>
                  <p className="text-white leading-relaxed font-light text-lg break-all opacity-60">info@clubatleticocercedense.es</p>
                </div>
              </motion.div>

              {/* Added Social Media Section */}
              <div className="pt-8 border-t border-white/10">
                  <h4 className="font-heading font-bold text-white uppercase tracking-wider mb-4">Séguenos</h4>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-all">Instagram</a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-all">Twitter</a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-all">Facebook</a>
                  </div>
                </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm shadow-xl" // Kept original styling for consistency
          >
            <h3 className="font-heading font-bold text-3xl text-white uppercase mb-8">Envíanos unha mensaxe</h3> {/* Updated text */}
            <form className="flex flex-col gap-5"> {/* Kept original gap-5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> {/* Kept original gap-5 */}
                <div> {/* Added div for label */}
                    <label className="block text-white/50 uppercase tracking-widest text-xs font-bold mb-2">Nome</label> {/* Added label */}
                    <input 
                      type="text" 
                      placeholder="O teu nome completo" // Updated placeholder
                      className="bg-[#050505] border border-white/10 text-white px-5 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary w-full" // Kept original styling
                    />
                </div>
                <div> {/* Added div for label */}
                    <label className="block text-white/50 uppercase tracking-widest text-xs font-bold mb-2">Correo Electrónico</label> {/* Added label */}
                    <input 
                      type="email" 
                      placeholder="ti@email.com" // Updated placeholder
                      className="bg-[#050505] border border-white/10 text-white px-5 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary w-full" // Kept original styling
                    />
                </div>
              </div>
              <div> {/* Added div for label */}
                <label className="block text-white/50 uppercase tracking-widest text-xs font-bold mb-2">Asunto</label> {/* Added label */}
                <input 
                  type="text" 
                  placeholder="Sobre que nos escribes?" // Updated placeholder
                  className="bg-[#050505] border border-white/10 text-white px-5 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary w-full" // Kept original styling
                />
              </div>
              <div> {/* Added div for label */}
                <label className="block text-white/50 uppercase tracking-widest text-xs font-bold mb-2">Mensaxe</label> {/* Added label */}
                <textarea 
                  placeholder="Escribe a túa mensaxe aquí..." // Updated placeholder
                  rows={5}
                  className="bg-[#050505] border border-white/10 text-white px-5 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary w-full resize-none" // Kept original styling
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full group flex items-center justify-center gap-2 bg-primary text-white py-5 font-heading font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-colors text-lg mt-4" // Adjusted styling to match new button, kept original mt-4
              >
                Enviar Mensaxe {/* Updated text */}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> {/* Added Send icon */}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
