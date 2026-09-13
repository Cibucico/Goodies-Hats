import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { hats } from "@/lib/data";

const categories = [
  { label: "Wedding Hats", href: "/wedding", emoji: "💍", desc: "Sinamay wide brims, matching sets & fascinators", bg: "bg-pink-50 border-pink-200" },
  { label: "Funeral Hats", href: "/funeral", emoji: "🕊️", desc: "Dignified black, navy & maroon church hats", bg: "bg-gray-50 border-gray-200" },
  { label: "Fascinators", href: "/shop?cat=fascinator", emoji: "✨", desc: "Small, elegant & easy to wear anywhere", bg: "bg-purple-50 border-purple-200" },
  { label: "Create Yours", href: "/custom", emoji: "🎨", desc: "Upload your design — we make & deliver it", bg: "bg-amber-50 border-amber-200" },
];

const features = [
  { icon: "🪡", title: "Handcrafted in SA", desc: "Every hat made by skilled Mzansi artisans" },
  { icon: "🎨", title: "Custom Colours", desc: "Match any dress or theme — any colour, any size" },
  { icon: "🚚", title: "Delivery Nationwide", desc: "We deliver across all 9 provinces" },
  { icon: "👒", title: "Matching Sets", desc: "Bridal party sets of 2–20 hats, perfectly matched" },
];

const testimonials = [
  { name: "Nomsa M.", city: "Soweto", text: "The blue sinamay set for my daughter's wedding was STUNNING. All 8 bridesmaids looked incredible. Will order again!", rating: 5 },
  { name: "Thandi K.", city: "Durban", text: "Got the black wide brim for my mother's funeral. It was beautiful and dignified — exactly what we needed in a hard time.", rating: 5 },
  { name: "Lerato P.", city: "Pretoria", text: "I uploaded my own design and they made it exactly as I imagined. Delivered in 2 weeks! Absolutely beautiful.", rating: 5 },
];

export default function Home() {
  const featured = hats.filter((h) => h.isBestseller).slice(0, 4);
  const newest = hats.filter((h) => h.isNew).slice(0, 4);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-[#1A1A1A] overflow-hidden min-h-[90vh] flex items-center">
        {/* BG image overlay */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1590159983013-d4165b01adb0?w=1600&h=900&fit=crop&q=80"
            alt="SA wedding hat hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-white">
          <p className="text-[#C9902D] uppercase tracking-[0.3em] text-sm font-semibold mb-4 animate-fade-up">
            🇿🇦 Mzansi's Finest Hat Boutique
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Crown Yourself<br />
            <span className="text-[#C9902D]">in Style</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Handcrafted sinamay hats for weddings, funerals, church & traditional events.
            Custom designs made to order and delivered across South Africa.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/shop" className="btn-gold text-base">
              Shop All Hats
            </Link>
            <Link href="/custom" className="btn-outline border-white text-white hover:bg-white hover:text-[#1A1A1A] text-base">
              Create Your Own
            </Link>
          </div>
          <div className="flex gap-8 mt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[["500+", "Hats Delivered"], ["4.9★", "Average Rating"], ["10+", "Years Experience"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-[#C9902D] font-bold text-2xl">{num}</p>
                <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER STRIP ─────────────────────────────────────── */}
      <div className="bg-[#C9902D] text-white text-center py-3 text-sm font-medium tracking-wide">
        🚚 Free delivery on orders over R1,500 · Handcrafted in South Africa 🇿🇦 · Custom orders welcome
      </div>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-heading text-center gold-underline">Shop by Occasion</h2>
        <p className="text-center text-gray-500 mb-10 mt-4">Find the perfect hat for every special moment</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`border-2 ${cat.bg} rounded-2xl p-6 card-shadow hover:scale-[1.02] transition-transform duration-200 group`}
            >
              <p className="text-4xl mb-3">{cat.emoji}</p>
              <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-[#C9902D] transition-colors">{cat.label}</h3>
              <p className="text-gray-500 text-sm mt-1">{cat.desc}</p>
              <p className="text-[#C9902D] text-sm font-semibold mt-3">Shop now →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BESTSELLERS ──────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading text-center gold-underline">Bestsellers</h2>
          <p className="text-center text-gray-500 mb-10 mt-4">Our most-loved hats — trusted by hundreds of SA women</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((hat) => (
              <ProductCard key={hat.id} hat={hat} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="btn-outline">View All Hats</Link>
          </div>
        </div>
      </section>

      {/* ── CUSTOM BANNER ────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-[#C9902D] uppercase tracking-widest text-sm font-semibold mb-3">✨ Exclusive Service</p>
            <h2 className="text-4xl font-bold mb-4">Design Your<br /><span className="text-[#C9902D]">Dream Hat</span></h2>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Upload your design or inspiration image. Our master hatmakers will craft it exactly as you envision —
              in any colour, any size, for weddings, funerals, or church. Delivered in 14–21 days.
            </p>
            <Link href="/custom" className="btn-gold">Start Designing</Link>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            {[
              "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
            ].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square relative">
                <Image src={src} alt="Custom hat" fill className="object-cover" sizes="120px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-heading text-center gold-underline">New Arrivals</h2>
        <p className="text-center text-gray-500 mb-10 mt-4">Fresh designs, just dropped</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newest.map((hat) => (
            <ProductCard key={hat.id} hat={hat} />
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="bg-[#C9902D]/10 border-y border-[#C9902D]/20 py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((f) => (
            <div key={f.title}>
              <p className="text-4xl mb-3">{f.icon}</p>
              <h4 className="font-bold text-[#1A1A1A] mb-1">{f.title}</h4>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading text-center gold-underline">What Our Customers Say</h2>
          <p className="text-center text-gray-500 mb-10 mt-4">Real women, real reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#FDF8F0] rounded-2xl p-6 card-shadow border border-[#C9902D]/10">
                <div className="text-[#C9902D] text-lg mb-3">{"★".repeat(t.rating)}</div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C9902D] rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.city}, SA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK CTA ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-[#1A1A1A] rounded-3xl p-10 text-white">
          <p className="text-4xl mb-3">📦</p>
          <h3 className="text-2xl font-bold mb-2">Already ordered?</h3>
          <p className="text-gray-400 mb-6">Track your hat's journey from our workshop to your door.</p>
          <Link href="/track" className="btn-gold">Track My Order</Link>
        </div>
      </section>
    </div>
  );
}
