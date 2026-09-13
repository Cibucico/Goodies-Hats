"use client";
import Image from "next/image";
import { hats } from "@/lib/data";
import { useCart } from "@/lib/store";
import { useState, use } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const hat = hats.find((h) => h.id === id);
  if (!hat) notFound();

  const { dispatch } = useCart();
  const [selectedColour, setSelectedColour] = useState(hat.colors[0]);
  const [selectedSize, setSelectedSize] = useState(hat.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = hats.filter((h) => h.id !== hat.id && (h.occasion === hat.occasion || h.category === hat.category)).slice(0, 4);

  function addToCart() {
    for (let i = 0; i < qty; i++) dispatch({ type: "ADD", hat, color: selectedColour, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex gap-2">
        <Link href="/" className="hover:text-[#C9902D]">Home</Link> /
        <Link href="/shop" className="hover:text-[#C9902D]">Shop</Link> /
        <span className="text-[#1A1A1A]">{hat.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
            <Image src={hat.image} alt={hat.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            {hat.isBestseller && (
              <span className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-xs font-bold px-3 py-1 rounded-full">Bestseller</span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${hat.occasion === "wedding" ? "bg-pink-100 text-pink-700" : hat.occasion === "funeral" ? "bg-gray-200 text-gray-700" : "bg-purple-100 text-purple-700"}`}>
            {hat.occasion === "both" ? "Wedding & Funeral" : hat.occasion === "wedding" ? "Wedding" : "Funeral"}
          </span>

          <h1 className="text-3xl font-bold text-[#1A1A1A] mt-3 mb-2">{hat.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#C9902D]">{"★".repeat(Math.floor(hat.rating))}</span>
            <span className="text-gray-500 text-sm">{hat.rating} · {hat.reviews} reviews</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-[#1A1A1A]">R{hat.price.toLocaleString()}</span>
            {hat.originalPrice && <span className="text-lg text-gray-400 line-through">R{hat.originalPrice.toLocaleString()}</span>}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{hat.description}</p>

          {/* Colour */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Colour: <span className="text-[#C9902D]">{selectedColour}</span></p>
            <div className="flex flex-wrap gap-2">
              {hat.colors.map((c) => (
                <button key={c} onClick={() => setSelectedColour(c)}
                  className={`border-2 rounded-xl px-3 py-1.5 text-sm transition-all ${selectedColour === c ? "border-[#C9902D] bg-[#C9902D]/10 text-[#C9902D] font-semibold" : "border-gray-200 text-gray-600 hover:border-[#C9902D]"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Size: <span className="text-[#C9902D]">{selectedSize}</span></p>
            <div className="flex gap-2">
              {hat.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`border-2 rounded-xl px-4 py-2 text-sm transition-all ${selectedSize === s ? "border-[#C9902D] bg-[#C9902D]/10 text-[#C9902D] font-semibold" : "border-gray-200 text-gray-600 hover:border-[#C9902D]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold">−</button>
              <span className="px-4 font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold">+</button>
            </div>
            <button onClick={addToCart} className={`flex-1 btn-gold py-3 text-base ${added ? "bg-green-600 hover:bg-green-700" : ""}`}>
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>

          {/* Trust signals */}
          <div className="border border-gray-100 rounded-2xl p-4 space-y-2">
            {[["🪡","Handcrafted in South Africa by master hatmakers"],["🚚","Delivery 3–7 business days across all 9 provinces"],["↩️","7-day easy return if not 100% satisfied"],["🎨","Custom colour matching available — contact us"]].map(([icon, text]) => (
              <p key={text as string} className="text-sm text-gray-500 flex gap-2"><span>{icon}</span>{text as string}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((h) => <ProductCard key={h.id} hat={h} />)}
          </div>
        </div>
      )}
    </div>
  );
}
