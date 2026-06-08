"use client";
import React, { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client"; 

const MyProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [toast, setToast] = useState("");

  const defaultAvatar = "https://i.ibb.co/default-avatar.png";

  // সেশন থেকে ইউজার ডেটা লোড করা
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhotoUrl(session.user.image || defaultAvatar);
    }
  }, [session]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: photoUrl }),
      });

      if (res.ok) {
        await authClient.refetchSession(); // সেশন আপডেট করা
        document.getElementById("update_profile_modal").close();
        setToast("Profile updated successfully!");
        setTimeout(() => setToast(""), 3000);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <span className="loading loading-spinner loading-lg text-sky-500"></span>
    </div>
  );

  if (!session?.user) return <div className="text-center py-20">Please login to view your profile.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-slate-800 relative">
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success text-white shadow-lg rounded-2xl font-medium">
            <span>{toast}</span>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
        <div className="avatar">
          <div className="w-28 h-28 rounded-full ring ring-sky-100 ring-offset-2 overflow-hidden bg-slate-100">
            <img src={session.user.image || defaultAvatar} alt="Profile" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-800">{session.user.name}</h3>
          <p className="text-sm text-slate-400 font-medium">{session.user.email}</p>
        </div>
        <button
          onClick={() => document.getElementById("update_profile_modal").showModal()}
          className="btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-xl px-6 font-semibold shadow-lg shadow-sky-100"
        >
          Update Profile
        </button>
      </div>
      
      <dialog id="update_profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-md rounded-3xl p-0 overflow-hidden shadow-2xl">
          <div className="bg-sky-500 pt-10 pb-16 px-6 relative rounded-bl-[80px]">
            <h3 className="text-center text-white font-extrabold text-xl tracking-[0.2em]">UPDATE PROFILE</h3>
          </div>
          <div className="px-8 py-6 bg-white">
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full bg-white border-slate-200 rounded-xl" />
              <input type="url" required value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input input-bordered w-full bg-white border-slate-200 rounded-xl" />
              <button type="submit" disabled={loading} className="btn bg-sky-500 text-white w-full rounded-xl">
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;