import React from 'react';

const Banner = () => {
    return (
         <main>
      
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-between gap-10">
          
         
          <div className="flex-1">
            
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 mb-6 shadow-sm">
              <span className="text-sky-500">★</span>
              Your Telemedicine Partner
            </div>

           
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-2">
              Book Trusted
            </h1>
            <h1 className="text-5xl font-bold text-sky-500 leading-tight mb-4">
              Doctor Appointments
            </h1>

           
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Connect with licensed physicians and book appointments from the comfort of your home. Fast, secure, and reliable.
            </p>

           
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-7 py-3 rounded-full text-sm font-medium transition">
              Book an Appointment →
            </button>

            
            <div className="flex items-center gap-8 mt-10">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Medically Approved</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">50,000+ Patients</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Certified & Secure</span>
              </div>
            </div>

            
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/32?img=1" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/32?img=2" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/32?img=3" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/32?img=4" className="w-8 h-8 rounded-full border-2 border-white" />
              </div>
              <div>
                <span className="text-sky-500 font-bold text-lg">2,450+</span>
                <p className="text-gray-400 text-xs">Patients treated this month</p>
              </div>
            </div>
          </div>

          
          <div className="flex-1 hidden md:flex items-center justify-center gap-4">
            <div className="w-56 h-72 rounded-3xl overflow-hidden bg-gray-200">
              <img
                src="doctor1.jpg"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-44 h-56 rounded-3xl overflow-hidden bg-sky-100 flex items-center justify-center">
              <img
                src="doctor.jpg"
                alt="Medical"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        
        <div className="border-t border-gray-200 py-8">
          <p className="text-center text-gray-400 text-sm mb-6">Trusted By All Over The World</p>
          <div className="flex items-center justify-center gap-10 flex-wrap px-6">
            {["Apollo", "LabAid", "Square", "Popular", "Ibn Sina", "Evercare"].map((name) => (
              <span key={name} className="text-gray-400 font-semibold text-sm hover:text-sky-500 transition cursor-pointer">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
    );
};

export default Banner;