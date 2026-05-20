"use client";

import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // লোকালহস্টে থাকলে http://localhost:5000 ব্যবহার করবে, নাহলে লাইভ URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    fetch(`${API_BASE_URL}/doctors`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return res.json();
      })
      .then((data) => {
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
      <div className="flex justify-center items-center min-h-[400px] bg-[#f4f7f6]">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
      </div>
    );
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
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Licensed physicians dedicated to providing comprehensive medical review and individualized prescription decisions
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