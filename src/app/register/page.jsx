"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
    
      await authClient.signUp.email({
        email,
        password,
        name,
      }, {
        onSuccess: (ctx) => {
          console.log("Registration Success Hook:", ctx);
         
          window.location.href = "/home";
        },
        onError: (ctx) => {
          console.error("Registration Error Hook:", ctx);
         
          setError(ctx.error.message || "Something went wrong. Please try again.");
        }
      });
      
    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Create an Account</h2>
          
          {error && (
            <div className="alert alert-error text-sm py-2 rounded-lg mb-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name</span></label>
              <input 
                type="text" placeholder="John Doe" className="input input-bordered w-full" required 
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}