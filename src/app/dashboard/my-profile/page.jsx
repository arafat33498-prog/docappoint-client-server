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
        <div className="modal-box bg-white max-w-md rounded-2xl p-6 border border-slate-100 text-slate-800 shadow-2xl">
          <h3 className="font-bold text-xl text-slate-900 mb-1">Update Profile Info</h3>
          <p className="text-xs text-slate-400 mb-4">Change your display name and avatar instantly.</p>
          
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            
       
            <div className="form-control">
              <label className="label text-xs font-bold text-slate-400">EMAIL ADDRESS (READ-ONLY)</label>
              <input 
                type="text" readOnly disabled
                className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-400 rounded-lg cursor-not-allowed focus:outline-none"
                value={email}
              />
            </div>

           
            <div className="form-control">
              <label className="label text-xs font-bold text-slate-500">FULL NAME</label>
              <input 
                type="text" required 
                className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-sky-400 rounded-lg"
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>

            
            <div className="form-control">
              <label className="label text-xs font-bold text-slate-500">PROFILE PHOTO URL</label>
              <input 
                type="url" required 
                className="input input-sm input-bordered w-full bg-slate-50 border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-sky-400 rounded-lg"
                value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div className="modal-action flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => document.getElementById("update_profile_modal").close()} 
                className="btn btn-sm btn-ghost rounded-lg border border-slate-200 text-slate-600 normal-case"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-sm bg-sky-500 hover:bg-sky-600 border-none text-white rounded-lg normal-case px-5 shadow-md shadow-sky-100"
              >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </dialog>

    </div>
  );
};

export default MyProfile;