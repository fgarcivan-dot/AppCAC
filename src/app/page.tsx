"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MatchCarousel } from "@/components/mobile/ui/MatchCarousel";
import { ClassificationTable } from "@/components/mobile/ui/ClassificationTable";
import { SocialPost } from "@/components/mobile/ui/SocialPost"; 
import { InstaGrid } from "@/components/mobile/ui/InstaGrid";
import { EscolasSection } from "@/components/mobile/ui/EscolasSection";
import { MembershipBanner } from "@/components/mobile/ui/MembershipBanner";
import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Home() {
  const { data, loading, refreshKey } = useContent();

  if (loading) return <div className="h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const masculino = data.equipos?.masculino;
  const femenino = data.equipos?.femenino;
  const escuelas = data.inicio?.escolas;
  const instaGrid = data.inicio?.instaGrid;
  const membership = data.inicio?.membership;

  const [activeTab, setActiveTab] = useState<"masculino" | "femenino">("masculino"); 

  const currentData = activeTab === "masculino" ? masculino : femenino;

  if (!currentData) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden bg-background transition-colors duration-1000">

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center px-4 pb-8 pt-5 gap-6 z-10">

      {/* Elite Category Selector (Tabs) */}
      <div className="w-full max-w-[340px] mt-5 relative rounded-full p-[3px] border border-black/5 flex items-center shadow-lg bg-slate-50/50">
        <motion.div 
          animate={{ x: activeTab === "masculino" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-primary to-rose-700 rounded-full"
        />
        <button 
          onClick={() => setActiveTab("masculino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "masculino" ? 'text-white' : 'text-foreground opacity-40 hover:opacity-100'
          }`}
          style={{ fontFamily: 'NeueMontreal' }}
        >
          Masculino
        </button>
        <button 
          onClick={() => setActiveTab("femenino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "femenino" ? 'text-white' : 'text-foreground opacity-40 hover:opacity-100'
          }`}
          style={{ fontFamily: 'NeueMontreal' }}
        >
          Femenino
        </button>
      </div>

      {/* Content Area with Slide Animation */}
      <div className="w-full flex-1 relative overflow-visible mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "masculino" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "masculino" ? 20 : -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full flex flex-col gap-4 pb-32"
          >
            {/* Header / Info */}
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-foreground opacity-30" style={{ fontFamily: 'NeueMontreal' }}>
                {activeTab === "masculino" ? "SÉNIOR MASC." : "SÉNIOR FEM."}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary" style={{ fontFamily: 'NeueMontreal' }}>
                  {currentData.posicion}
                </span>
              </div>
            </div>

            <MatchCarousel matches={currentData.matches} refreshKey={refreshKey} />
            
            <div className="flex items-center gap-3 px-2">
              <div className="h-[1px] flex-1 bg-black/5" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-foreground opacity-30">Clasificación</span>
              <div className="h-[1px] flex-1 bg-black/5" />
            </div>

            <ClassificationTable 
              standings={currentData.standings} 
              externalUrl={currentData.externalUrl}
            />

            <div className="flex items-center gap-3 px-2 mt-4">
              <div className="h-[1px] flex-1 bg-black/5" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-foreground opacity-30">Novidades</span>
              <div className="h-[1px] flex-1 bg-black/5" />
            </div>
            <SocialPost {...currentData.socialPost} />

            {/* 🔥 Refined Cinematic Manifesto (Scaled Down for Mobile) */}
            <div className="mt-20 mb-16 flex flex-col items-center justify-center text-center w-full px-8 relative overflow-visible">
              {/* Cinematic Background Light */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="text-[10px] font-black uppercase tracking-[0.6em] mb-10 flex items-center gap-6 text-foreground" style={{ fontFamily: 'NeueMontreal' }}>
                <div className="w-6 h-[1px] bg-primary" />
                <span>O NOSO ADN</span>
                <div className="w-6 h-[1px] bg-primary" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.2] tracking-tighter uppercase z-10 text-foreground" style={{ fontFamily: 'NeueMontreal' }}>
                <span className="block mb-4">
                  NON SOMOS SÓ UN CLUB.
                </span>
                <span className="block">
                  <span className="text-primary tracking-tighter">SOMOS FAMILIA.</span> SOMOS ESFORZO. <span className="text-primary tracking-tighter">SOMOS CERCEDA.</span>
                </span>
              </h2>

              <p className="mt-10 text-[9px] font-black tracking-widest uppercase text-foreground opacity-30" style={{ fontFamily: 'NeueMontreal' }}>
                 CERCEDA, DENDE 2021
              </p>
            </div>

            <EscolasSection data={escuelas} />
            <InstaGrid data={instaGrid} />
            <MembershipBanner data={membership} />
            
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none z-0">
        <div className="h-1 w-12 rounded-full bg-black opacity-20 shadow-2xl" />
      </div>
      
      </div>
    </div>
  );
}
