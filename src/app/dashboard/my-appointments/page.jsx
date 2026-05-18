"use client";
import React, { useEffect, useState } from 'react';

const MyAppointments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
     
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Appointments</h1>
        <p className="text-sm text-slate-400 mt-1">View and track the status of your booked medical consultations.</p>
      </div>

    
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {bookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium">
            No appointments booked yet!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse text-left">
             
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold tracking-wider uppercase">
                  <th className="py-4 px-6">Doctor Details</th>
                  <th className="py-4 px-6">Patient Name</th>
                  <th className="py-4 px-6">Date & Time</th>
                  <th className="py-4 px-6">Fee</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              
              
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {bookings.map((booking) => (
                  <tr key={booking._id || booking.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-slate-900">{booking.doctorName}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{booking.specialty}</p>
                      </div>
                    </td>
                    
                    
                    <td className="py-4 px-6 font-medium text-slate-600">
                      {booking.patientName}
                    </td>
                    
                   
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-800">{booking.appointmentDate}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">⏱️ {booking.timeSlot}</p>
                      </div>
                    </td>
                    
                   
                    <td className="py-4 px-6 font-bold text-slate-900">
                      ৳ {booking.fee}
                    </td>
                    
                    
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        booking.status === "Approved" 
                          ? "bg-emerald-50 text-emerald-600" 
                          : booking.status === "Rejected"
                          ? "bg-rose-50 text-rose-600"
                          : "bg-amber-50 text-amber-600"
                      }`}>
                        {booking.status || "Pending"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;