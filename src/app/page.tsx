"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MatchCarousel } from "@/components/mobile/ui/MatchCarousel";
import { ClassificationTable } from "@/components/mobile/ui/ClassificationTable";
import { SocialPost } from "@/components/mobile/ui/SocialPost"; // Import social post
import { InstaGrid } from "@/components/mobile/ui/InstaGrid";
import { EscolasSection } from "@/components/mobile/ui/EscolasSection";
import { MembershipBanner } from "@/components/mobile/ui/MembershipBanner";
import { useTheme } from "@/components/mobile/layout/AppProvider";
import { useContent } from "@/components/mobile/layout/ContentProvider";



export default function Home() {
  const { data, refreshKey } = useContent();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"masculino" | "femenino">("masculino"); 

  const currentData = data[activeTab];

  return (
    <div className={`flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden`}>

      {/* Main Content Area */}
      {/* 🏛️ ELITE BRANDING HEADER */}
      <div className="w-full flex flex-col items-center pt-[calc(1.25rem+var(--safe-area-top))] px-6 gap-5 z-20">
        {/* Heraldry & Tagline */}
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-10 h-10 relative opacity-80"
          >
            <img src="/escudo_hd.png" alt="Club Logo" className="object-contain" />
          </motion.div>
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-primary/30" />
             <span className="text-[9px] font-black tracking-[0.4em] text-primary/60 uppercase" style={{ fontFamily: 'NeueMontreal' }}>
               Cerceda, Galicia ∙ 1968
             </span>
             <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>

        {/* Elite Category Selector (Tabs) - Glassmorphism UI */}
        <div className={`w-full max-w-[320px] relative backdrop-blur-xl rounded-2xl p-1 border flex items-center shadow-2xl transition-all duration-1000 ${
          theme === 'day' ? 'bg-white/80 border-primary/10 shadow-primary/5' : 'bg-black/40 border-white/5 shadow-black'
        }`}>
          <motion.div 
            layoutId="activeTabSelection"
            animate={{ x: activeTab === "masculino" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-[0_0_20px_rgba(218,41,28,0.4)]"
          />
          <button 
            onClick={() => setActiveTab("masculino")}
            className={`relative z-10 flex-1 py-3 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${
              activeTab === "masculino" ? 'text-white' : (theme === 'day' ? 'text-slate-400' : 'text-white/30')
            }`}
          >
            Masculino
          </button>
          <button 
            onClick={() => setActiveTab("femenino")}
            className={`relative z-10 flex-1 py-3 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${
              activeTab === "femenino" ? 'text-white' : (theme === 'day' ? 'text-slate-400' : 'text-white/30')
            }`}
          >
            Femenino
          </button>
        </div>
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
                theme === 'day' ? 'text-primary' : 'text-white/50'
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

            {/* Dynamic Interactive Widgets */}
            <MatchCarousel matches={currentData.matches} theme={theme} />
            
            <div className="flex items-center gap-3 px-2">
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-400' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>Clasificación</span>
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
            </div>

            <ClassificationTable 
              standings={currentData.standings} 
              externalUrl={currentData.externalUrl} 
              theme={theme}
            />

            {/* News / Social Post */}
            <div className="flex items-center gap-3 px-2 mt-4">
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-400' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>Novedades</span>
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
            </div>
            <SocialPost {...currentData.socialPost} theme={theme} />

            {/* O Noso Manifesto */}
            <div className="mt-12 mb-8 flex flex-col items-start justify-center text-left w-full px-6 overflow-hidden">
              <span className={`text-xs font-black tracking-[0.4em] uppercase mb-4 transition-colors duration-1000 ${theme === 'day' ? 'text-primary' : 'text-primary/90'}`} style={{ fontFamily: 'NeueMontreal' }}>
                {data.homeContent?.manifesto?.line1 || "O Noso Manifesto"}
              </span>
              
              <h2 className={`text-[24px] sm:text-3xl md:text-4xl font-black leading-snug tracking-wider uppercase whitespace-nowrap transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-900' : 'text-white'
              }`} style={{ fontFamily: 'NeueMontreal' }}>
                {data.homeContent?.manifesto?.line2 || "Non somos só un club."}<br/>
                <span className={`text-primary ${theme === 'day' ? 'drop-shadow-sm' : 'drop-shadow-[0_0_20px_rgba(218,41,28,0.5)]'}`}>{data.homeContent?.manifesto?.highlight || "Somos familia."}</span><br/>
                {data.homeContent?.manifesto?.line3 || "Somos esforzo."}<br/>
                <span className={`text-primary ${theme === 'day' ? 'drop-shadow-sm' : 'drop-shadow-[0_0_20px_rgba(218,41,28,0.5)]'}`}>{data.homeContent?.manifesto?.line1 ? "" : "Somos Cerceda."}</span>
              </h2>
            </div>

            {/* Escolas / Canteira */}
            <EscolasSection theme={theme} data={data.homeContent?.escolas} />

            {/* Instagram Grid */}
            <InstaGrid theme={theme} data={data.homeContent?.instaGrid} />

            {/* Membership Banner (Socios) */}
            <MembershipBanner theme={theme} data={data.homeContent?.membership} />
            
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Static Branding Floating Bottom */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0">
        <div className="h-1 w-12 rounded-full bg-white/40 shadow-2xl" />
      </div>
      
    </div>
  );
}
