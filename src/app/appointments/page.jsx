"use client";

import React, { useEffect, useState } from "react";
import DoctorCard from "@/components/DoctorCard";

const AllAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all doctors:", err);
        setLoading(false);
      });
  }, [API_URL]);

  useEffect(() => {
    let result = [...doctors];

    if (searchQuery) {
      result = result.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "lowToHigh") {
      result.sort((a, b) => Number(a.fee) - Number(b.fee));
    } else if (sortBy === "highToLow") {
      result.sort((a, b) => Number(b.fee) - Number(a.fee));
    }

    setFilteredDoctors(result);
  }, [searchQuery, sortBy, doctors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f4f7f6]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
      </div>
    );
  }

  return (
    <section className="bg-[#f4f7f6] min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            All Available Appointments
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Find and book appointments with our world-class medical experts
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-6 rounded-3xl shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] border border-slate-100 mb-10">
          <div className="relative w-full md:max-w-lg p-[2px] rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 shadow-sm transition-all duration-300 focus-within:shadow-md">
            <div className="flex items-center bg-white rounded-full px-5 py-3 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-sky-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
              <div className="h-5 w-[1px] bg-slate-200 mx-3.5" />
              <input
                type="text"
                placeholder="Search for a doctor..."
                className="w-full bg-transparent border-none outline-none text-slate-700 font-medium placeholder-slate-400 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <select
              className="select select-bordered w-full md:w-60 bg-[#f4f7f6] border-slate-200 text-slate-700 font-medium rounded-2xl focus:outline-none focus:border-sky-400 transition-all"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by Consultation Fee</option>
              <option value="lowToHigh">Fee: Low to High</option>
              <option value="highToLow">Fee: High to Low</option>
            </select>
          </div>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <p className="text-xl font-medium text-slate-400">
              No doctors found with the name "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllAppointments;