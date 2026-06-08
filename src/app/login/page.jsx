"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
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

    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => { router.push(redirectUrl); router.refresh(); },
        onError: (ctx) => { setError(ctx.error.message || "Login failed"); setLoading(false); },
      }
    );
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && <div className="bg-red-500 text-white text-sm px-4 py-3 rounded-xl">{error}</div>}
      <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full py-3 bg-slate-950 text-white rounded-xl">
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[390px] p-8 bg-white rounded-[45px] shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6">Login</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
        <p className="text-center mt-6 text-sm">
          Don't have an account? <Link href="/register" className="text-sky-500 font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
}