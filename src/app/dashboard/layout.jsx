"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client"; // আপনার কনফিগার করা ক্লায়েন্ট

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // better-auth এর সেশন হুক
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // লোডিং শেষ হওয়ার পর চেক করুন ইউজার আছে কি না
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: "📊" },
    { name: "My Bookings", path: "/dashboard/my-appointments", icon: "📅" }, 
    { name: "My Profile", path: "/dashboard/my-profile", icon: "👤" }, 
  ];

  // যতক্ষণ সেশন চেক হচ্ছে, ততক্ষণ কিছুই রেন্ডার না করা ভালো
  if (isPending) return null; 

  return (
    <div className="flex bg-[#f4f7f6] min-h-screen text-slate-800">
      
      {/* ─── সাইডবার ─── */}
      <aside className="w-64 bg-white border-r border-slate-200/60 hidden md:flex flex-col justify-between p-6 shrink-0">
        <div>
          <div className="mb-10 px-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Doc<span className="text-sky-500">Appoint</span></h2>
            <p className="text-xs text-slate-400 mt-1">Patient Dashboard</p>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-slate-900 text-white shadow-md" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}>
                    <span className="text-base">{item.icon}</span>
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <button 
            onClick={() => authClient.signOut()} // সরাসরি এখান থেকে সাইন আউট
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            🚪 <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ─── মেইন কন্টেন্ট ─── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="h-16 bg-white border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 shrink-0">
          <div className="md:hidden font-bold text-lg text-slate-900">
            Doc<span className="text-sky-500">Appoint</span>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-800">{session?.user?.name}</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Patient</p>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-200 flex items-center justify-center text-white font-bold text-sm overflow-hidden shadow-sm">
              {session?.user?.image ? (
                <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{getInitial(session?.user?.name)}</span>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}