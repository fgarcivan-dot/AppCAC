"use client";

import Teams from "@/components/sections/Teams";
import Squads from "@/components/sections/Squads";
import { ClassificationTable } from "@/components/mobile/ui/ClassificationTable";
import { useContent } from "@/components/mobile/layout/ContentProvider";
import { motion } from "framer-motion";

export default function EquiposPage() {
  const { data, loading } = useContent();

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  const equipos = data?.equipos;

  return (
    <main className="flex min-h-screen flex-col bg-[#050505] text-white">
      <div className="flex-1 w-full pb-24 min-h-[80vh]">
        {/* Team Overview Cards */}
        <Teams />

        {/* Dynamic Classification Tables (Option A) */}
        <section className="pb-24 px-6 max-w-lg mx-auto w-full flex flex-col gap-16">
          {/* Senior Masculino */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-white opacity-40">Clasificación Senior Masculino</h2>
            </div>
            {equipos?.masculino?.standings && (
              <ClassificationTable 
                standings={equipos.masculino.standings} 
                externalUrl={equipos.masculino.externalUrl} 
              />
            )}
          </div>

          {/* Senior Femenino */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-white opacity-40">Clasificación Senior Femenino</h2>
            </div>
            {equipos?.femenino?.standings && (
              <ClassificationTable 
                standings={equipos.femenino.standings} 
                externalUrl={equipos.femenino.externalUrl} 
              />
            )}
          </div>
        </section>

        {/* Players Section */}
        <Squads />
      </div>
    </main>
  );
}
