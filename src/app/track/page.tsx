"use client";
import { useState } from "react";
import { mockOrders, STATUS_STEPS, Order } from "@/lib/data";

function statusIndex(status: Order["status"]) {
  return STATUS_STEPS.findIndex((s) => s.key === status);
}

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const found = mockOrders.find(
      (o) => o.id.toLowerCase() === query.trim().toLowerCase() || o.trackingNumber.toLowerCase() === query.trim().toLowerCase()
    );
    if (found) { setOrder(found); setError(""); }
    else { setOrder(null); setError("No order found. Please check your order number or tracking number."); }
  }

  const idx = order ? statusIndex(order.status) : -1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <p className="text-4xl mb-3">📦</p>
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2">Track Your Order</h1>
        <p className="text-gray-500">Enter your order number or tracking number to see your hat's journey</p>
      </div>

      {/* Demo hint */}
      <div className="bg-[#C9902D]/10 border border-[#C9902D]/30 rounded-2xl p-4 mb-6 text-sm text-[#9A6E1F]">
        <strong>Demo:</strong> Try order number <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs">GH-2024-0892</code> or <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs">GH-2024-0763</code>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Order # or tracking number…"
          className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D]"
        />
        <button type="submit" className="btn-gold px-8">Track</button>
      </form>

      {error && <p className="text-red-500 text-sm text-center mb-6">{error}</p>}

      {order && (
        <div className="bg-white rounded-3xl card-shadow overflow-hidden">
          {/* Order header */}
          <div className="bg-[#1A1A1A] text-white p-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Order Number</p>
                <p className="text-xl font-bold text-[#C9902D]">{order.id}</p>
                <p className="text-gray-400 text-sm mt-1">Placed {new Date(order.date).toLocaleDateString("en-ZA", { day:"numeric",month:"long",year:"numeric" })}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Tracking Number</p>
                <p className="font-mono text-sm">{order.trackingNumber}</p>
                <p className="text-gray-400 text-xs mt-1">Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString("en-ZA", { day:"numeric",month:"long",year:"numeric" })}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Progress tracker */}
            <div className="mb-8">
              <h3 className="font-bold text-[#1A1A1A] mb-6">Delivery Progress</h3>
              <div className="relative">
                {/* Progress line */}
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" />
                <div
                  className="absolute top-5 left-5 h-0.5 bg-[#C9902D] transition-all duration-700"
                  style={{ width: `${(idx / (STATUS_STEPS.length - 1)) * 100}%` }}
                />
                <div className="relative flex justify-between">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step.key} className="flex flex-col items-center text-center w-16">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 mb-2 transition-all ${i <= idx ? "bg-[#C9902D] text-white shadow-lg" : "bg-gray-100 text-gray-400"}`}>
                        {step.icon}
                      </div>
                      <p className={`text-[10px] leading-tight font-medium ${i <= idx ? "text-[#C9902D]" : "text-gray-400"}`}>{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current status */}
            <div className="bg-[#C9902D]/10 border border-[#C9902D]/30 rounded-2xl p-4 mb-6">
              <p className="text-sm font-semibold text-[#9A6E1F]">
                {STATUS_STEPS[idx].icon} Current Status: <span className="text-[#C9902D]">{STATUS_STEPS[idx].label}</span>
              </p>
              {order.status === "delivered" && <p className="text-sm text-green-700 mt-1">🎉 Your hat has been delivered! Enjoy wearing it.</p>}
              {order.status === "shipped" && <p className="text-sm text-[#9A6E1F] mt-1">Your hat is on its way! Expected delivery {new Date(order.estimatedDelivery).toLocaleDateString("en-ZA")}</p>}
            </div>

            {/* Items */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">Items in Order</div>
              {order.items.map(({ hat, qty, color, size }) => (
                <div key={hat.id} className="flex items-center gap-4 px-4 py-4 border-t border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0 text-3xl flex items-center justify-center">👒</div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1A1A] text-sm">{hat.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">Colour: {color} · Size: {size} · Qty: {qty}</p>
                  </div>
                  <p className="font-bold text-[#1A1A1A]">R{(hat.price * qty).toLocaleString()}</p>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 bg-gray-50 font-bold text-[#1A1A1A] border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#C9902D]">R{order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Address */}
            <div className="mt-4 text-sm text-gray-500">
              <span className="font-semibold text-[#1A1A1A]">Delivering to:</span> {order.address}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
