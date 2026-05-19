"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  // password validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isLongEnough = password.length >= 6;

  // 🔥 already logged in → redirect home
  useEffect(() => {
    if (!isPending && session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      setError("Please fulfill all password requirements.");
      return;
    }

    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          image: photoUrl,
        },
        {
          onSuccess: () => {
            // ❌ IMPORTANT FIX:
            // এখানে redirect দিবে না
            // session auto handle করবে useSession
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Something went wrong.");
          },
        }
      );
    } catch (err) {
      setError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // loading state
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

  // if logged in, don't show form
  if (session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-4 py-10">

      <div className="w-full max-w-[390px] bg-white rounded-[40px] shadow p-6">

        <h2 className="text-2xl font-bold text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Avatar URL"
            className="w-full border p-2 rounded"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
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

          {/* validation */}
          <div className="text-xs space-y-1">
            <p className={isLongEnough ? "text-green-600" : "text-red-500"}>
              Min 6 characters
            </p>
            <p className={hasUppercase ? "text-green-600" : "text-red-500"}>
              At least 1 uppercase
            </p>
            <p className={hasLowercase ? "text-green-600" : "text-red-500"}>
              At least 1 lowercase
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}