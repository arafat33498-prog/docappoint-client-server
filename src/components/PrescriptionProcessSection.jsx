"use client";

import React, { useEffect, useState } from 'react';

const SkyBluePrescriptionSection = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full min-h-[800px] bg-[#f4f7f6] animate-pulse py-20" />;
  }

  return (
    <section className="bg-[#f4f7f6] py-24 px-4 md:px-8 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto w-full space-y-24">
        
      
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-[0_10px_30px_-10px_rgba(56,189,248,0.2)]">
            <div className="bg-white rounded-full flex items-center px-6 py-4.5 w-full">
             
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0284c7" className="w-6 h-6 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
              
              
              <div className="h-6 w-[1px] bg-slate-200 mx-4" />
              
             
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for doctors, specialities or conditions..."
                className="w-full bg-transparent text-base text-slate-700 placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
         
          <div className="lg:col-span-5 flex justify-center items-center h-[380px] sm:h-[450px] w-full relative">
            
            <div className="w-full h-full relative rotate-[-28deg] scale-[0.85] sm:scale-100 flex gap-4 justify-center items-center">
              
             
              <div className="w-24 h-[320px] rounded-full overflow-hidden bg-slate-100 shadow-[0_20px_50px_rgba(14,165,233,0.15)] relative">
                <div 
                  className="absolute w-[450px] h-[450px] top-[-50px] left-[-60px] rotate-[28deg] bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600')` }}
                />
              </div>

             
              <div className="w-28 h-[420px] rounded-full overflow-hidden bg-slate-100 shadow-[0_25px_60px_rgba(14,165,233,0.2)] relative bottom-4">
                <div 
                  className="absolute w-[450px] h-[450px] top-[-30px] left-[-160px] rotate-[28deg] bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600')` }}
                />
              </div>

             
              <div className="w-28 h-[360px] rounded-full overflow-hidden bg-slate-100 shadow-[0_20px_50px_rgba(14,165,233,0.15)] relative">
                <div 
                  className="absolute w-[450px] h-[450px] top-[-60px] left-[-290px] rotate-[28deg] bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600')` }}
                />
              </div>

              <div className="absolute top-12 right-0 w-5 h-5 bg-sky-200 rounded-full opacity-60 rotate-[28deg] animate-pulse" />
              <div className="absolute bottom-20 left-4 w-4 h-4 bg-blue-200 rounded-full rotate-[28deg]" />
            </div>

          </div>

       
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-sky-50 text-sky-600 border border-sky-100 font-bold text-xs rounded-md uppercase tracking-wide">
              Prescription Process
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Medical Suitability Assessment & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                Prescription Process
              </span>
            </h2>
            
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
              Every prescription request undergoes thorough medical review by licensed physicians. We assess individual suitability based on your complete health profile to ensure safe and appropriate treatment.
            </p>

       
            <ul className="space-y-4 pt-2">
              {[
                "Comprehensive medical questionnaire to assess your health condition and suitability",
                "Licensed physician review of your medical history, current health, and medications",
                "Individualized medical decision based on clinical assessment and safety protocols",
                "Personalized treatment plan with clear medical guidance and dosage instructions",
                "Ongoing medical support and follow-up care from our physician team"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 font-semibold text-sm md:text-base">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-sm shadow-sky-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-6">
          
        
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "FDA-Approved Medications",
                desc: "Only prescribe medications that are FDA-approved and clinically proven effective.",
                icon: "📋"
              },
              {
                title: "Personalized Treatment",
                desc: "Customized prescription plans based on your unique health profile and medical history.",
                icon: "💬"
              },
              {
                title: "Fast Processing",
                desc: "Prescriptions reviewed within 24 hours by our licensed medical team.",
                icon: "⏱️"
              },
              {
                title: "Complete Documentation",
                desc: "Comprehensive medical records and prescription documentation for your safety.",
                icon: "📄"
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)] flex flex-col justify-start transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center mb-4 text-lg font-bold shadow-sm shadow-sky-100">
                  {item.icon}
                </div>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

         
          <div className="lg:col-span-7 flex gap-4 w-full h-[320px] lg:h-auto min-h-[300px]">
            
           
            <div className="flex-1 h-full rounded-[35px] overflow-hidden bg-slate-100 shadow-[0_15px_35px_rgba(14,165,233,0.06)] relative">
              <div 
                className="absolute w-[200%] h-full left-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200')` }}
              />
            </div>

            
            <div className="flex-1 h-full rounded-[35px] overflow-hidden bg-slate-100 shadow-[0_15px_35px_rgba(14,165,233,0.06)] relative">
              <div 
                className="absolute w-[200%] h-full right-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200')` }}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SkyBluePrescriptionSection;