"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";

const MyAppointments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:5000/bookings?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user appointments:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (sessionLoading || (userEmail && loading)) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
      </div>
    );
  }

  if (!userEmail) {
    return <div className="text-center py-10 text-red-500 font-medium">Please log in to view your appointments.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">My Booked Appointments</h2>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200">
            ❌ No appointments booked yet for {userEmail}!
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="table w-full bg-white">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {bookings.map((booking, index) => (
                  <tr key={booking._id || index} className="hover:bg-slate-50/50">
                    <th>{index + 1}</th>
                    <td className="font-medium text-slate-900">{booking.patientName || "N/A"}</td>
                    <td>{booking.doctorName || "General Physician"}</td>
                    <td>{booking.appointmentDate || "N/A"}</td>
                    <td><span className="badge badge-ghost text-xs">{booking.timeSlot || booking.appointmentTime || "N/A"}</span></td>
                    <td>
                      <span className={`badge text-xs font-semibold px-2.5 py-1 ${
                        booking.status?.toLowerCase() === 'approved' || booking.status?.toLowerCase() === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {booking.status || 'Pending'}
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