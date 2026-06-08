"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; // better-auth client

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Better Auth ইমেইল লগইন
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            router.push(redirectUrl);
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Login failed");
            setLoading(false);
          },
        }
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-4 py-10 font-sans text-slate-800 tracking-tight">
      <div className="w-full max-w-[390px] bg-white rounded-[45px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200 flex flex-col justify-between min-h-[730px] relative">

        {/* Top Banner */}
        <div className="bg-sky-400 pt-14 pb-24 px-8 relative flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center z-10 mb-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-950 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 2.02.6 3.9 1.63 5.48L2.05 22l4.64-1.58C8.1 21.4 9.98 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
            </svg>
          </div>
          {/* ... (SVG Banner Wave code remains same) ... */}
        </div>

        {/* Form Area */}
        <div className="px-8 pb-10 pt-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-center text-slate-900 tracking-normal mb-6">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-500 text-white text-sm px-4 py-3 rounded-xl">{error}</div>
              )}

              {/* Email */}
              <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-0.5">Email Address</label>
                <input type="email" placeholder="name@example.com" className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              {/* Password */}
              <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              {/* Button */}
              <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-950 text-white rounded-xl font-bold text-sm shadow-md transition-all hover:bg-slate-900">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          <div className="text-center text-xs font-semibold text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-sky-500 font-extrabold hover:underline">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}