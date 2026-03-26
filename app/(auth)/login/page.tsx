"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/callback` },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
          Welcome back
        </h1>
        <p className="text-[#71717A]">Sign in to your account</p>
      </div>

      <div className="bg-[#16131E] border border-[#2A2535] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="flex items-center justify-center gap-2 h-12 border border-[#2A2535] bg-[#0C0A12] rounded-lg text-[#EDEDEF] hover:border-[#2DD4BF]/30 transition-colors font-mono text-sm uppercase tracking-wider min-h-[44px]"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="flex items-center justify-center gap-2 h-12 border border-[#2A2535] bg-[#0C0A12] rounded-lg text-[#EDEDEF] hover:border-[#2DD4BF]/30 transition-colors font-mono text-sm uppercase tracking-wider min-h-[44px]"
          >
            GitHub
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[#2A2535]" />
          <span className="text-xs font-mono text-[#71717A] uppercase">or</span>
          <div className="flex-1 h-px bg-[#2A2535]" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-[#71717A]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/60"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-[#71717A]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/60"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[#FB7185] text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="text-center mt-6 text-sm text-[#71717A]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-[#2DD4BF] hover:underline font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
