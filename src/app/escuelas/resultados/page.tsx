import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import YouthResults from "@/components/sections/YouthResults";

export default function YouthResultsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <div className="flex-1 w-full pt-20">
        <YouthResults />
      </div>
      <Footer />
    </main>
  );
}
