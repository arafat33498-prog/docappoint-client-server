"use client"; 
import React from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";

const DoctorCard = ({ doctor }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
 
  const { _id, id, name, specialty, image, experience } = doctor;
  const doctorId = _id || id; 

  const handleDetailsClick = () => {
    // ✅ URL Path fixed to dynamic doctor details route
    const targetUrl = `/doctors/${doctorId}`;
    
    if (session) {
      router.push(targetUrl);
    } else {
      router.push(`/login?redirect=${targetUrl}`);
    }
  };

  return (
    <div className="relative w-full h-[480px] rounded-[32px] overflow-hidden bg-[#dce4e2] shadow-sm border border-white/20 group">
      {/* ডক্টরের ছবি */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
      />

      {/* কন্টেন্ট এবং হোভার ইফেক্ট এরিয়া */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 flex flex-col justify-end px-8 pb-8 bg-gradient-to-t from-[#bac7c5]/90 via-[#bac7c5]/60 to-transparent backdrop-blur-[12px]">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight mb-1">
            {name}
          </h2>
          <p className="text-sm font-medium text-slate-600">
            {specialty} • {experience}
          </p>
        </div>

        {/* হোভার করলে এই বাটনটি নিচ থেকে মসৃণভাবে উপরে উঠবে */}
        <div className="absolute inset-x-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out挂">
          <button 
            onClick={handleDetailsClick}
            className="w-full py-3.5 bg-slate-950 text-white rounded-2xl font-bold text-sm shadow-md active:scale-[0.98] transition-all hover:bg-slate-900 cursor-pointer"
          >
            View Details & Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;