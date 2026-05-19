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

  // 🔄 Better Auth সেশন স্টেট চেক
  const { data: session, isPending } = authClient.useSession();

  // ইউআরএল থেকে প্রটেক্টেড পেজের লিংক ট্র্যাক করা
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const from = searchParams.get("redirect") || "/";
      setRedirectUrl(from);
    }
  }, []);

  // 🛡️ ইউজার অলরেডি লগইন থাকলে তাকে রিডাইরেক্ট করতে হবে
  useEffect(() => {
    if (!isPending && session) {
      router.push(redirectUrl);
    }
  }, [session, isPending, redirectUrl, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    loading(true); // fix loading state triggering safely
    setLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
      }, {
        onSuccess: (ctx) => {
          console.log("Login Success Hook:", ctx);
          // সফল লগইন হলে ফুল রিফ্রেশ দিয়ে হোমে বা আগের পেজে নিয়ে যাবে
          window.location.href = redirectUrl;
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

  // ⏳ ডাটা বা সেশন চেক হওয়ার সময় লোডিং স্পিনার
  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f8]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
        <p className="mt-2 text-sm font-bold text-slate-500 tracking-wide">Checking Session...</p>
      </div>
    );
  }

  if (session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-4 py-10 font-sans text-slate-800 tracking-tight">
      <div className="w-full max-w-[390px] bg-white rounded-[45px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200 flex flex-col justify-between min-h-[730px] relative">
        
        {/* টপ আকাশী কালার সেকশন */}
        <div className="bg-sky-400 pt-14 pb-24 px-8 relative flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center z-10 mb-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-950 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 2.02.6 3.9 1.63 5.48L2.05 22l4.64-1.58C8.1 21.4 9.98 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="relative block w-full h-[65px]">
              <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" fill="#ffffff"></path>
            </svg>
          </div>
        </div>

        {/* ফর্ম এরিয়া */}
        <div className="px-8 pb-10 pt-2 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-center text-slate-900 tracking-normal mb-6">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="alert alert-error text-xs py-2.5 rounded-xl text-white font-medium shadow-sm mb-2">
                  <span>{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-0.5">Email Address</label>
                <input 
                  type="email" placeholder="name@example.com" 
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder-slate-400/70" required 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
                <div className="flex justify-between items-center mb-0.5">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Password</label>
                  <Link href="#" className="text-[10px] font-bold text-sky-500 hover:underline">Forgot Password?</Link>
                </div>
                <input 
                  type="password" placeholder="••••••••" 
                  className="w-full bg-transparent text-sm font-bold tracking-widest text-slate-900 outline-none placeholder-slate-400/70" required 
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 bg-slate-950 text-white rounded-xl font-bold tracking-wide text-sm shadow-md active:scale-[0.98] transition-all hover:bg-slate-900 flex justify-center items-center"
                >
                  {loading ? <span className="loading loading-spinner loading-sm text-white"></span> : "Sign In"}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center text-xs font-semibold text-slate-500 mt-8 tracking-normal">
            Don't have an account?{" "}
            <Link href="/register" className="text-sky-500 font-extrabold hover:underline transition-all pl-0.5">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}