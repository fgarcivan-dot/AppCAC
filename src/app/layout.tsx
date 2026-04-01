import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/mobile/layout/BottomNav";
import { AppProvider } from "@/components/mobile/layout/AppProvider";
import { ContentProvider } from "@/components/mobile/layout/ContentProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Club Atlético Cercedense",
  description: "Orgullo de Cerceda",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scrollbar-hide">
      <body
        className={`${inter.variable} ${robotoCondensed.variable} font-sans bg-background text-foreground antialiased`}
      >
        <AppProvider>
          <main className="min-h-screen pb-32 overflow-x-hidden">
            <ContentProvider>
              {children}
            </ContentProvider>
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
