"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart, cartCount } from "@/lib/store";

export default function Navbar() {
  const { state } = useCart();
  const count = cartCount(state.items);
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1A1A1A] text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">👒</span>
          <div className="leading-tight">
            <p className="text-[#C9902D] font-bold text-lg tracking-wide">Goodies Hats</p>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest">Mzansi's Finest</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/shop" className="hover:text-[#C9902D] transition-colors">Shop All</Link>
          <Link href="/wedding" className="hover:text-[#C9902D] transition-colors">Wedding</Link>
          <Link href="/funeral" className="hover:text-[#C9902D] transition-colors">Funeral</Link>
          <Link href="/custom" className="hover:text-[#C9902D] transition-colors">Create Yours</Link>
          <Link href="/track" className="hover:text-[#C9902D] transition-colors">Track Order</Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:text-[#C9902D] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9902D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#111] border-t border-gray-800 px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          {[
            ["Shop All", "/shop"],
            ["Wedding Hats", "/wedding"],
            ["Funeral Hats", "/funeral"],
            ["Create Yours", "/custom"],
            ["Track Order", "/track"],
          ].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="hover:text-[#C9902D] transition-colors">
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
