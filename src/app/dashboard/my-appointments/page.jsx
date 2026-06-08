"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client"; 

const MyAppointments = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: "", text: "" });

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editPatientName, setEditPatientName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // সেশন চেক এবং ডাটা ফেচিং
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }

    if (session?.user) {
      fetch(`${API_URL}/bookings`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
          setLoading(false);
        });
    }
  }, [session, isPending, router, API_URL]);

  const showToast = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage({ type: "", text: "" }), 3000);
  };

  const handleDeleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
        showToast("success", "Appointment deleted successfully!");
      } else {
        showToast("error", "Failed to delete.");
      }
    } catch (error) {
      showToast("error", "Server connection failed.");
    }
  };

  const openUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setEditPatientName(booking.patientName);
    setEditPhone(booking.phone);
    setEditDate(booking.appointmentDate);
    setEditTime(booking.appointmentTime || booking.timeSlot);
    document.getElementById("update_appointment_modal").showModal();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const updatedData = {
      patientName: editPatientName,
      phone: editPhone,
      appointmentDate: editDate,
      appointmentTime: editTime,
      timeSlot: editTime
    };

    try {
      const res = await fetch(`${API_URL}/bookings/${selectedBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setBookings(bookings.map((b) => b._id === selectedBooking._id ? { ...b, ...updatedData } : b));
        document.getElementById("update_appointment_modal").close();
        showToast("success", "Appointment updated successfully!");
      } else {
        showToast("error", "Failed to update.");
      }
    } catch (error) {
      showToast("error", "Something went wrong.");
    } finally {
      setActionLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-800">
      {toastMessage.text && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${toastMessage.type === "success" ? "alert-success text-white" : "alert-error text-white"} shadow-lg rounded-2xl`}>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.doctorName}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.appointmentTime}</td>
                  <td><span className="badge badge-ghost">{booking.status}</span></td>
                  <td className="flex gap-2">
                    <button onClick={() => openUpdateModal(booking)} className="btn btn-sm btn-outline btn-info">Edit</button>
                    <button onClick={() => handleDeleteBooking(booking._id)} className="btn btn-sm btn-outline btn-error">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      <dialog id="update_appointment_modal" className="modal">
        <div className="modal-box rounded-3xl">
          <h3 className="font-bold text-lg mb-4">Edit Appointment</h3>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <input type="text" className="input input-bordered w-full" value={editPatientName} onChange={(e) => setEditPatientName(e.target.value)} />
            <input type="tel" className="input input-bordered w-full" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
            <input type="date" className="input input-bordered w-full" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
            <input type="text" className="input input-bordered w-full" value={editTime} onChange={(e) => setEditTime(e.target.value)} />
            <button type="submit" className="btn bg-sky-500 text-white w-full" disabled={actionLoading}>
              {actionLoading ? "Updating..." : "Update Appointment"}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyAppointments;