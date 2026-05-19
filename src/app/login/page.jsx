"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/");

  const { data: session, isPending } = authClient.useSession();

  // 🔄 get redirect url safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const from = searchParams.get("redirect") || "/";
      setRedirectUrl(from);
    }
  }, []);

  // 🛡️ already logged in → redirect
  useEffect(() => {
    if (!isPending && session) {
      router.replace(redirectUrl);
    }
  }, [session, isPending, redirectUrl, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            // ❌ FIX: no window.location.href (this caused bug)
            router.replace(redirectUrl);
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Invalid email or password.");
          },
        }
      );
    } catch (err) {
      setError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ session loading
  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f8]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
        <p className="mt-2 text-sm font-bold text-slate-500">
          Checking Session...
        </p>
      </div>
    );
  }

  // if already logged in
  if (session) {
    router.replace(redirectUrl);
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-4 py-10 font-sans text-slate-800 tracking-tight">

      {/* 📱 Card */}
      <div className="w-full max-w-[390px] bg-white rounded-[45px] shadow border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="bg-sky-400 pt-14 pb-24 px-8 relative flex flex-col items-center">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mb-2">
            🔐
          </div>

          <h2 className="text-3xl font-extrabold text-white">Login</h2>

          <svg viewBox="0 0 500 150" className="absolute bottom-0 w-full h-[65px]">
            <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" fill="#ffffff"></path>
          </svg>
        </div>

        {/* Form */}
        <div className="px-8 pb-10 pt-4">

          <form onSubmit={handleLogin} className="space-y-4">

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-2 rounded"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have account?{" "}
            <Link href="/register" className="text-blue-500">
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}