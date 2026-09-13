"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart, cartTotal } from "@/lib/store";
import { useState } from "react";
import UnderConstructionModal from "@/components/UnderConstructionModal";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const total = cartTotal(state.items);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (checkoutDone) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <p className="text-6xl mb-4">🎉</p>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">Order Placed!</h2>
          <p className="text-gray-500 mb-2">Your order has been received. We'll contact you shortly to confirm payment via EFT or SnapScan.</p>
          <p className="text-gray-400 text-sm mb-6">Check your email for your order confirmation and tracking number.</p>
          <Link href="/track" className="btn-gold">Track My Order</Link>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Browse our collection and find your perfect hat</p>
          <Link href="/shop" className="btn-gold">Shop All Hats</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {showPaymentModal && <UnderConstructionModal onClose={() => setShowPaymentModal(false)} />}
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {state.items.map(({ hat, qty, color, size }) => (
            <div key={`${hat.id}-${color}-${size}`} className="bg-white rounded-2xl card-shadow p-4 flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={hat.image} alt={hat.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1A1A]">{hat.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">Colour: {color} · Size: {size}</p>
                <p className="text-[#C9902D] font-bold mt-1">R{hat.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch({ type: "DEC", id: hat.id })} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-[#C9902D] hover:text-[#C9902D] font-bold transition-colors">−</button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button onClick={() => dispatch({ type: "INC", id: hat.id })} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-[#C9902D] hover:text-[#C9902D] font-bold transition-colors">+</button>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#1A1A1A]">R{(hat.price * qty).toLocaleString()}</p>
                <button onClick={() => dispatch({ type: "REMOVE", id: hat.id })} className="text-red-400 text-xs mt-1 hover:text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl card-shadow p-6 sticky top-20">
            <h3 className="font-bold text-[#1A1A1A] text-lg mb-5">Order Summary</h3>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>R{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery</span><span className="text-green-600">{total >= 1500 ? "FREE" : "R150"}</span></div>
              {total < 1500 && <p className="text-xs text-gray-400">Add R{(1500 - total).toLocaleString()} more for free delivery</p>}
              <div className="border-t pt-3 flex justify-between font-bold text-[#1A1A1A] text-base">
                <span>Total</span>
                <span className="text-[#C9902D]">R{(total + (total >= 1500 ? 0 : 150)).toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => setShowPaymentModal(true)} className="btn-gold w-full py-4 text-base mb-3">Checkout →</button>
            <Link href="/shop" className="block text-center text-sm text-gray-400 hover:text-[#C9902D] transition-colors">Continue Shopping</Link>

            <div className="mt-5 pt-5 border-t space-y-2">
              <p className="text-xs text-gray-400 flex gap-2"><span>🔒</span> Secure payment via EFT, SnapScan or Ozow</p>
              <p className="text-xs text-gray-400 flex gap-2"><span>🚚</span> Delivery 3–7 business days</p>
              <p className="text-xs text-gray-400 flex gap-2"><span>↩️</span> Easy returns within 7 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
