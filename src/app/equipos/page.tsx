"use client";

import Teams from "@/components/sections/Teams";
import Squads from "@/components/sections/Squads";
import { useTheme } from "@/components/mobile/layout/AppProvider";

export default function EquiposPage() {
  const { theme } = useTheme();

  return (
    <main className={`flex min-h-screen flex-col transition-colors duration-1000 ${
      theme === 'day' ? 'bg-slate-200 text-slate-900' : 'bg-black text-white'
    }`}>
      <div className="flex-1 w-full  pb-24 min-h-[80vh]">
        <Teams />
        <Squads />
      </div>
    </main>
  );
}
