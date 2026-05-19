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
      const params = new URLSearchParams(window.location.search);
      setRedirectUrl(params.get("redirect") || "/");
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
            // ✅ SAFE redirect (no reload bug)
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

  // ⏳ loading session check
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking Session...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">

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

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}