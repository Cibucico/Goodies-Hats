"use client";
import Image from "next/image";
import Link from "next/link";
import { Hat } from "@/lib/data";
import { useCart } from "@/lib/store";
import { useState } from "react";

export default function ProductCard({ hat }: { hat: Hat }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    dispatch({ type: "ADD", hat, color: hat.colors[0], size: hat.sizes[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow group flex flex-col">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={hat.image}
          alt={hat.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {hat.isNew && (
            <span className="bg-[#C9902D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
          )}
          {hat.isBestseller && (
            <span className="bg-[#1A1A1A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Bestseller</span>
          )}
          {hat.originalPrice && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              -{Math.round(((hat.originalPrice - hat.price) / hat.originalPrice) * 100)}%
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${hat.occasion === "wedding" ? "bg-pink-100 text-pink-700" : hat.occasion === "funeral" ? "bg-gray-200 text-gray-700" : "bg-purple-100 text-purple-700"}`}>
            {hat.occasion === "both" ? "Wedding & Funeral" : hat.occasion === "wedding" ? "Wedding" : "Funeral"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/shop/${hat.id}`}>
          <h3 className="font-semibold text-[#1A1A1A] hover:text-[#C9902D] transition-colors leading-snug mb-1">{hat.name}</h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-[#C9902D] text-xs">{"★".repeat(Math.floor(hat.rating))}{"☆".repeat(5 - Math.floor(hat.rating))}</div>
          <span className="text-gray-400 text-xs">({hat.reviews})</span>
        </div>

        {/* Colors */}
        <div className="flex gap-1 mb-3">
          {hat.colors.slice(0, 4).map((c) => (
            <span key={c} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{c}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-bold text-[#1A1A1A]">R{hat.price.toLocaleString()}</span>
            {hat.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">R{hat.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button onClick={handleAdd} className={`btn-gold text-sm py-2 px-4 ${added ? "bg-green-600 hover:bg-green-700" : ""}`}>
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
