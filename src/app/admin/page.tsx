"use client";
import { useState } from "react";
import Link from "next/link";

type PaymentStatus = "pending" | "awaiting_proof" | "proof_received" | "paid" | "failed";
type DeliveryStatus = "received" | "in_production" | "quality_check" | "shipped" | "out_for_delivery" | "delivered";

type Order = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: string;
  total: number;
  date: string;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  trackingNumber: string;
  eftSent: boolean;
};

const DELIVERY_STEPS: DeliveryStatus[] = ["received","in_production","quality_check","shipped","out_for_delivery","delivered"];
const DELIVERY_LABELS: Record<DeliveryStatus, string> = {
  received: "Order Received", in_production: "In Production", quality_check: "Quality Check",
  shipped: "Shipped", out_for_delivery: "Out for Delivery", delivered: "Delivered",
};
const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending", awaiting_proof: "EFT Sent – Awaiting Proof",
  proof_received: "Proof Received", paid: "Paid ✓", failed: "Failed",
};
const PAYMENT_COLORS: Record<PaymentStatus, string> = {
  pending: "bg-gray-100 text-gray-600", awaiting_proof: "bg-yellow-100 text-yellow-700",
  proof_received: "bg-blue-100 text-blue-700", paid: "bg-green-100 text-green-700", failed: "bg-red-100 text-red-600",
};

const INITIAL_ORDERS: Order[] = [
  { id:"GH-2024-0892", customer:"Nomsa Dlamini", email:"nomsa@gmail.com", phone:"+27831234567", address:"45 Tshwane Drive, Pretoria, 0001", items:"Royal Blue Sinamay Wide-Brim × 1 (M)", total:850, date:"2024-11-28", paymentStatus:"awaiting_proof", deliveryStatus:"in_production", trackingNumber:"SA-TRK-9923811", eftSent:true },
  { id:"GH-2024-0893", customer:"Thandi Khumalo", email:"thandi@gmail.com", phone:"+27721234567", address:"12 Mandela Street, Soweto, 1804", items:"Classic Black Wide Brim × 1 (L)", total:750, date:"2024-11-29", paymentStatus:"paid", deliveryStatus:"shipped", trackingNumber:"SA-TRK-9923812", eftSent:true },
  { id:"GH-2024-0894", customer:"Lerato Pule", email:"lerato@gmail.com", phone:"+27611234567", address:"88 Vilakazi Street, Orlando, 1804", items:"Hot Pink Floral Statement Hat × 2 (M, L)", total:1840, date:"2024-11-30", paymentStatus:"pending", deliveryStatus:"received", trackingNumber:"SA-TRK-9923813", eftSent:false },
  { id:"GH-2024-0895", customer:"Zanele Mokoena", email:"zanele@gmail.com", phone:"+27841234567", address:"33 Church Street, Cape Town, 8000", items:"Candy Pink Bridal Set × 6", total:4200, date:"2024-12-01", paymentStatus:"proof_received", deliveryStatus:"received", trackingNumber:"SA-TRK-9923814", eftSent:true },
];

const EFT_DETAILS = `
BANK: FNB
Account Name: Goodies Hats
Account Number: 62012345678
Branch Code: 250655
Reference: [ORDER_ID]

Please send your proof of payment to:
📧 admin@goodieshats.co.za
💬 WhatsApp: +27 60 960 9830
`;

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selected, setSelected] = useState<Order | null>(null);
  const [tab, setTab] = useState<"orders"|"stats">("orders");
  const [filterPay, setFilterPay] = useState<string>("all");
  const [filterDel, setFilterDel] = useState<string>("all");
  const [showEFT, setShowEFT] = useState(false);
  const [eftOrder, setEftOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function updateOrder(id: string, changes: Partial<Order>) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, ...changes } : o));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, ...changes } : prev);
    showToast("Order updated ✓");
  }

  function deleteOrder(id: string) {
    if (!confirm(`Delete order ${id}? This cannot be undone.`)) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setSelected(null);
    showToast("Order deleted");
  }

  function sendEFT(order: Order) {
    setEftOrder(order);
    setShowEFT(true);
    updateOrder(order.id, { paymentStatus: "awaiting_proof", eftSent: true });
  }

  const filtered = orders.filter((o) => {
    if (filterPay !== "all" && o.paymentStatus !== filterPay) return false;
    if (filterDel !== "all" && o.deliveryStatus !== filterDel) return false;
    return true;
  });

  const stats = {
    total: orders.length,
    paid: orders.filter(o => o.paymentStatus === "paid").length,
    pending: orders.filter(o => o.paymentStatus === "pending" || o.paymentStatus === "awaiting_proof").length,
    proofReceived: orders.filter(o => o.paymentStatus === "proof_received").length,
    revenue: orders.filter(o => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium animate-fade-up">
          {toast}
        </div>
      )}

      {/* EFT Modal */}
      {showEFT && eftOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Send EFT Details — {eftOrder.id}</h3>
            <p className="text-sm text-gray-500 mb-2">Customer: <strong>{eftOrder.customer}</strong> · {eftOrder.email}</p>
            <pre className="bg-gray-50 border rounded-xl p-4 text-xs whitespace-pre-wrap mb-4 font-mono">
              {EFT_DETAILS.replace("[ORDER_ID]", eftOrder.id)}
            </pre>
            <div className="flex gap-3">
              <a href={`mailto:${eftOrder.email}?subject=Goodies Hats – EFT Payment Details (${eftOrder.id})&body=${encodeURIComponent(EFT_DETAILS.replace("[ORDER_ID]", eftOrder.id))}`}
                className="btn-gold flex-1 text-center text-sm py-2.5">📧 Send Email</a>
              <a href={`https://wa.me/${eftOrder.phone.replace(/\D/g,"")}?text=${encodeURIComponent("Hi! Here are your EFT payment details for order " + eftOrder.id + ":\n" + EFT_DETAILS.replace("[ORDER_ID]", eftOrder.id))}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white text-center text-sm py-2.5 rounded-full font-semibold">💬 WhatsApp</a>
            </div>
            <button onClick={() => setShowEFT(false)} className="w-full text-center text-gray-400 text-sm mt-4 hover:text-gray-600">Close</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#1A1A1A] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👒</span>
          <div>
            <p className="font-bold text-[#C9902D]">Goodies Hats</p>
            <p className="text-gray-400 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-gray-400 text-sm hover:text-white">View Site →</Link>
          <span className="bg-[#C9902D] text-white text-xs px-3 py-1 rounded-full font-bold">ADMIN</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label:"Total Orders", value: stats.total, icon:"📦", color:"bg-white" },
            { label:"Paid", value: stats.paid, icon:"✅", color:"bg-green-50" },
            { label:"Awaiting Payment", value: stats.pending, icon:"⏳", color:"bg-yellow-50" },
            { label:"Proof Received", value: stats.proofReceived, icon:"📸", color:"bg-blue-50" },
            { label:"Revenue", value: `R${stats.revenue.toLocaleString()}`, icon:"💰", color:"bg-[#C9902D]/10" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-4 card-shadow`}>
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{s.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl card-shadow p-4 mb-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-600">Payment:</label>
            <select value={filterPay} onChange={(e) => setFilterPay(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9902D]">
              <option value="all">All</option>
              {(Object.keys(PAYMENT_LABELS) as PaymentStatus[]).map((k) => <option key={k} value={k}>{PAYMENT_LABELS[k]}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-600">Delivery:</label>
            <select value={filterDel} onChange={(e) => setFilterDel(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9902D]">
              <option value="all">All</option>
              {(Object.keys(DELIVERY_LABELS) as DeliveryStatus[]).map((k) => <option key={k} value={k}>{DELIVERY_LABELS[k]}</option>)}
            </select>
          </div>
          <p className="ml-auto text-sm text-gray-400">{filtered.length} orders</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Orders table */}
          <div className="flex-1 bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide border-b grid grid-cols-[1fr_auto_auto_auto_auto] gap-3">
              <span>Customer</span><span>Total</span><span>Payment</span><span>Delivery</span><span>Actions</span>
            </div>
            {filtered.map((order) => (
              <div key={order.id} onClick={() => setSelected(order)}
                className={`px-5 py-4 border-b border-gray-50 cursor-pointer hover:bg-[#FDF8F0] transition-colors grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center ${selected?.id === order.id ? "bg-[#C9902D]/5 border-l-4 border-l-[#C9902D]" : ""}`}>
                <div>
                  <p className="font-semibold text-sm text-[#1A1A1A]">{order.customer}</p>
                  <p className="text-gray-400 text-xs">{order.id} · {order.date}</p>
                </div>
                <p className="font-bold text-sm">R{order.total.toLocaleString()}</p>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${PAYMENT_COLORS[order.paymentStatus]}`}>
                  {PAYMENT_LABELS[order.paymentStatus]}
                </span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-semibold">
                  {DELIVERY_LABELS[order.deliveryStatus]}
                </span>
                <button onClick={(e) => { e.stopPropagation(); deleteOrder(order.id); }}
                  className="text-red-400 hover:text-red-600 text-xs font-medium">Delete</button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-2">📭</p><p>No orders match filters</p>
              </div>
            )}
          </div>

          {/* Order detail panel */}
          {selected ? (
            <div className="xl:w-96 bg-white rounded-2xl card-shadow p-6 self-start sticky top-4 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#1A1A1A]">Order {selected.id}</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
              </div>

              {/* Customer info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-1.5 text-sm">
                <p><span className="text-gray-400">Customer:</span> <strong>{selected.customer}</strong></p>
                <p><span className="text-gray-400">Email:</span> {selected.email}</p>
                <p><span className="text-gray-400">Phone:</span> {selected.phone}</p>
                <p><span className="text-gray-400">Address:</span> {selected.address}</p>
                <p><span className="text-gray-400">Items:</span> {selected.items}</p>
                <p><span className="text-gray-400">Total:</span> <strong className="text-[#C9902D]">R{selected.total.toLocaleString()}</strong></p>
                <p><span className="text-gray-400">Tracking:</span> <span className="font-mono text-xs">{selected.trackingNumber}</span></p>
              </div>

              {/* Update Payment Status */}
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">💳 Payment Status</label>
                <select
                  value={selected.paymentStatus}
                  onChange={(e) => updateOrder(selected.id, { paymentStatus: e.target.value as PaymentStatus })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9902D]"
                >
                  {(Object.keys(PAYMENT_LABELS) as PaymentStatus[]).map((k) => (
                    <option key={k} value={k}>{PAYMENT_LABELS[k]}</option>
                  ))}
                </select>
              </div>

              {/* Update Delivery Status */}
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">🚚 Delivery Status</label>
                <select
                  value={selected.deliveryStatus}
                  onChange={(e) => updateOrder(selected.id, { deliveryStatus: e.target.value as DeliveryStatus })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9902D]"
                >
                  {DELIVERY_STEPS.map((k) => (
                    <option key={k} value={k}>{DELIVERY_LABELS[k]}</option>
                  ))}
                </select>
                {/* Progress dots */}
                <div className="flex gap-1 mt-2">
                  {DELIVERY_STEPS.map((s, i) => (
                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= DELIVERY_STEPS.indexOf(selected.deliveryStatus) ? "bg-[#C9902D]" : "bg-gray-200"}`} />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button onClick={() => sendEFT(selected)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${selected.eftSent ? "bg-gray-100 text-gray-500" : "btn-gold"}`}>
                  {selected.eftSent ? "✓ EFT Details Sent" : "📧 Send EFT Payment Details"}
                </button>
                {selected.eftSent && (
                  <button onClick={() => sendEFT(selected)} className="w-full py-2 text-xs text-[#C9902D] hover:underline">
                    Resend EFT Details
                  </button>
                )}
                <button onClick={() => deleteOrder(selected.id)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                  🗑️ Delete Order
                </button>
              </div>
            </div>
          ) : (
            <div className="xl:w-96 bg-white rounded-2xl card-shadow p-8 text-center text-gray-400 self-start">
              <p className="text-4xl mb-2">👆</p>
              <p className="text-sm">Click an order to manage it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
