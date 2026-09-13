import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goodies Hats | Mzansi's Finest Wedding & Funeral Hats",
  description:
    "South Africa's premier hat boutique. Handcrafted sinamay hats for weddings, funerals and church events. Custom hats made to order. Delivered across SA.",
  keywords: "hats, wedding hats, funeral hats, sinamay, SA hats, South Africa, church hats, fascinators",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
