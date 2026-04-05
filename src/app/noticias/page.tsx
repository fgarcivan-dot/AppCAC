"use client";

import News from "@/components/sections/News";

export default function NoticiasPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505] text-white">
      <div className="flex-1 w-full pb-24 min-h-[80vh]">
        <News />
      </div>
    </main>
  );
}
