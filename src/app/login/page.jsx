"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     
      await authClient.signIn.email({
        email,
        password,
      }, {
        onSuccess: (ctx) => {
          console.log("Login Success Hook:", ctx);
         
          window.location.href = "/home";
        },
        onError: (ctx) => {
          console.error("Login Error Hook:", ctx);
          setError(ctx.error.message || "Invalid email or password.");
        }
      });
      
    } catch (err) {
      console.error("Unexpected Login Error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Welcome Back</h2>

          {error && (
            <div className="alert alert-error text-sm py-2 rounded-lg mb-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input 
                type="email" placeholder="example@mail.com" className="input input-bordered w-full" required 
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input 
                type="password" placeholder="••••••••" className="input input-bordered w-full" required 
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="link link-primary font-semibold">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}