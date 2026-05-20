"use client";
import React, { useEffect, useState } from 'react';
import { getUser } from "@/lib/auth"; // আপনার Auth ইউটিলিটি ফাইল
import { useRouter } from 'next/navigation';

const MyAppointments = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: "", text: "" });

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editPatientName, setEditPatientName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editGender, setEditGender] = useState("Male");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    const user = getUser();
    if (!user?.email) {
      router.push("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("docappointToken");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${user.email}`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
        });
        
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching user appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleDeleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const token = localStorage.getItem("docappointToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        setBookings(bookings.filter((booking) => booking._id !== id));
        showToast("success", "Appointment deleted successfully!");
      } else {
        showToast("error", "Failed to delete appointment.");
      }
    } catch (error) {
      showToast("error", "Server connection failed.");
    }
  };

  const openUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setEditPatientName(booking.patientName || "");
    setEditPhone(booking.phone || "");
    setEditGender(booking.gender || "Male");
    setEditDate(booking.appointmentDate || "");
    setEditTime(booking.appointmentTime || booking.timeSlot || "10:30 AM");
    
    document.getElementById("update_appointment_modal").showModal();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const updatedData = {
      patientName: editPatientName,
      phone: editPhone,
      gender: editGender,
      appointmentDate: editDate,
      appointmentTime: editTime,
      timeSlot: editTime
    };

    try {
      const token = localStorage.getItem("docappointToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setBookings(bookings.map((b) => b._id === selectedBooking._id ? { ...b, ...updatedData } : b));
        document.getElementById("update_appointment_modal").close();
        showToast("success", "Appointment updated successfully!");
      } else {
        showToast("error", "Failed to update appointment.");
      }
    } catch (error) {
      showToast("error", "Something went wrong.");
    } finally {
      setActionLoading(false);
    }
  };

  const showToast = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage({ type: "", text: "" }), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-800">
      {/* Toast Message UI - অপরিবর্তিত */}
      {toastMessage.text && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${toastMessage.type === "success" ? "alert-success text-white" : "alert-error text-white"} shadow-lg rounded-2xl`}>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* টেবিল এবং মডাল UI - অপরিবর্তিত (শুধুমাত্র ফাংশন কলগুলো ঠিক আছে) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        {/* ... (পূর্বের টেবিল কোড এখানে বসবে) ... */}
      </div>

      {/* Update Modal UI - অপরিবর্তিত */}
    </div>
  );
};

export default MyAppointments;