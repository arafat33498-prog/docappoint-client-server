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
    if (session) {
     
      router.push(`/appointments/${doctorId}`);
    } else {
     
      router.push(`/login?redirect=/appointments/${doctorId}`);
    }
  };

  return (
    <div className="relative w-full h-[480px] rounded-[32px] overflow-hidden bg-[#dce4e2] shadow-sm border border-white/20 group">
      
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 flex flex-col justify-end px-8 pb-8 bg-gradient-to-t from-[#bac7c5]/90 via-[#bac7c5]/60 to-transparent backdrop-blur-[12px]">
        
        <div className="text-left">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight mb-1">
            {name}
          </h2>
          <p className="text-sm font-medium text-slate-600">
            {specialty} • {experience}
          </p>
        </div>

       
        <div className="absolute inset-x-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <button 
            onClick={handleDetailsClick}
            className="w-full py-3 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 shadow-md active:scale-[0.98] transition-all"
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default DoctorCard;