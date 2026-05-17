"use client";

import React, { useEffect, useState } from 'react';
import DoctorCard from '@/components/DoctorCard'; 

const AllAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/doctors')
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
  }, []);

 
  useEffect(() => {
    let result = [...doctors];

   
    if (searchQuery) {
      result = result.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    if (sortBy === "lowToHigh") {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === "highToLow") {
      result.sort((a, b) => b.fee - a.fee);
    }

    setFilteredDoctors(result);
  }, [searchQuery, sortBy, doctors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f4f7f6]">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
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

       
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-10">
          
        
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by Doctor Name..."
              className="input input-bordered w-full bg-[#f4f7f6] border-slate-200 text-slate-800 focus:outline-none focus:border-slate-400 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
          </div>

          <div className="w-full md:w-auto">
            <select 
              className="select select-bordered w-full md:w-56 bg-[#f4f7f6] border-slate-200 text-slate-700 focus:outline-none"
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