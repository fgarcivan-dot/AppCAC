import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import News from "@/components/sections/News";

export default function NoticiasPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <div className="flex-1 w-full pt-24 min-h-[80vh]">
        <News />
      </div>
      <Footer />
    </main>
  );
}
