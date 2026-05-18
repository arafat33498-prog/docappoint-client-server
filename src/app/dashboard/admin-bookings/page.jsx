"use client";
import React, { useEffect, useState } from 'react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadBookings = () => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadBookings();
  }, []);

 
  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          
          setBookings((prev) =>
            prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
          );
        }
      })
      .catch((err) => console.error("Error updating status:", err));
  };

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
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal: Manage Bookings</h1>
        <p className="text-sm text-slate-400 mt-1">Review, approve, or cancel patient medical appointments.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {bookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium">No bookings found in the system.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Patient Info</th>
                  <th className="py-4 px-6">Doctor</th>
                  <th className="py-4 px-6">Schedule</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                    
                    
                    <td className="py-4 px-6 font-semibold text-slate-900">{booking.patientName}</td>
                    
                   
                    <td className="py-4 px-6">
                      <p className="font-medium text-slate-800">{booking.doctorName}</p>
                      <p className="text-xs text-slate-400">{booking.specialty}</p>
                    </td>
                    
                   
                    <td className="py-4 px-6">
                      <p className="font-medium">{booking.appointmentDate}</p>
                      <p className="text-xs text-slate-400">⏱️ {booking.timeSlot}</p>
                    </td>
                    
                    
                    <td className="py-4 px-6">
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
                    
                   
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleStatusChange(booking._id, "Approved")}
                          disabled={booking.status === "Approved"}
                          className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-lg disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(booking._id, "Rejected")}
                          disabled={booking.status === "Rejected"}
                          className="btn btn-xs bg-rose-500 hover:bg-rose-600 text-white border-none rounded-lg disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          Reject
                        </button>
                      </div>
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

export default AdminBookings;