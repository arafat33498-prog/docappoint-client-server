"use client";
import React, { useEffect, useState } from 'react';

const DashboardOverview = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings for overview:", err);
        setLoading(false);
      });
  }, []);

  
  const totalBookings = bookings.length;
  
  const pendingBookings = bookings.filter(
    (b) => !b.status || b.status.toLowerCase() === "pending"
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

  return (
    <div className="space-y-8">
      
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Hello, Patient! 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1.5 max-w-md leading-relaxed">
          Manage your appointments, check your booking status, or update your medical profile details seamlessly.
        </p>
      </div>

      
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