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
  const { data, refreshKey } = useContent();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"masculino" | "femenino">("masculino"); 

  const currentData = data[activeTab];

  return (
    <div className={`flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden`}>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center px-4 pb-8 pt-5 gap-6 z-10">

      {/* Elite Category Selector (Tabs) */}
      <div className={`w-full max-w-[340px] mt-5 relative backdrop-blur-3xl rounded-full p-[2px] border flex items-center shadow-2xl transition-all duration-1000 ${
        theme === 'day' ? 'bg-white border-primary/20 shadow-[0_10px_30px_-15px_rgba(218,41,28,0.2)]' : 'bg-black border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,1)]'
      }`}>
        <motion.div 
          animate={{ x: activeTab === "masculino" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-[0_0_20px_rgba(218,41,28,0.4)]"
        />
        <button 
          onClick={() => setActiveTab("masculino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "masculino" ? 'text-white drop-shadow-md' : (theme === 'day' ? 'text-slate-500 hover:text-primary' : 'text-white/60 hover:text-white')
          }`}
        >
          Masculino
        </button>
        <button 
          onClick={() => setActiveTab("femenino")}
          className={`relative z-10 flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-colors duration-1000 ${
            activeTab === "femenino" ? 'text-white drop-shadow-md' : (theme === 'day' ? 'text-slate-500 hover:text-primary' : 'text-white/60 hover:text-white')
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

            <div className="flex items-center gap-3 px-2 mt-4">
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-400' : 'text-white/20'
              }`} style={{ fontFamily: 'NeueMontreal' }}>Novedades</span>
              <div className={`h-px flex-1 transition-colors duration-1000 ${theme === 'day' ? 'bg-slate-200' : 'bg-white/5'}`} />
            </div>
            <SocialPost {...currentData.socialPost} theme={theme} />

            <div className="mt-12 mb-8 flex flex-col items-start justify-center text-left w-full px-6 overflow-hidden">
              <span className={`text-xs font-black tracking-[0.4em] uppercase mb-4 transition-colors duration-1000 ${theme === 'day' ? 'text-primary' : 'text-primary/90'}`} style={{ fontFamily: 'NeueMontreal' }}>
                {data.homeContent?.manifesto?.line1 || "O Noso Manifesto"}
              </span>
              
              <h2 className={`text-[24px] sm:text-3xl md:text-4xl font-black leading-snug tracking-wider uppercase transition-colors duration-1000 ${
                theme === 'day' ? 'text-slate-900' : 'text-white'
              }`} style={{ fontFamily: 'NeueMontreal' }}>
                {data.homeContent?.manifesto?.line2 || "Non somos só un club."}<br/>
                <span className={`text-primary ${theme === 'day' ? 'drop-shadow-sm' : 'drop-shadow-[0_0_20px_rgba(218,41,28,0.5)]'}`}>{data.homeContent?.manifesto?.highlight || "Somos familia."}</span><br/>
                {data.homeContent?.manifesto?.line3 || "Somos esfuerzo."}<br/>
                <span className={`text-primary ${theme === 'day' ? 'drop-shadow-sm' : 'drop-shadow-[0_0_20px_rgba(218,41,28,0.5)]'}`}>{data.homeContent?.manifesto?.line1 ? "" : "Somos Cerceda."}</span>
              </h2>
            </div>

            <EscolasSection theme={theme} data={data.homeContent?.escolas} />
            <InstaGrid theme={theme} data={data.homeContent?.instaGrid} />
            <MembershipBanner theme={theme} data={data.homeContent?.membership} />
            
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
