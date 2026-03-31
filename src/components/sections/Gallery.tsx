"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg"
];

export default function Gallery() {
  return (
    <section className="py-24 bg-background" id="galeria">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex flex-col items-center gap-6"
          >
            <div className="text-center">
              <h2 className="font-heading font-black text-5xl md:text-6xl text-white uppercase tracking-tighter mb-4">
                A Nosa <span className="text-primary">Xente</span>
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
                Momentos de paixón. Xogadores, afección e canteira unidos por un mesmo sentimento.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 max-w-6xl mx-auto">
          {images.map((src, i) => {
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`relative overflow-hidden group rounded-sm ${isLarge
                    ? "col-span-2 md:col-span-2 md:row-span-2 aspect-[16/9] md:aspect-auto"
                    : "aspect-square"
                  }`}
              >
                {/* Imagen optimizada */}
                <Image
                  src={src}
                  alt={`Galería Cercedense ${i}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition duration-500 z-10" />

                {/* Texto hover */}
                <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
                  <p className="text-xs text-white/70 uppercase tracking-wider">
                    Club Atlético
                  </p>
                  <h3 className="text-lg font-bold text-white">
                    Cercedense
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            className="inline-block text-white border-2 border-white/20 hover:border-white hover:bg-white hover:text-black font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-sm transition-all duration-300"
          >
            Ver Instagram Oficial
          </a>
        </div>
      </div>
    </section>
  );
}