"use client";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phone = "27120000000"; // ← replace with real WhatsApp number
  const message = encodeURIComponent("Hi Goodies Hats! I'd like to enquire about a hat 👒");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <span
        className={`bg-[#1A1A1A] text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-all duration-300 whitespace-nowrap ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        Chat with us on WhatsApp
      </span>

      {/* Button */}
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.7)] hover:scale-110 transition-all duration-300">
        {/* WhatsApp SVG icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.825.738 5.476 2.027 7.782L0 32l8.469-2.002A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.79-1.862l-.487-.29-5.026 1.188 1.21-4.896-.318-.502A13.236 13.236 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.2-2.354-1.162-2.72-1.294-.365-.133-.63-.2-.896.2-.265.398-1.03 1.294-1.262 1.56-.232.265-.465.298-.863.1-.398-.2-1.68-.619-3.2-1.976-1.183-1.055-1.981-2.358-2.213-2.756-.232-.398-.025-.613.174-.811.18-.178.398-.465.597-.698.2-.232.265-.398.398-.663.133-.265.066-.498-.033-.698-.1-.2-.896-2.16-1.228-2.957-.323-.776-.65-.67-.896-.683l-.763-.013c-.265 0-.697.1-.1063.498-.365.398-1.394 1.362-1.394 3.322s1.428 3.853 1.627 4.118c.2.265 2.811 4.292 6.812 6.022.953.411 1.696.657 2.276.841.956.304 1.826.261 2.514.158.767-.114 2.354-.963 2.686-1.892.332-.93.332-1.727.232-1.892-.1-.166-.365-.265-.763-.465z" />
        </svg>
      </div>

      {/* Pulse ring */}
      <span className="absolute right-0 bottom-0 w-14 h-14 bg-[#25D366] rounded-full opacity-30 animate-ping pointer-events-none" />
    </a>
  );
}
