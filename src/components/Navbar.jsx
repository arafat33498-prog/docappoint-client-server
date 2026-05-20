"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; 
import { authClient } from "@/lib/auth-client"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); 

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      // Hard redirect to ensure navbar updates
      setTimeout(() => {
        window.location.href = "/home";
      }, 200);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-[92%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 select-none">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-950">
            Doc<span className="text-sky-500">Appoint</span>
          </span>
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/home" 
            className={`text-sm font-medium transition-colors ${
              pathname === "/home" ? "text-sky-500 font-semibold" : "text-gray-600 hover:text-sky-500"
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/appointments" 
            className={`text-sm font-medium transition-colors ${
              pathname === "/appointments" ? "text-sky-500 font-semibold" : "text-gray-600 hover:text-sky-500"
            }`}
          >
            All Appointments
          </Link>
          
          {user && (
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/dashboard") ? "text-sky-500 font-semibold" : "text-gray-600 hover:text-sky-500"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* User Profile & Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-sky-500"></span>
          ) : user ? (
            <>
              <div className="flex items-center gap-2 mr-2 select-none">
                {user.image ? (
                  <img src={user.image} alt="profile" className="w-9 h-9 rounded-full border-2 border-sky-500 object-cover shadow-sm" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-sky-100 border-2 border-sky-500 flex items-center justify-center text-sky-600 font-bold uppercase text-sm">
                    {user.name?.[0] || "U"}
                  </div>
                )}
                <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">{user.name || "User"}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm px-5 py-2 rounded-full border border-rose-500 text-rose-500 hover:bg-rose-50 transition-all font-medium cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm px-5 py-2 rounded-full border border-gray-400 text-gray-600 hover:border-sky-500 hover:text-sky-500 transition-all font-medium">
                Login
              </Link>
              <Link href="/register" className="text-sm px-5 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-all font-medium shadow-sm">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link 
            href="/home" 
            className={`text-sm font-medium ${pathname === "/home" ? "text-sky-500 font-semibold" : "text-gray-600"}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            href="/appointments" 
            className={`text-sm font-medium ${pathname === "/appointments" ? "text-sky-500 font-semibold" : "text-gray-600"}`}
            onClick={() => setMenuOpen(false)}
          >
            All Appointments
          </Link>
          
          {user && (
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium ${pathname.startsWith("/dashboard") ? "text-sky-500 font-semibold" : "text-gray-600"}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          
          <div className="border-t border-gray-100 pt-3">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {user.image ? (
                    <img src={user.image} alt="profile" className="w-8 h-8 rounded-full border border-sky-500 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-500 flex items-center justify-center text-sky-600 font-bold uppercase text-xs">
                      {user.name?.[0] || "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{user.name || "User"}</span>
                </div>
                <button 
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-sm px-5 py-2 text-center rounded-full border border-rose-500 text-rose-500 hover:bg-rose-50 w-full transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="text-sm px-5 py-2 text-center rounded-full border border-gray-400 text-gray-600 w-full" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="text-sm px-5 py-2 text-center rounded-full bg-sky-500 text-white w-full" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}