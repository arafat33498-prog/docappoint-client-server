"use client";

import React, { useEffect, useState, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, ReferenceDot } from 'recharts';


const AnimatedCounter = ({ endValue, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = parseInt(endValue);
          if (start === end) return;

          let totalMiliseconds = duration;
          let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
          
          let timer = setInterval(() => {
            start += Math.ceil(end / (totalMiliseconds / incrementTime));
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(start);
            }
          }, incrementTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const DataStatsSection = () => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = [
    { name: 'Jan', percentage: 10 },
    { name: 'Feb', percentage: 48 },
    { name: 'Mar', percentage: 48 },
    { name: 'Apr', percentage: 75 },
    { name: 'May', percentage: 95 },
  ];

  
  if (!mounted) {
    return (
      <div className="w-full min-h-[400px] bg-[#f4f7f6] animate-pulse rounded-[32px]" />
    );
  }

  return (
    <section className="bg-[#f4f7f6] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full">
        
       
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Real Results, Backed by Data
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands who have transformed their health with our proven medical treatments and world-class experts.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          
          <div className="lg:col-span-2 bg-white rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                Patient Improvement
              </h3>
            </div>

            <div className="w-full h-64 md:h-72 pr-4 text-xs font-bold text-slate-400">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartSky" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" padding={{ left: 10, right: 10 }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} stroke="#94a3b8" ticks={[0, 25, 50, 75, 100]} tickFormatter={(value) => value === 0 ? '0' : `${value}%`} />
                  
                  <Area type="monotone" dataKey="percentage" stroke="url(#chartSky)" strokeWidth={3.5} fill="none" animationDuration={1500} />
                  
                
                  <ReferenceDot 
                    x="Apr" 
                    y={75} 
                    r={6} 
                    fill="#3b82f6" 
                    stroke="#ffffff" 
                    strokeWidth={3} 
                    isFront={true} 
                    label={{ 
                      value: '-20 kg', 
                      position: 'top', 
                      fill: '#3b82f6', 
                      fontSize: 12, 
                      fontWeight: 'bold',
                      offset: 10
                    }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

      
          <div className="flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] flex-1 flex flex-col justify-center transition-all duration-300 hover:translate-y-[-2px]">
              <span className="text-3xl md:text-4xl font-black text-sky-500 tracking-tight">
                <AnimatedCounter endValue="92" suffix="%" />
              </span>
              <h4 className="text-sm font-bold text-slate-800 mt-2">Patient Satisfaction</h4>
              <p className="text-xs text-slate-400 mt-1">See significant improvement in their symptoms within 12 weeks.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] flex-1 flex flex-col justify-center transition-all duration-300 hover:translate-y-[-2px]">
              <span className="text-3xl md:text-4xl font-black text-blue-500 tracking-tight">
                <AnimatedCounter endValue="50" suffix="K+" />
              </span>
              <h4 className="text-sm font-bold text-slate-800 mt-2">Happy Patients</h4>
              <p className="text-xs text-slate-400 mt-1">Trusted by thousands across the country for their health needs.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] flex-1 flex flex-col justify-center transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl md:text-4xl font-black text-cyan-500 tracking-tight">
                  4.5
                </span>
                <span className="text-xl text-cyan-500">★</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 mt-2">Average Rating</h4>
              <p className="text-xs text-slate-400 mt-1">Based on verified patient reviews and testimonials.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DataStatsSection;