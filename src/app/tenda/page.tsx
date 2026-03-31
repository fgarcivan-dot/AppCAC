import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MerchGallery from "@/components/sections/MerchGallery";

export default function TendaPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <div className="flex-1 w-full pt-20 md:pt-24 min-h-[80vh]">
        <MerchGallery />
      </div>
      <Footer />
    </main>
  );
}
