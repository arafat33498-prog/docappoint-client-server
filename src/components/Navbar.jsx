"use client";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user; 

  
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            
            window.location.href = "/login";
          },
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-sky-600 font-bold text-lg">DocAppoint</span>
        </Link>

        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/home" className="text-gray-600 hover:text-sky-500 text-sm font-medium">Home</Link>
          <Link href="/appointments" className="text-gray-600 hover:text-sky-500 text-sm font-medium">All Appointments</Link>
          <Link href="/dashboard/bookings" className="text-gray-600 hover:text-sky-500 text-sm font-medium">Dashboard</Link>
        </div>

      
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            
            <span className="loading loading-spinner loading-sm text-sky-500"></span>
          ) : user ? (
            
            <>
              <div className="flex items-center gap-2 mr-2">
                <div className="w-9 h-9 rounded-full bg-sky-100 border-2 border-sky-500 flex items-center justify-center text-sky-600 font-bold uppercase text-sm">
                  {user.name?.[0]} 
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm px-5 py-2 rounded-full border border-sky-500 text-sky-500 hover:bg-sky-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
           
            <>
              <Link href="/login" className="text-sm px-5 py-2 rounded-full border border-gray-400 text-gray-600 hover:border-sky-500 hover:text-sky-500 transition">
                Login
              </Link>
              <Link href="/register" className="text-sm px-5 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition">
                Register
              </Link>
            </>
          )}
        </div>

       
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link href="/home" className="text-gray-600 text-sm font-medium">Home</Link>
          <Link href="/appointments" className="text-gray-600 text-sm font-medium">All Appointments</Link>
          <Link href="/dashboard/bookings" className="text-gray-600 text-sm font-medium">Dashboard</Link>
          
          <div className="border-t border-gray-100 pt-3">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-sky-500"></span>
            ) : user ? (
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-500 flex items-center justify-center text-sky-600 font-bold uppercase text-xs">
                    {user.name?.[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm px-5 py-2 text-center rounded-full border border-sky-500 text-sky-500 hover:bg-sky-50 w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              
              <div className="flex gap-3">
                <Link href="/login" className="text-sm px-5 py-2 text-center rounded-full border border-gray-400 text-gray-600 w-full">
                  Login
                </Link>
                <Link href="/register" className="text-sm px-5 py-2 text-center rounded-full bg-sky-500 text-white w-full">
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