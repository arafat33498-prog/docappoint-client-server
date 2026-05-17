"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = null;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-green-800 font-bold text-lg">DocAppoint</span>
        </Link>

        {/* Middle Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-green-700 text-sm font-medium">Home</Link>
          <Link href="/appointments" className="text-gray-600 hover:text-green-700 text-sm font-medium">All Appointments</Link>
          <Link href="/dashboard/bookings" className="text-gray-600 hover:text-green-700 text-sm font-medium">Dashboard</Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <img src="https://i.pravatar.cc/100" alt="profile" className="w-9 h-9 rounded-full border-2 border-green-700" />
              <button className="text-sm px-5 py-2 rounded-full border border-green-700 text-green-700 hover:bg-green-50">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm px-5 py-2 rounded-full border border-gray-400 text-gray-600 hover:border-green-700 hover:text-green-700">
                Login
              </Link>
              <Link href="/register" className="text-sm px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-gray-600 text-sm">Home</Link>
          <Link href="/appointments" className="text-gray-600 text-sm">All Appointments</Link>
          <Link href="/dashboard/bookings" className="text-gray-600 text-sm">Dashboard</Link>
          <div className="flex gap-3">
            <Link href="/login" className="text-sm px-5 py-2 rounded-full border border-gray-400 text-gray-600">Login</Link>
            <Link href="/register" className="text-sm px-5 py-2 rounded-full bg-green-700 text-white">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
}