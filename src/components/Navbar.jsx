"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import { authClient } from "@/lib/auth-client"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); 

  // 🔄 Better Auth real-time session hook
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user; 

  // Page change hole jate auto session check kore
  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // Full refresh to clear cookies/session cache completely
            window.location.href = "/login";
          },
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-[92%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">

        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white font-black text-lg shadow-[0_4px_12px_rgba(14,165,233,0.2)]">
            D
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            Doc<span className="text-sky-500 font-extrabold">Appoint</span>
          </span>
        </Link>

        {/* ডেস্কটপ মেনু */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { name: "Find Doctors", path: "/doctors" },
            { name: "My Appointments", path: "/dashboard" },
            { name: "Services", path: "/#services" },
          ].map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                  isActive ? "text-sky-500" : "text-gray-600 hover:text-sky-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* অথেনটিকেশন বাটন (ডেস্কটপ) */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-sky-500"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer btn btn-ghost p-1 rounded-full">
                {user.image ? (
                  <img src={user.image} alt="profile" className="w-9 h-9 rounded-full border-2 border-sky-500 object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-sky-100 border-2 border-sky-500 flex items-center justify-center text-sky-600 font-bold uppercase text-sm">
                    {user.name?.[0]}
                  </div>
                )}
                <span className="text-sm font-bold text-gray-700 hidden lg:inline-block">{user.name}</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-2xl w-52 mt-2 border border-gray-100">
                <li className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</li>
                <li><Link href="/dashboard" className="font-semibold text-gray-700">My Bookings</Link></li>
                <hr className="my-1 border-gray-100" />
                <li>
                  <button onClick={handleLogout} className="font-bold text-rose-500 hover:bg-rose-50">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-sky-500 px-4 py-2 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="text-sm font-bold bg-slate-950 text-white px-5 py-2.5 rounded-xl hover:bg-slate-900 transition-all shadow-md active:scale-[0.98]">
                Create Account
              </Link>
            </div>
          )}
        </div>

        {/* মোবাইল মেনু বাটন */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* মোবাইল ড্রয়ার */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4 shadow-inner">
          <div className="flex flex-col gap-3">
            <Link href="/doctors" className="text-sm font-semibold text-gray-700" onClick={() => setMenuOpen(false)}>Find Doctors</Link>
            <Link href="/dashboard" className="text-sm font-semibold text-gray-700" onClick={() => setMenuOpen(false)}>My Appointments</Link>
          </div>
          <hr className="border-gray-100" />
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {user.image ? (
                  <img src={user.image} alt="profile" className="w-8 h-8 rounded-full border border-sky-500 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-500 flex items-center justify-center text-sky-600 font-bold uppercase text-xs">
                    {user.name?.[0]}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="text-sm px-5 py-2 text-center rounded-full border border-rose-500 text-rose-500 hover:bg-rose-50 w-full transition-colors font-medium">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className="text-sm px-5 py-2 text-center rounded-xl border border-gray-300 text-gray-600 w-full font-bold" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/register" className="text-sm px-5 py-2 text-center rounded-xl bg-sky-500 text-white w-full font-bold" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}