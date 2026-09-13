"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Check if admin
    if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || email === "admin@goodieshats.co.za") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl card-shadow p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-4xl">👒</span>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mt-2">Sign In</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back to Goodies Hats</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Email Address</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9902D]"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full py-3 mt-2 disabled:opacity-60">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#C9902D] font-semibold hover:underline">Sign Up</Link>
        </p>

        {/* Admin hint */}
        <div className="mt-6 p-4 bg-[#1A1A1A] rounded-2xl text-center">
          <p className="text-gray-400 text-xs">Admin?</p>
          <p className="text-white text-xs font-mono mt-1">admin@goodieshats.co.za</p>
        </div>
      </div>
    </div>
  );
}
