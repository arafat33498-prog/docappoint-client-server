"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client"; 

const DoctorDetails = () => {
  const { id } = useParams(); 
  const router = useRouter();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
 
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("05:00 PM");
  const [problem, setProblem] = useState("");
  const [gender, setGender] = useState("Male"); 

 
  const [alertMessage, setAlertMessage] = useState({ type: "", text: "" });

  
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/doctors/${id}`) 
      .then((res) => {
        if (!res.ok) throw new Error("Doctor not found");
        return res.json();
      })
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!userEmail) {
      setAlertMessage({ type: "error", text: "Please log in first to book an appointment!" });
      return;
    }

    setBookingLoading(true);
    setAlertMessage({ type: "", text: "" }); 

    
    const bookingData = {
      userEmail: userEmail, // 
      doctorName: doctor.name,
      doctorId: doctor._id || doctor.id,
      specialty: doctor.specialty,
      fee: doctor.fee,
      patientName,
      gender, 
      phone,
      appointmentDate,
      appointmentTime: timeSlot, 
      timeSlot, 
      problem,
      status: "Pending" 
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      if (res.ok) {
        setAlertMessage({ type: "success", text: "Appointment booked successfully!" });
        
       
        setPatientName("");
        setPhone("");
        setAppointmentDate("");
        setProblem("");

       
        setTimeout(() => {
          document.getElementById("booking_modal").close(); 
          setAlertMessage({ type: "", text: "" });
          router.push('/dashboard/my-appointments'); 
        }, 2000);

      } else {
        setAlertMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Booking Error:", error);
      setAlertMessage({ type: "error", text: "Server connection failed. Try again later." });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f4f7f6]">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f4f7f6] text-slate-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Doctor Not Found!</h2>
          <button onClick={() => router.push('/appointments')} className="text-sky-500 hover:underline">Go Back to Appointments</button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#f4f7f6] min-h-screen py-12 px-4 relative">
      <div className="max-w-4xl mx-auto w-full">
        
        {alertMessage.text && (
          <div className="toast toast-top toast-center z-50">
            <div className={`alert ${alertMessage.type === "success" ? "alert-success text-white" : "alert-error text-white"} shadow-lg rounded-2xl`}>
              <div>
                <span>{alertMessage.text}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 mb-8">
          
          <div className="w-full md:w-64 h-64 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
            <img 
              src={doctor.image || "https://via.placeholder.com/300"} 
              alt={doctor.name} 
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="bg-sky-50 text-sky-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {doctor.specialty}
              </span>
              <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">{doctor.name}</h1>
              <p className="text-slate-400 font-medium text-sm">📍 {doctor.hospital || doctor.location || 'Medical Center'}</p>
              
              <hr className="border-slate-100 my-5" />

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6">
                <div>
                  <p className="text-slate-400 text-xs font-medium">Experience</p>
                  <p className="font-semibold text-slate-700 mt-0.5">💼 {doctor.experience || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-medium">Rating</p>
                  <p className="font-semibold text-slate-700 mt-0.5">⭐ 4.9 (98 Reviews)</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-medium">Availability</p>
                  <p className="font-semibold text-emerald-600 mt-0.5">📅 Sun - Thu (5PM - 9PM)</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-medium">Consultation Fee</p>
                  <p className="font-bold text-sky-500 text-xl mt-0.5">৳ {doctor.fee}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById("booking_modal").showModal()}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3.5 rounded-xl transition shadow-lg shadow-sky-100/50 flex justify-center items-center gap-2"
            >
              Book Appointment Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">About This Medical Specialist</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {doctor.name} is a highly accomplished specialist in the field of {doctor.specialty}. With over {doctor.experience || 'several years'} of practical expertise, they are deeply committed to providing international-standard, patient-centric healthcare services.
          </p>
        </div>

        <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white max-w-lg rounded-3xl p-6 md:p-8 border border-slate-100 text-slate-800 shadow-2xl">
            <h3 className="font-bold text-2xl text-slate-900 mb-1">Confirm Appointment</h3>
            <p className="text-sm text-slate-400 mb-6">With {doctor.name} ({doctor.specialty})</p>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
             
              <div className="form-control">
                <label className="label text-xs font-semibold text-slate-500 tracking-wider">PATIENT NAME</label>
                <input 
                  type="text" required placeholder="Enter patient's full name" 
                  className="input input-bordered w-full bg-[#f4f7f6] border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-xl"
                  value={patientName} onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs font-semibold text-slate-500 tracking-wider">PHONE NUMBER</label>
                  <input 
                    type="tel" required placeholder="Enter contact number" 
                    className="input input-bordered w-full bg-[#f4f7f6] border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-xl"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label text-xs font-semibold text-slate-500 tracking-wider">GENDER</label>
                  <select 
                    className="select select-bordered w-full bg-[#f4f7f6] border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-xl"
                    value={gender} onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs font-semibold text-slate-500 tracking-wider">SELECT DATE</label>
                  <input 
                    type="date" required 
                    className="input input-bordered w-full bg-[#f4f7f6] border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-xl"
                    value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label text-xs font-semibold text-slate-500 tracking-wider">TIME SLOT</label>
                  <select 
                    className="select select-bordered w-full bg-[#f4f7f6] border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-xl"
                    value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-semibold text-slate-500 tracking-wider">BRIEF DESCRIPTION OF SYMPTOMS</label>
                <textarea 
                  rows="3" placeholder="Describe your health problem (optional)..." 
                  className="textarea textarea-bordered w-full bg-[#f4f7f6] border-slate-200 text-slate-800 focus:outline-none focus:border-sky-400 rounded-xl"
                  value={problem} onChange={(e) => setProblem(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-action flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => document.getElementById("booking_modal").close()} 
                  className="btn btn-ghost rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={bookingLoading}
                  className="btn bg-sky-500 hover:bg-sky-600 border-none text-white rounded-xl font-medium px-6 shadow-lg shadow-sky-100"
                >
                  {bookingLoading ? <span className="loading loading-spinner loading-sm"></span> : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </dialog>

      </div>
    </main>
  );
};

export default DoctorDetails;