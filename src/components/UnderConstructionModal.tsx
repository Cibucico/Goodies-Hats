"use client";
import { useEffect } from "react";

export default function UnderConstructionModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const phone = "27609609830";
  const message = encodeURIComponent("Hi Goodies Hats! I'd like to place an order and pay 👒");
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-fade-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse inline-block" />
          Under Construction
        </div>

        <p className="text-5xl mb-4">🚧</p>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Payment Gateway Coming Soon</h2>
        <p className="text-gray-500 leading-relaxed mb-6">
          Our online payment system is being set up. In the meantime, complete your order via WhatsApp — we accept <strong>EFT, SnapScan & Ozow</strong>.
        </p>

        {/* Steps */}
        <div className="bg-[#FDF8F0] border border-[#C9902D]/20 rounded-2xl p-5 text-left mb-6 space-y-3">
          {[
            ["1️⃣", "Click \"Order via WhatsApp\" below"],
            ["2️⃣", "Send us your cart items & delivery address"],
            ["3️⃣", "We send you an invoice + payment details"],
            ["4️⃣", "Pay & get your tracking number 📦"],
          ].map(([num, step]) => (
            <p key={step} className="text-sm text-gray-700 flex gap-2">
              <span>{num}</span><span>{step}</span>
            </p>
          ))}
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold w-full block py-4 text-base mb-3"
        >
          <span className="mr-2">💬</span>Order via WhatsApp
        </a>

        <button onClick={onClose} className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
          Go back to cart
        </button>
      </div>
    </div>
  );
}
