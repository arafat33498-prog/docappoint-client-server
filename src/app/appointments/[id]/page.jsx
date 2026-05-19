"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client"; 

const DoctorDetails = () => {
  const { id } = useParams(); 
  const router = useRouter();
  
  
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
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
    if (!id || !API_URL) return;

    fetch(`${API_URL}/doctors/${id}`) 
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
  }, [id, API_URL]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!userEmail) {
      setAlertMessage({ type: "error", text: "Please log in first to book an appointment!" });
      return;
    }

    setBookingLoading(true);
    setAlertMessage({ type: "", text: "" }); 

    const bookingData = {
      userEmail: userEmail,
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
      const res = await fetch(`${API_URL}/bookings`, {
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
              <span>{alertMessage.text}</span>
            </div>
          </div>
        )}
       
        <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 mb-8">
            
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <button onClick={() => document.getElementById("booking_modal").showModal()} className="bg-sky-500 text-white py-3.5 rounded-xl">Book Appointment Now</button>
        </div>

        
        <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white max-w-lg rounded-3xl p-6 md:p-8">
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              <button type="submit" className="btn bg-sky-500 text-white rounded-xl">Confirm Booking</button>
            </form>
          </div>
        </dialog>
      </div>
    </main>
  );
};

export default DoctorDetails;