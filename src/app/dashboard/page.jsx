"use client";
import React, { useEffect, useState } from 'react';
import { getUser } from "@/lib/auth"; // আপনার Auth ইউটিলিটি ফাইল থেকে ইম্পোর্ট করুন

const DashboardOverview = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage থেকে ইউজার ডাটা নেওয়া
    const currentUser = getUser();
    setUser(currentUser);

    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    // JWT টোকেন নিয়ে API রিকোয়েস্ট করা
    const token = localStorage.getItem("docappointToken");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${currentUser.email}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // JWT টোকেন যোগ করা
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching overview bookings:", err);
        setLoading(false);
      });
  }, []);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (b) => !b.status || b.status?.toLowerCase() === "pending"
  ).length;
  const completedBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "approved" || b.status?.toLowerCase() === "completed"
  ).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-10 text-red-500 font-medium">Please log in to view dashboard.</div>;
  }

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* টপ ব্যানার */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Hello, {user?.name || "Patient"}! 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1.5 max-w-md leading-relaxed">
          Manage your appointments, check your booking status, or update your medical profile details seamlessly.
        </p>
      </div>

      {/* ৩টি কাউন্টার কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-xl">📅</div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Bookings</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalBookings}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-xl">⏳</div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Status</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{pendingBookings}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">✅</div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Completed / Approved</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{completedBookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;