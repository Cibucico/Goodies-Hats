"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { hats } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Best Rated"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get("cat") || "all";

  const [occasion, setOccasion] = useState("all");
  const [category, setCategory] = useState(initCat);
  const [sort, setSort] = useState("Featured");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);

  const filtered = useMemo(() => {
    let list = [...hats];
    if (search) list = list.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()));
    if (occasion !== "all") list = list.filter((h) => h.occasion === occasion || h.occasion === "both");
    if (category !== "all") list = list.filter((h) => h.category === category);
    list = list.filter((h) => h.price <= maxPrice);
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    else if (sort === "Best Rated") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    return list;
  }, [search, occasion, category, sort, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-1">All Hats</h1>
        <p className="text-gray-500">Handcrafted SA-style hats for every special occasion</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 space-y-5">
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h3 className="font-bold mb-3">Search</h3>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hats…" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#C9902D]" />
          </div>

          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h3 className="font-bold mb-3">Occasion</h3>
            {["all","wedding","funeral"].map((o) => (
              <label key={o} className="flex items-center gap-2 mb-2 cursor-pointer text-sm capitalize">
                <input type="radio" name="occ" value={o} checked={occasion===o} onChange={() => setOccasion(o)} className="accent-[#C9902D]" />
                {o === "all" ? "All Occasions" : o}
              </label>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h3 className="font-bold mb-3">Category</h3>
            {["all","wedding","funeral","fascinator","church"].map((c) => (
              <label key={c} className="flex items-center gap-2 mb-2 cursor-pointer text-sm capitalize">
                <input type="radio" name="cat" value={c} checked={category===c} onChange={() => setCategory(c)} className="accent-[#C9902D]" />
                {c === "all" ? "All Types" : c}
              </label>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h3 className="font-bold mb-2">Max Price: <span className="text-[#C9902D]">R{maxPrice.toLocaleString()}</span></h3>
            <input type="range" min={300} max={5000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#C9902D]" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>R300</span><span>R5,000</span></div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <p className="text-gray-500 text-sm"><span className="font-bold text-[#1A1A1A]">{filtered.length}</span> hats found</p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#C9902D]">
              {sortOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-5xl mb-3">👒</p>
              <p className="font-semibold text-lg">No hats found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((hat) => <ProductCard key={hat.id} hat={hat} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return <Suspense><ShopContent /></Suspense>;
}
