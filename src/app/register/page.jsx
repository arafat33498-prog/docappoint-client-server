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

  // 🔄 Better Auth সেশন স্টেট চেক
  const { data: session, isPending } = authClient.useSession();

  // রিয়েল-টাইম পাসওয়ার্ড ভ্যালিডেশন
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isLongEnough = password.length >= 6;

  // 🛡️ ইউজার অলরেডি লগইন থাকলে হোমে পাঠিয়ে দেওয়া হবে (ইনস্ট্যান্ট আপডেট নিশ্চিত করতে href)
  useEffect(() => {
    if (!isPending && session) {
      window.location.href = "/";
    }
  }, [session, isPending]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      setError("Please fulfill all password requirements.");
      return;
    }

    setLoading(true);

    try {
      // ১. Register করো
      const { error: signUpError } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoUrl || undefined, // ছবি না দিলে যেন ডাটাবেজে নাল বা আনডিফাইনড যায়
      });

      if (signUpError) {
        setError(signUpError.message || "Registration failed.");
        setLoading(false); // ✅ বাটন লোডিং রিলিজ করার ফিক্স
        return;
      }

      // ২. Auto Login করো
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || "Login failed.");
        setLoading(false); // ✅ বাটন লোডিং রিলিজ করার ফিক্স
        return;
      }

      // ৩. Home-এ রিডাইরেক্ট (ফুল উইন্ডো রিফ্রেশ সেশন ডাটা রিলোড করার জন্য)
      window.location.href = "/";

    } catch (err) {
      console.error("Unexpected Register Error:", err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  // ⏳ সেশন চেকিং লোডার
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
      <div className="w-full max-w-[390px] bg-white rounded-[45px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200 flex flex-col justify-between min-h-[820px] relative">
        
        {/* টপ আকাশী কালার সেকশন */}
        <div className="bg-sky-400 pt-14 pb-20 px-8 relative">
          <div className="absolute top-7 left-7 text-white cursor-pointer text-lg hover:scale-110 transition-transform z-10">
            <Link href="/login">←</Link>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-white tracking-normal z-10 relative">Sign Up</h2>
          
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="relative block w-full h-[60px]">
              <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" fill="#ffffff"></path>
            </svg>
          </div>
        </div>

        {/* ফর্ম এরিয়া */}
        <div className="px-7 pb-8 pt-2 flex-1 flex flex-col justify-between">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="alert alert-error text-xs py-2.5 rounded-2xl text-white font-medium shadow-sm mb-2">
                <span>{error}</span>
              </div>
            )}

            {/* Full Name */}
            <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-0.5">Full Name</label>
              <input 
                type="text" placeholder="John Doe" 
                className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder-slate-400/70" required 
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-0.5">Email Address</label>
              <input 
                type="email" placeholder="name@example.com" 
                className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder-slate-400/70" required 
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Photo URL (UX সহজ করতে required বাদ দেওয়া হয়েছে) */}
            <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-0.5">Avatar URL (Optional)</label>
              <input 
                type="url" placeholder="https://example.com/photo.jpg" 
                className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder-slate-400/70" 
                value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="bg-white rounded-xl p-2.5 px-4 border-2 border-slate-400 focus-within:border-sky-500 transition-all">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-0.5">Password</label>
              <input 
                type="password" placeholder="••••••••" 
                // 🎯 ফিক্স: টাইপ করার সময় ডটগুলো সুন্দর দেখাবে, কিন্তু প্লেসহোল্ডার ঠিক থাকবে
                className={`w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder-slate-400/70 placeholder:tracking-normal ${password ? 'tracking-widest' : 'tracking-normal'}`} 
                required 
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* পাসওয়ার্ড ভ্যালিডেশন টেক্সট */}
            <div className="px-2 pt-0.5 space-y-1">
              <p className={`text-[11px] font-bold tracking-wide transition-colors flex items-center gap-1.5 ${isLongEnough ? "text-emerald-600" : "text-rose-500"}`}>
                <span>{isLongEnough ? "✓" : "•"}</span> Minimum 6 characters
              </p>
              <p className={`text-[11px] font-bold tracking-wide transition-colors flex items-center gap-1.5 ${hasUppercase ? "text-emerald-600" : "text-rose-500"}`}>
                <span>{hasUppercase ? "✓" : "•"}</span> At least 1 uppercase letter (A-Z)
              </p>
              <p className={`text-[11px] font-bold tracking-wide transition-colors flex items-center gap-1.5 ${hasLowercase ? "text-emerald-600" : "text-rose-500"}`}>
                <span>{hasLowercase ? "✓" : "•"}</span> At least 1 lowercase letter (a-z)
              </p>
            </div>

            {/* সাবমিট বাটন */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-slate-950 text-white rounded-xl font-bold tracking-wide text-sm shadow-md active:scale-[0.98] transition-all hover:bg-slate-900 flex justify-center items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <span className="loading loading-spinner loading-sm text-white"></span> : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="text-center text-xs font-bold text-slate-500 mt-6 tracking-normal">
            Already have an account?{" "}
            
            <Link href="/login" className="text-sky-500 font-extrabold hover:underline transition-all pl-0.5">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}