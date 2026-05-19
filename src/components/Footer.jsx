"use client";

import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[400px] bg-[#0c1a16] animate-pulse" />;
  }

  return (
    <footer className="w-full m-0 p-0 block overflow-hidden bg-[#0c1a16] text-slate-300 shadow-2xl">
      
    
      <div className="w-full px-6 sm:px-12 md:px-16 pt-16 pb-14">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start mb-16">
          
        
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
             
              <div className="w-9 h-9 rounded-full bg-[#00a2ff]] flex items-center justify-center text-white shadow-md flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
             
              <span className="text-xl font-bold tracking-tight select-none">
                <span className="text-bl">Doc</span>
                <span className="text-[#00a2ff]">Appoint</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your trusted telemedicine partner for professional medical consultations and prescription services.
            </p>

            
            <div className="flex items-center gap-2 pt-1">
              {[
              
                <svg key="fb" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>,
                
                <svg key="tw" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.24 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
               
                <svg key="ins" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect width={20} height={20} x={2} y={2} rx={5} ry={5}/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
               
                <svg key="in" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z"/></svg>
              ].map((icon, idx) => (
                <a 
                  key={idx} 
                  href="#social"
                  className="w-8 h-8 rounded-full bg-slate-900/50 border border-slate-800/40 flex items-center justify-center text-slate-400 hover:bg-[#10b981] hover:text-white transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

         
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide">Company</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#team" className="hover:text-emerald-400 transition-colors">Our Team</a></li>
                <li><a href="#careers" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#press" className="hover:text-emerald-400 transition-colors">Press & Media</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide">Departments</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#cardiology" className="hover:text-emerald-400 transition-colors">Cardiology</a></li>
                <li><a href="#neurology" className="hover:text-emerald-400 transition-colors">Neurology</a></li>
                <li><a href="#orthopedics" className="hover:text-emerald-400 transition-colors">Orthopedics</a></li>
                <li><a href="#pediatrics" className="hover:text-emerald-400 transition-colors">Pediatrics</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide">Patient Services</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#packages" className="hover:text-emerald-400 transition-colors">Health Packages</a></li>
                <li><a href="#appointments" className="hover:text-emerald-400 transition-colors">Appointments</a></li>
                <li><a href="#prescriptions" className="hover:text-emerald-400 transition-colors">Prescriptions</a></li>
                <li><a href="#reports" className="hover:text-emerald-400 transition-colors">Medical Reports</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#ethics" className="hover:text-emerald-400 transition-colors">Medical Ethics</a></li>
                <li><a href="#cookie" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

        </div>

        
        <div className="w-full h-[0.5px] bg-slate-800/60 mb-8" />

     
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 w-full">
          
       
          <div className="space-y-2 w-full sm:w-auto text-center sm:text-left">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
              Secure Payment Methods
            </span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {[
               
                { name: "MasterCard", url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
                { name: "Stripe", url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
                { name: "PayPal", url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
                { name: "ApplePay", url: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" }
              ].map((img, index) => (
                <div 
                  key={index} 
                  className="h-7 w-12 bg-white rounded-[5px] p-1.5 flex items-center justify-center shadow-sm select-none"
                >
                  <img src={img.url} alt={img.name} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-right space-y-0.5 w-full sm:w-auto">
          
            <p className="text-[11px] font-bold text-slate-400 tracking-wide">
              &copy; DocAppoint Telemedicine Platform Ltd. 2026
            </p>
            <p className="text-[9px] text-slate-500 font-medium">
              Designed with care &bull; All rights reserved
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;