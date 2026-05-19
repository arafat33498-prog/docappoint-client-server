"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// 🔗 Better Auth ক্লায়েন্ট ইম্পোর্ট করলাম
import { authClient } from '@/lib/auth-client'; 

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // 🔐 Better Auth থেকে রিয়েল-টাইম লগইন থাকা ইউজারের সেশন ডাটা আনা হচ্ছে
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // 📝 নাম থেকে প্রথম অক্ষর বের করার হেল্পার ফাংশন
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: "📊" },
    { name: "My Bookings", path: "/dashboard/my-appointments", icon: "📅" }, 
    { name: "My Profile", path: "/dashboard/my-profile", icon: "👤" }, 
  ];

  return (
    <div className="flex bg-[#f4f7f6] min-h-screen text-slate-800">
      
      {/* ─── সাইডবার (Sidebar) ─── */}
      <aside className="w-64 bg-white border-r border-slate-200/60 hidden md:flex flex-col justify-between p-6 shrink-0">
        <div>
          {/* লোগো এরিয়া */}
          <div className="mb-10 px-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Doc<span className="text-sky-500">Appoint</span></h2>
            <p className="text-xs text-slate-400 mt-1">Patient Dashboard</p>
          </div>

          {/* নেভিগেশন মেনু */}
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

        {/* সাইডবার বটম বাটন */}
        <div className="pt-6 border-t border-slate-100">
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
              🚪 <span>Back to Home</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* ─── মেইন কন্টেন্ট এরিয়া (Main Content) ─── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* হেডার (Header) */}
        <header className="h-16 bg-white border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 shrink-0">
          <div className="md:hidden font-bold text-lg text-slate-900">
            Doc<span className="text-sky-500">Appoint</span>
          </div>
          <div className="hidden md:block text-sm font-medium text-slate-400">
            Welcome back!
          </div>
          
          {/* 🎯 Better Auth এর ডাটা দিয়ে ডাইনামিক প্রোফাইল এরিয়া */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              {/* ডাটাবেজ থেকে আসা আসল নাম দেখাবে */}
              <p className="text-xs font-semibold text-slate-800">
                {isPending ? "Loading..." : (user?.name || "Patient User")}
              </p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                Patient
              </p>
            </div>
            
            {/* 📸 ডাইনামিক ইমেজ কন্টেইনার */}
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-200 flex items-center justify-center text-white font-bold text-sm overflow-hidden shadow-sm select-none">
              {!isPending && user?.image ? (
                // ফায়ারবেস/গুগল লগইন বা আপলোড করা ছবি থাকলে সেটি দেখাবে (Better Auth-এ ফিল্ডের নাম 'image')
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // ইমেজ ইউআরএলে সমস্যা হলে ক্র্যাশ না করে টেক্সট ব্যাকআপ দেখাবে
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                // সেশন লোড হওয়ার সময় বা ছবি না থাকলে নামের প্রথম অক্ষর দেখাবে
                <span>{getInitial(user?.name)}</span>
              )}
            </div>
          </div>
        </header>

        {/* চিলড্রেন পেজসমূহ */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}