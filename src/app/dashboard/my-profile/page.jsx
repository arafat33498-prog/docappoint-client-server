"use client";
import React, { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client";

const MyProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  
  const defaultAvatar = "https://i.ibb.co/default-avatar.png";
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState(defaultAvatar);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhotoUrl(session.user.image || defaultAvatar);
      setEmail(session.user.email || "");
    }
  }, [session]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authClient.updateUser({
        name: name,
        image: photoUrl || defaultAvatar,
      });
      if (res) {
        document.getElementById("update_profile_modal").close();
        setToast("Profile updated successfully!");
        setTimeout(() => setToast(""), 3000);
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
      </div>
    );
  }

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

        <div className="flex justify-center">
          <div className="avatar">
            <div className="w-28 h-28 rounded-full ring ring-sky-100 ring-offset-base-100 ring-offset-2 overflow-hidden bg-slate-100">
              <img
                src={photoUrl || defaultAvatar}
                alt="User Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-800">{name || "No Name Provided"}</h3>
          <p className="text-sm text-slate-400 font-medium">{email}</p>
        </div>

        <div className="border-t border-slate-50 pt-4">
          <button
            onClick={() => document.getElementById("update_profile_modal").showModal()}
            className="btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-xl px-6 font-semibold shadow-lg shadow-sky-100 normal-case"
          >
            Update Profile
          </button>
        </div>
      </div>

      
      <dialog id="update_profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-md rounded-3xl p-0 overflow-hidden shadow-2xl border-none">

          
          <div className="bg-sky-500 pt-10 pb-16 px-6 relative rounded-bl-[80px]">
            <button
              type="button"
              onClick={() => document.getElementById("update_profile_modal").close()}
              className="absolute left-6 top-8 text-white text-2xl font-light hover:text-sky-100 transition"
            >
              ←
            </button>
            
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <h3 className="text-center text-white font-extrabold text-xl uppercase tracking-[0.2em] drop-shadow-sm">
                Update Profile
              </h3>
              <p className="text-sky-100 text-[10px] uppercase tracking-[0.3em] font-medium opacity-80">
                Account Settings
              </p>
            </div>
          </div>

       
          <div className="px-8 py-6 bg-white">
            <form onSubmit={handleProfileUpdate} className="space-y-5">

              
              <div className="form-control w-full">
                <label className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-1 pl-1">
                  Email Address (Read-Only)
                </label>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={email}
                  className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-400 rounded-xl h-12 px-4 cursor-not-allowed text-sm font-medium focus:outline-none"
                />
              </div>

              
              <div className="form-control w-full">
                <label className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mb-1 pl-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full bg-white border-slate-200 text-slate-800 rounded-xl h-12 px-4 text-sm font-medium focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                />
              </div>

              
              <div className="form-control w-full">
                <label className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mb-1 pl-1">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full bg-white border-slate-200 text-slate-800 rounded-xl h-12 px-4 text-sm font-medium focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                />
              </div>

             
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => document.getElementById("update_profile_modal").close()}
                  className="btn bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-medium rounded-xl px-5 h-11 min-h-[44px] normal-case"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-sky-500 hover:bg-sky-600 border-none text-white font-semibold rounded-xl px-6 h-11 min-h-[44px] normal-case shadow-md shadow-sky-100"
                >
                  {loading ? <span className="loading loading-spinner loading-xs"></span> : "Save Changes"}
                </button>
              </div>

            </form>
          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  );
};

export default MyProfile;