"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/utils";

interface SignupGateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const perks = [
  "3 free downloads every day",
  "No credit card required",
  "Access all tools instantly",
];

type View = "signup" | "login";

export function SignupGateModal({
  open,
  onClose,
  onSuccess,
}: SignupGateModalProps) {
  const [view, setView] = useState<View>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setLoading(false);
  };

  const switchView = (v: View) => {
    resetForm();
    setView(v);
  };

  const handleClose = () => {
    resetForm();
    setView("signup");
    onClose();
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const supabase = createClient();
    const currentPath = window.location.pathname;
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${getSiteUrl()}/callback?next=${encodeURIComponent(currentPath)}`,
      },
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    resetForm();
    onSuccess();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    resetForm();
    onSuccess();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#16131E] border border-[#2A2535] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="gradient-line" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-1">
                    {view === "signup"
                      ? "Create a free account"
                      : "Welcome back"}
                  </h2>
                  <p className="text-sm text-[#71717A]">
                    {view === "signup"
                      ? "Sign up to download your result"
                      : "Sign in to download your result"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-[#1C1825] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-[#71717A] hover:text-[#EDEDEF]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Perks (signup only) */}
              {view === "signup" && (
                <div className="flex items-center gap-4 mb-5 p-3 rounded-lg bg-[#2DD4BF]/5 border border-[#2DD4BF]/10">
                  <Zap className="w-5 h-5 text-[#2DD4BF] shrink-0" />
                  <div className="flex flex-col gap-1">
                    {perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-[#2DD4BF] shrink-0" />
                        <span className="text-xs text-[#EDEDEF]">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OAuth */}
              <div className="flex flex-col gap-3 mb-5">
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

              {/* Divider */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-[#2A2535]" />
                <span className="text-xs font-mono text-[#71717A] uppercase">
                  or
                </span>
                <div className="flex-1 h-px bg-[#2A2535]" />
              </div>

              {/* Form */}
              <form
                onSubmit={view === "signup" ? handleSignup : handleLogin}
                className="flex flex-col gap-4"
              >
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
                    minLength={6}
                    className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/60"
                    placeholder="••••••••"
                  />
                </div>

                {view === "signup" && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-[#71717A]">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/60"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-[#FB7185] text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {loading
                    ? view === "signup"
                      ? "Creating account..."
                      : "Signing in..."
                    : view === "signup"
                      ? "Sign Up Free"
                      : "Sign In"}
                </button>
              </form>

              {/* Toggle */}
              <p className="text-center mt-5 text-sm text-[#71717A]">
                {view === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchView("login")}
                      className="text-[#2DD4BF] hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchView("signup")}
                      className="text-[#2DD4BF] hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
