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

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isLongEnough = password.length >= 6;

  // ✅ already logged in user → home
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
            // ❌ IMPORTANT: এখানে কোনো router.push নাই
            // session auto update হবে useSession দিয়ে
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

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="space-y-4">

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Photo URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <Link href="/login">Login</Link>
      </form>
    </div>
  );
}