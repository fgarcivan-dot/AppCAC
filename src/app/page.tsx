"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MatchCarousel } from "@/components/mobile/ui/MatchCarousel";
import { ClassificationTable } from "@/components/mobile/ui/ClassificationTable";
import { SocialPost } from "@/components/mobile/ui/SocialPost"; 
import { InstaGrid } from "@/components/mobile/ui/InstaGrid";
import { EscolasSection } from "@/components/mobile/ui/EscolasSection";
import { MembershipBanner } from "@/components/mobile/ui/MembershipBanner";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { useContent } from "@/components/mobile/layout/ContentProvider";

export default function Home() {
  const { data, loading, refreshKey } = useContent();
  const { theme } = useTheme();

  if (loading) return <div className="h-screen flex items-center justify-center bg-black"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const manifesto = data.inicio?.manifesto;
  const masculino = data.equipos?.masculino;
  const femenino = data.equipos?.femenino;
  const escuelas = data.inicio?.escolas;
  const instaGrid = data.inicio?.instaGrid;
  const membership = data.inicio?.membership;

  const [activeTab, setActiveTab] = useState<"masculino" | "femenino">("masculino"); 

  const currentData = activeTab === "masculino" ? masculino : femenino;

  if (!currentData) return null;

  const isDay = theme === 'day';

  return (
    <div className={`flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden transition-colors duration-1000 ${isDay ? 'bg-slate-50' : 'bg-[#020202]'}`}>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center px-4 pb-8 pt-5 gap-6 z-10">

      {/* Elite Category Selector (Tabs) */}
      <div className={`w-full max-w-[340px] mt-5 relative rounded-full p-[3px] border flex items-center shadow-2xl transition-all duration-1000 ${
        isDay ? 'bg-white border-primary/20 shadow-xl' : 'bg-black border-white/5 shadow-2xl shadow-black'
      }`}>
        <motion.div 
          animate={{ x: activeTab === "masculino" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-primary to-primary-dark rounded-full"
        />
        <button 
          onClick={() => setActiveTab("masculino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "masculino" ? 'text-white' : (isDay ? 'text-slate-400 hover:text-primary' : 'text-white/30 hover:text-white')
          }`}
        >
          Masculino
        </button>
        <button 
          onClick={() => setActiveTab("femenino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "femenino" ? 'text-white' : (isDay ? 'text-slate-400 hover:text-primary' : 'text-white/30 hover:text-white')
          }`}
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
              <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-colors duration-1000 ${
                isDay ? 'text-primary' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>
                {activeTab === "masculino" ? "SÉNIOR MASC." : "SÉNIOR FEM."}
              </span>
              <div className="flex items-center gap-2">
                {activeTab === "femenino" && <div className="h-1 w-1 rounded-full bg-success animate-pulse" />}
                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-1000 ${
                  activeTab === "femenino" ? 'text-success' : 'text-primary'
                }`} style={{ fontFamily: 'NeueMontreal' }}>
                  {currentData.posicion}
                </span>
              </div>
            </div>

            <MatchCarousel matches={currentData.matches} theme={theme} refreshKey={refreshKey} />
            
            <div className="flex items-center gap-3 px-2">
              <div className={`h-[1px] flex-1 transition-colors duration-1000 ${isDay ? 'bg-slate-200' : 'bg-white/5'}`} />
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
                isDay ? 'text-slate-600' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>Clasificación</span>
              <div className={`h-[1px] flex-1 transition-colors duration-1000 ${isDay ? 'bg-slate-200' : 'bg-white/5'}`} />
            </div>

            <ClassificationTable 
              standings={currentData.standings} 
              externalUrl={currentData.externalUrl} 
              theme={theme}
            />

            <div className="flex items-center gap-3 px-2 mt-4">
              <div className={`h-[1px] flex-1 transition-colors duration-1000 ${isDay ? 'bg-slate-200' : 'bg-white/5'}`} />
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
                isDay ? 'text-slate-600' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>Novedades</span>
              <div className={`h-[1px] flex-1 transition-colors duration-1000 ${isDay ? 'bg-slate-200' : 'bg-white/5'}`} />
            </div>
            <SocialPost {...currentData.socialPost} theme={theme} />

            {/* 🔥 Refined Cinematic Manifesto (Scaled Down for Mobile) */}
            <div className="mt-20 mb-16 flex flex-col items-center justify-center text-center w-full px-8 relative overflow-visible">
              {/* Cinematic Background Light */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
              
              <div className={`text-[10px] font-black uppercase tracking-[0.6em] mb-10 flex items-center gap-6 ${isDay ? 'text-slate-900' : 'text-white'}`} style={{ fontFamily: 'NeueMontreal' }}>
                <div className="w-6 h-[1px] bg-primary/40" />
                <span>O NOSO ADN</span>
                <div className="w-6 h-[1px] bg-primary/40" />
              </div>
              
              <h2 className={`text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter uppercase transition-colors duration-1000 z-10 ${
                isDay ? 'text-slate-900' : 'text-white'
              }`} style={{ fontFamily: 'NeueMontreal' }}>
                <span className="block mb-2">
                  NON SOMOS SÓ UN CLUB.
                </span>
                <span className="block mb-2 text-primary drop-shadow-[0_0_20px_rgba(218,41,28,0.5)]">
                  SOMOS FAMILIA.
                </span>
                <span className="block mb-2">
                  SOMOS ESFORZO.
                </span>
                <span className="block text-primary drop-shadow-[0_0_20px_rgba(218,41,28,0.5)]">
                  SOMOS CERCEDA.
                </span>
              </h2>

              <p className={`mt-10 text-[9px] font-black tracking-widest uppercase italic opacity-30 ${isDay ? 'text-black' : 'text-white'}`} style={{ fontFamily: 'NeueMontreal' }}>
                 CERCEDA, DESDE 1923
              </p>
            </div>

            <EscolasSection theme={theme} data={escuelas} />
            <InstaGrid theme={theme} data={instaGrid} />
            <MembershipBanner theme={theme} data={membership} />
            
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0">
        <div className="h-1 w-12 rounded-full bg-white/40 shadow-2xl" />
      </div>
      
      </div>
    </div>
  );
}
