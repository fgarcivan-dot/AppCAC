import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Teams from "@/components/sections/Teams";
import Squads from "@/components/sections/Squads";

export default function EquiposPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <div className="flex-1 w-full pt-24 min-h-[80vh]">
        <Teams />
        <Squads />
      </div>
      <Footer />
    </main>
  );
}
