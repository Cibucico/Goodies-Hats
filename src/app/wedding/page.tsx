import Image from "next/image";
import { hats } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function WeddingPage() {
  const weddingHats = hats.filter((h) => h.occasion === "wedding" || h.occasion === "both");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] h-72 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image src="https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=1600&h=500&fit=crop&q=80" alt="Wedding hats" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <p className="text-[#C9902D] uppercase tracking-widest text-xs font-semibold mb-2">💍 For the Big Day</p>
          <h1 className="text-5xl font-bold mb-3">Wedding Hats</h1>
          <p className="text-gray-300 max-w-lg">Wide-brim sinamay, fascinators & matching bridal sets. Every shade, every size — made for Mzansi weddings.</p>
        </div>
      </section>

      {/* Info bar */}
      <div className="bg-pink-50 border-b border-pink-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-6 text-sm text-pink-800">
          <span>✅ Matching bridesmaid sets available</span>
          <span>✅ Any colour matched to your theme</span>
          <span>✅ Custom orders in 14–21 days</span>
          <span>✅ Delivery across South Africa</span>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{weddingHats.length} Wedding Hats</h2>
          <Link href="/custom" className="btn-gold text-sm py-2">Order Custom Set</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weddingHats.map((hat) => <ProductCard key={hat.id} hat={hat} />)}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1A1A1A] text-white py-14 text-center">
        <h3 className="text-3xl font-bold mb-3">Need a Matching Bridal Set?</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">We make matching sets for 2–20 bridesmaids in any colour. Contact us with your wedding date and theme.</p>
        <Link href="/custom" className="btn-gold">Get a Quote</Link>
      </div>
    </div>
  );
}
