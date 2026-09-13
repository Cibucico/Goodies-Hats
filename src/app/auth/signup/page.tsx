"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.name, phone: form.phone } },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
  }

  if (success) return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl card-shadow p-8 max-w-md w-full text-center">
        <p className="text-5xl mb-4">📧</p>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Check Your Email</h2>
        <p className="text-gray-500 mb-6">We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.</p>
        <Link href="/auth/signin" className="btn-gold">Go to Sign In</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl card-shadow p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">👒</span>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mt-2">Create Account</h1>
          <p className="text-gray-400 text-sm mt-1">Join Goodies Hats — track orders & get exclusive deals</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          {[
            { field: "name", label: "Full Name", type: "text", placeholder: "Nomsa Dlamini" },
            { field: "email", label: "Email Address", type: "email", placeholder: "nomsa@example.com" },
            { field: "phone", label: "WhatsApp / Phone", type: "tel", placeholder: "+27 83 123 4567" },
            { field: "password", label: "Password", type: "password", placeholder: "At least 8 characters" },
            { field: "confirm", label: "Confirm Password", type: "password", placeholder: "Repeat password" },
          ].map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">{label}</label>
              <input
                type={type} required placeholder={placeholder}
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D]"
              />
            </div>
          ))}

          <button type="submit" disabled={loading} className="btn-gold w-full py-3 mt-2 disabled:opacity-60">
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#C9902D] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
