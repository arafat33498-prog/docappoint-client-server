"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DoctorDetails({ doctor }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // 🔄 বুকিং এর জন্য কারেন্ট লগইন থাকা ইউজারের ডাটা নিয়ে আসা
  const { data: session } = authClient.useSession();

  // 🛡️ সেফটি গার্ড: ডক্টর ডাটা লোড না হওয়া পর্যন্ত পেজ ক্র্যাশ করা থেকে আটকাবে
  if (!doctor) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
        <p className="mt-2 text-sm font-bold text-slate-500">Loading Doctor Details...</p>
      </div>
    );
  }

  const handleBooking = async (e) => {
    e.preventDefault();
    
    // 🛡️ ইউজার লগইন না থাকলে বুক করতে দেবে না, লগইন পেজে পাঠাবে
    if (!session) {
      router.push(`/login?redirect=/doctors/${doctor._id}`);
      return;
    }

    setLoading(true);

    const bookingData = {
      doctorName: doctor.name,
      doctorId: doctor._id,
      specialty: doctor.specialty,
      fee: doctor.fee,
      patientName: session.user.name,      // logged in user name
      userEmail: session.user.email,       // logged in user email (Crucial Fix)
      appointmentDate,
      timeSlot,
      status: "Pending",
    };

    try {
      // আপনার রেন্ডার সার্ভারের URL ব্যবহার করা হয়েছে
      const res = await fetch("https://docappoint-server-ewq6.onrender.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Appointment Booked Successfully! 🎉");
        router.push("/dashboard"); // বুকিং সফল হলে ড্যাশবোর্ড বা হোম পেজে নিয়ে যাবে
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ডক্টর ডিটেইলস কার্ড এখানে থাকবে */}
      
      {/* 📅 Book Now Form Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mt-8">
        <h3 className="text-xl font-bold mb-4">Book an Appointment</h3>
        
        {!session ? (
          <div className="text-center p-4 bg-amber-50 rounded-xl text-amber-700 font-medium">
            Please <span className="underline cursor-pointer font-bold text-sky-500" onClick={() => router.push(`/login?redirect=/doctors/${doctor._id}`)}>Login</span> first to book an appointment.
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="label font-semibold text-xs text-slate-600">Select Date</label>
              <input 
                type="date" required className="input input-bordered w-full rounded-xl"
                value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            <div>
              <label className="label font-semibold text-xs text-slate-600">Select Time Slot</label>
              <select 
                required className="select select-bordered w-full rounded-xl"
                value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="">Choose a slot</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
              </select>
            </div>

            <button 
              type="submit" disabled={loading}
              className="btn bg-slate-950 text-white w-full rounded-xl hover:bg-slate-900 mt-4"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}