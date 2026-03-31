"use client";

import Image from "next/image";
import { Trophy, Radio, ArrowRight } from "lucide-react";
import { MatchHero } from "@/components/mobile/sections/MatchHero";
import { SeasonStats } from "@/components/mobile/sections/SeasonStats";
import { BentoCard } from "@/components/mobile/ui/BentoCard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex items-center gap-4 pt-4">
        <div className="relative h-12 w-12 drop-shadow-[0_0_15px_rgba(218,41,28,0.4)]">
          <Image
            src="/escudo.png"
            alt="Club Atlético Cercedense"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col -gap-1">
          <h1 className="text-[10px] font-black tracking-[0.4em] text-primary">
            CLUB ATLÉTICO
          </h1>
          <h2 className="text-2xl font-black tracking-tighter text-white">
            CERCEDENSE
          </h2>
        </div>
      </header>

      {/* Featured Match */}
      <section>
        <MatchHero />
      </section>

      {/* Bento Grid */}
      <section className="grid grid-cols-2 gap-4">
        <BentoCard
          title="ÚLTIMO RESULTADO"
          subtitle="SENIOR MASCULINO"
          badge="Vitoria"
          className="col-span-2"
        >
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-black text-white/60">CERCEDENSE</span>
              <span className="text-xs font-medium text-white/20 uppercase">PONTECARREIRA</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-white tabular-nums tracking-tighter">1</span>
              <span className="text-xl font-black text-white/10">-</span>
              <span className="text-4xl font-black text-white/20 tabular-nums tracking-tighter">0</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard
          title="RESULTADOS"
          icon={Trophy}
          className="aspect-square"
        >
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">VER TODOS</span>
            <ArrowRight size={14} className="text-primary" />
          </div>
        </BentoCard>

        <BentoCard
          title="DIRECTO"
          icon={Radio}
          className="aspect-square"
        >
          <div className="mt-4 flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-error uppercase tracking-widest">
              <div className="h-1.5 w-1.5 rounded-full bg-error animate-pulse" />
              OFFLINE
            </span>
            <ArrowRight size={14} className="text-white/20" />
          </div>
        </BentoCard>
      </section>
    </div>
  );
}
