import type { Metadata } from "next";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Reusable/Footer";
import LenisProvider from "@/wrapper/LenisScrollWrapper";
import NavBar from "@/components/Reusable/NavBar";
import { HeroAnimationProvider } from "@/contexts/HeroAnimationContext";

// Bodoni Moda
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});


// Inter Tight
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

// TT HOBES PRO TRIAL LIGHT
const TTFont = localFont({
  src: "../fonts/TT Hoves Pro Trial Light.ttf",
  variable: "--font-my-TTFont",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhuma Cast Factory",
  description: "We are leading manufacturers and wholesale suppliers of premium-quality iron products. With a robust distribution network and decades of industry experience, we're equipped to fulfill bulk requirements across Tamil Nadu and beyond, ensuring consistent supply and reliable service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodoniModa.variable} ${interTight.variable} ${TTFont.variable} antialiased bg-white`}>
        <HeroAnimationProvider>
          <LenisProvider>
            <NavBar />
            {children}
          </LenisProvider>
          <Footer />
        </HeroAnimationProvider>
      </body>
    </html>
  );
}