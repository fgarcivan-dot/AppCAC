"use client";

import MerchGallery from "@/components/sections/MerchGallery";

export default function TendaPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505] text-white">
      <div className="flex-1 w-full pb-24 min-h-[80vh]">
        <MerchGallery />
      </div>
    </main>
  );
}
