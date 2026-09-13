import Image from "next/image";
import { hats } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function FuneralPage() {
  const funeralHats = hats.filter((h) => h.occasion === "funeral" || h.occasion === "both");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] h-72 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&h=500&fit=crop&q=80" alt="Funeral hats" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <p className="text-[#C9902D] uppercase tracking-widest text-xs font-semibold mb-2">🕊️ Dignified & Respectful</p>
          <h1 className="text-5xl font-bold mb-3">Funeral Hats</h1>
          <p className="text-gray-300 max-w-lg">Elegant and dignified hats for umngcwabo, church memorials, and funeral services. Black, navy, maroon and more.</p>
        </div>
      </section>

      {/* Info bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-6 text-sm text-gray-600">
          <span>✅ Dignified & respectful styles</span>
          <span>✅ Black, navy, maroon & dark colours</span>
          <span>✅ Family matching sets available</span>
          <span>✅ Express production available</span>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{funeralHats.length} Funeral Hats</h2>
          <Link href="/custom" className="btn-gold text-sm py-2">Order Custom</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {funeralHats.map((hat) => <ProductCard key={hat.id} hat={hat} />)}
        </div>
      </div>

      {/* Express service */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-10 text-center">
          <p className="text-3xl mb-3">⚡</p>
          <h3 className="text-2xl font-bold mb-2">Need it Urgently?</h3>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">We understand that bereavement waits for no one. Contact us for express 5–7 day production.</p>
          <a href="tel:+27120000000" className="btn-gold">Call Us Now</a>
        </div>
      </div>
    </div>
  );
}
