"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";

const MyAppointments = () => {
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

  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    // 🎯 ফিক্স: লাইভ ব্যাকএন্ড লিংক থেকে বুকিং ডাটা ফেচ করা হচ্ছে
    fetch(`https://docappoint-server-ewq6.onrender.com/bookings?email=${userEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user appointments:", err);
        setLoading(false);
      });
  }, [userEmail]);

  const handleDeleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      // 🎯 ফিক্স: লাইভ এপিআই দিয়ে ডিলিট রিকোয়েস্ট
      const res = await fetch(`https://docappoint-server-ewq6.onrender.com/bookings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings(bookings.filter((booking) => booking._id !== id));
        showToast("success", "Appointment deleted successfully!");
      } else {
        showToast("error", "Failed to delete appointment.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
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

    const updatedBookingData = {
      patientName: editPatientName,
      phone: editPhone,
      gender: editGender,
      appointmentDate: editDate,
      appointmentTime: editTime,
      timeSlot: editTime
    };

    try {
      // 🎯 ফিক্স: লাইভ এপিআই দিয়ে পুট (আপডেট) রিকোয়েস্ট
      const res = await fetch(`https://docappoint-server-ewq6.onrender.com/bookings/${selectedBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBookingData),
      });

      if (res.ok) {
        setBookings(bookings.map((b) => 
          b._id === selectedBooking._id ? { ...b, ...updatedBookingData } : b
        ));
        
        document.getElementById("update_appointment_modal").close();
        showToast("success", "Appointment updated successfully!");
      } else {
        showToast("error", "Failed to update appointment.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      showToast("error", "Something went wrong.");
    } finally {
      setActionLoading(false);
    }
  };

  const showToast = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage({ type: "", text: "" }), 3000);
  };

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
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-800">
      
      {toastMessage.text && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${toastMessage.type === "success" ? "alert-success text-white" : "alert-error text-white"} shadow-lg rounded-2xl`}>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900">My Booked Appointments</h2>
          <span className="badge badge-neutral font-semibold">Total: {bookings.length}</span>
        </div>
        
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
                  <th>Patient Info</th>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th className="text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {bookings.map((booking, index) => (
                  <tr key={booking._id || index} className="hover:bg-slate-50/50 transition-colors">
                    <th>{index + 1}</th>
                    <td className="font-medium text-slate-900">
                      <div>{booking.patientName || "N/A"}</div>
                      <div className="text-xs text-slate-400 font-normal mt-0.5">{booking.phone || "No Phone"}</div>
                    </td>
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
                    <td className="text-right pr-6 space-x-2">
                      <button 
                        onClick={() => openUpdateModal(booking)}
                        className="btn btn-xs bg-sky-50 hover:bg-sky-100 border-none text-sky-600 rounded-lg px-3 py-1 normal-case h-auto"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="btn btn-xs bg-rose-50 hover:bg-rose-100 border-none text-rose-600 rounded-lg px-3 py-1 normal-case h-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* আপডেট মডেল */}
      <dialog id="update_appointment_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-md rounded-2xl p-6 border border-slate-100 text-slate-800 shadow-xl">
          <h3 className="font-bold text-xl text-slate-900 mb-1">Update Appointment</h3>
          <p className="text-xs text-slate-400 mb-4">Edit existing patient and schedule details.</p>
          
          {selectedBooking && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label text-xs font-bold text-slate-400">DOCTOR NAME (READ-ONLY)</label>
                <input 
                  type="text" readOnly disabled
                  className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-400 rounded-lg cursor-not-allowed"
                  value={selectedBooking.doctorName || "General Physician"}
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold text-slate-400">YOUR EMAIL (READ-ONLY)</label>
                <input 
                  type="text" readOnly disabled
                  className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-400 rounded-lg cursor-not-allowed"
                  value={selectedBooking.userEmail || userEmail}
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold text-slate-500">PATIENT NAME</label>
                <input 
                  type="text" required 
                  className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-lg"
                  value={editPatientName} onChange={(e) => setEditPatientName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-bold text-slate-500">PHONE NUMBER</label>
                  <input 
                    type="tel" required 
                    className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-lg"
                    value={editPhone} onChange={(e) => setEditPhone(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold text-slate-500">GENDER</label>
                  <select 
                    className="select select-sm select-bordered w-full bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-lg"
                    value={editGender} onChange={(e) => setEditGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-bold text-slate-500">APPOINTMENT DATE</label>
                  <input 
                    type="date" required 
                    className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-lg"
                    value={editDate} onChange={(e) => setEditDate(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold text-slate-500">TIME SLOT</label>
                  <select 
                    className="select select-sm select-bordered w-full bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-lg"
                    value={editTime} onChange={(e) => setEditTime(e.target.value)}
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="modal-action pt-2">
                <button 
                  type="button" 
                  onClick={() => document.getElementById("update_appointment_modal").close()}
                  className="btn btn-sm btn-ghost rounded-xl normal-case"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className="btn btn-sm bg-slate-950 text-white hover:bg-slate-900 rounded-xl px-5 border-none normal-case shadow-sm"
                >
                  {actionLoading ? <span className="loading loading-spinner loading-xs"></span> : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

    </div>
  );
};

export default MyAppointments; 