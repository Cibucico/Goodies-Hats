import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">👒</span>
            <div>
              <p className="text-[#C9902D] font-bold text-lg">Goodies Hats</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest">Mzansi's Finest</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Handcrafted SA-style hats for weddings, funerals, and church events. Every hat tells a story.
          </p>
          <div className="flex gap-3 mt-5">
            {["📘", "📸", "🎵"].map((icon, i) => (
              <span key={i} className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#C9902D] transition-colors text-sm">
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[#C9902D] font-semibold mb-4 uppercase tracking-wide text-sm">Shop</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {[["Wedding Hats", "/wedding"], ["Funeral Hats", "/funeral"], ["Fascinators", "/shop?cat=fascinator"], ["Church Hats", "/shop?cat=church"], ["Create Yours", "/custom"]].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-[#C9902D] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[#C9902D] font-semibold mb-4 uppercase tracking-wide text-sm">Support</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {[["Track Order", "/track"], ["Sizing Guide", "/sizing"], ["Care Instructions", "/care"], ["Returns Policy", "/returns"], ["FAQ", "/faq"]].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-[#C9902D] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#C9902D] font-semibold mb-4 uppercase tracking-wide text-sm">Contact Us</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex gap-2"><span>📍</span><span>Pretoria, Gauteng, South Africa</span></li>
            <li className="flex gap-2"><span>📞</span><span>+27 12 000 0000</span></li>
            <li className="flex gap-2"><span>📧</span><span>hello@goodieshats.co.za</span></li>
            <li className="flex gap-2"><span>⏰</span><span>Mon–Fri 8am–5pm SAST</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-gray-500 text-xs">
        <p>© 2024 Goodies Hats · Proudly South African 🇿🇦 · All rights reserved</p>
        <p className="mt-1">
          <Link href="/privacy" className="hover:text-[#C9902D] mr-4">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#C9902D]">Terms & Conditions</Link>
        </p>
      </div>
    </footer>
  );
}
