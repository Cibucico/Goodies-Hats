"use client";
import { useState } from "react";
import Image from "next/image";

const steps = [
  { num: 1, title: "Choose Your Style", desc: "Pick a hat base: wide brim, fascinator, pillbox or church hat" },
  { num: 2, title: "Pick Your Colours", desc: "Tell us your exact colour or match to a dress/fabric swatch" },
  { num: 3, title: "Upload Your Design", desc: "Share reference images or a sketch of what you have in mind" },
  { num: 4, title: "We Craft & Deliver", desc: "Our artisans handcraft your hat and deliver it in 14–21 days" },
];

const baseStyles = ["Wide Brim Sinamay", "Fascinator", "Pillbox / Structured", "Church Hat", "Bridal Veil Hat", "Isicholo-Inspired"];
const occasions = ["Wedding", "Funeral / Memorial", "Church Service", "Traditional Ceremony", "Graduation", "Other"];

export default function CustomPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ style: "", colour: "", occasion: "", notes: "", name: "", email: "", phone: "", date: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">🎉</p>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">Order Received!</h2>
          <p className="text-gray-600 mb-2">Thank you, <strong>{form.name}</strong>! Your custom hat request has been submitted.</p>
          <p className="text-gray-500 text-sm mb-6">Our team will contact you within 24 hours on <strong>{form.phone}</strong> or <strong>{form.email}</strong> to confirm details and pricing.</p>
          <div className="bg-[#C9902D]/10 border border-[#C9902D]/30 rounded-2xl p-5 text-left mb-6">
            <p className="font-semibold text-[#1A1A1A] mb-2">Your Order Summary</p>
            <p className="text-sm text-gray-600">Style: {form.style}</p>
            <p className="text-sm text-gray-600">Colour: {form.colour}</p>
            <p className="text-sm text-gray-600">Occasion: {form.occasion}</p>
            <p className="text-sm text-gray-600">Event date: {form.date}</p>
          </div>
          <p className="text-gray-400 text-sm">Estimated production: 14–21 days · Delivery across SA</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-16 text-center px-4">
        <p className="text-[#C9902D] uppercase tracking-widest text-xs font-semibold mb-3">🎨 Exclusive Service</p>
        <h1 className="text-5xl font-bold mb-4">Create Your Own Hat</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Upload your design, choose your colours, and our master hatmakers will craft it just for you. Delivered across South Africa.</p>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="section-heading text-center gold-underline mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-12 h-12 bg-[#C9902D] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">{s.num}</div>
              <h4 className="font-bold text-[#1A1A1A] mb-1">{s.title}</h4>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl card-shadow p-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Submit Your Custom Hat Request</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Style */}
            <div>
              <label className="block font-semibold text-sm text-[#1A1A1A] mb-2">Hat Style *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {baseStyles.map((s) => (
                  <button type="button" key={s} onClick={() => setForm({ ...form, style: s })}
                    className={`border-2 rounded-xl py-2 px-3 text-sm transition-all ${form.style === s ? "border-[#C9902D] bg-[#C9902D]/10 text-[#C9902D] font-semibold" : "border-gray-200 text-gray-600 hover:border-[#C9902D]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block font-semibold text-sm text-[#1A1A1A] mb-2">Occasion *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {occasions.map((o) => (
                  <button type="button" key={o} onClick={() => setForm({ ...form, occasion: o })}
                    className={`border-2 rounded-xl py-2 px-3 text-sm transition-all ${form.occasion === o ? "border-[#C9902D] bg-[#C9902D]/10 text-[#C9902D] font-semibold" : "border-gray-200 text-gray-600 hover:border-[#C9902D]"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour */}
            <div>
              <label className="block font-semibold text-sm text-[#1A1A1A] mb-2">Colour / Theme *</label>
              <input required value={form.colour} onChange={(e) => setForm({ ...form, colour: e.target.value })}
                placeholder="e.g. Royal Blue, Hot Pink, Black & Gold…" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D]" />
            </div>

            {/* Event date */}
            <div>
              <label className="block font-semibold text-sm text-[#1A1A1A] mb-2">Event Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D]" />
            </div>

            {/* Upload */}
            <div>
              <label className="block font-semibold text-sm text-[#1A1A1A] mb-2">Upload Design / Inspiration Image</label>
              <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${preview ? "border-[#C9902D]" : "border-gray-300 hover:border-[#C9902D]"}`}>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="design-upload" />
                <label htmlFor="design-upload" className="cursor-pointer">
                  {preview ? (
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <Image src={preview} alt="Your design" fill className="object-contain" />
                    </div>
                  ) : (
                    <div>
                      <p className="text-4xl mb-2">📸</p>
                      <p className="text-gray-500 text-sm">Click to upload your design, sketch or inspiration photo</p>
                      <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
              {preview && <p className="text-[#C9902D] text-xs mt-1">✓ Image uploaded: {file?.name}</p>}
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold text-sm text-[#1A1A1A] mb-2">Additional Notes</label>
              <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Describe your hat in detail — brim size, embellishments, feathers, flowers, beading…"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D] resize-none" />
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[["name","Your Full Name","text",true],["email","Email Address","email",true],["phone","WhatsApp / Phone","tel",true]].map(([field, placeholder, type, req]) => (
                <div key={field as string} className={field === "phone" ? "sm:col-span-2" : ""}>
                  <label className="block font-semibold text-sm text-[#1A1A1A] mb-2 capitalize">{field as string} *</label>
                  <input required={!!req} type={type as string} placeholder={placeholder as string}
                    value={form[field as keyof typeof form]} onChange={(e) => setForm({ ...form, [field as string]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D]" />
                </div>
              ))}
            </div>

            <button type="submit" className="btn-gold w-full py-4 text-base">
              Submit Custom Hat Request 👒
            </button>
            <p className="text-center text-gray-400 text-xs">We'll contact you within 24 hours · No payment until you approve the design</p>
          </form>
        </div>
      </section>
    </div>
  );
}
