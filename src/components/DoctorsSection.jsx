"use client";

import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API URL এনভায়রনমেন্ট ভেরিয়েবল থেকে সরাসরি নেওয়া
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${API_URL}/doctors`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        // ডাটাবেজের ডাটা সরাসরি ডাইনামিক্যালি হ্যান্ডেল করা
        setDoctors(data.slice(0, 3)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
      </div>
    );
  }

  // যদি কোনো ডাক্তার না পাওয়া যায়
  if (!loading && doctors.length === 0) {
    return <p className="text-center py-20 text-slate-500">No doctors available at the moment.</p>;
  }

  return (
    <section className="bg-[#f4f7f6] py-24 px-4 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="bg-[#e4ecea] text-slate-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-slate-200">
            Expert Medical Professionals
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-3 tracking-tight">
            Meet our expert team
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Licensed physicians dedicated to providing comprehensive medical review and individualized prescription decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;