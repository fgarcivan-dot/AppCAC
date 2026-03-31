import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import YouthAcademy from "@/components/sections/YouthAcademy";

export default function EscuelasPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <div className="flex-1 w-full pt-24 min-h-[80vh]">
        <YouthAcademy />
      </div>
      <Footer />
    </main>
  );
}
