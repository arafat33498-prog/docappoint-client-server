"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";

export default function DoctorDetails() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params?.id;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!doctorId) return;
    fetch(`${API_URL}/doctors/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
        setDataLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
        setDataLoading(false);
      });
  }, [doctorId, API_URL]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push(`/login?redirect=/appointments/${doctorId}`);
      return;
    }
    if (!doctor) return;

    setLoading(true);
    const bookingData = {
      doctorName: doctor.name,
      doctorId: doctor._id || doctor.id,
      specialty: doctor.specialty,
      fee: doctor.fee || "500 BDT",
      patientName: session.user.name,
      userEmail: session.user.email,
      appointmentDate,
      timeSlot,
      status: "Pending",
    };

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();

      if (data.success || res.ok) {
        alert("Appointment Booked Successfully! 🎉");
        router.push("/dashboard");
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

  if (dataLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
      </div>
    );
  }

  if (!doctor) {
    return <div className="text-center py-10 font-medium text-red-500">Doctor not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
        <img src={doctor.image} alt={doctor.name} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl border" />
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-3xl font-bold text-slate-800">{doctor.name}</h2>
          <p className="text-sky-500 font-medium">{doctor.specialty}</p>
          <p className="text-sm text-slate-500">Experience: {doctor.experience}</p>
          <p className="text-sm font-bold text-slate-700 mt-2">Consultation Fee: {doctor.fee || "500 BDT"}</p>
        </div>
      </div>
       
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mt-8">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Book an Appointment</h3>
        {!session ? (
          <div className="text-center p-4 bg-amber-50 rounded-xl text-amber-700 font-medium">
            Please{" "}
            <span className="underline cursor-pointer font-bold text-sky-500" onClick={() => router.push(`/login?redirect=/appointments/${doctorId}`)}>
              Login
            </span>{" "}
            to book an appointment.
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="label font-semibold text-xs text-slate-600">Select Date</label>
              <input type="date" required className="input input-bordered w-full rounded-xl" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            </div>
            <div>
              <label className="label font-semibold text-xs text-slate-600">Select Time Slot</label>
              <select required className="select select-bordered w-full rounded-xl" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                <option value="">Choose a slot</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn bg-slate-950 text-white w-full rounded-xl hover:bg-slate-900 mt-4 h-12">
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}