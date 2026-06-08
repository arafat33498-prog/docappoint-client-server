"use client";
import React, { useState, useEffect } from 'react';
import { getUser } from "@/lib/auth"; // আপনার Auth ইউটিলিটি ফাইল

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [toast, setToast] = useState("");

  const defaultAvatar = "https://i.ibb.co/default-avatar.png";

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.name || "");
      setPhotoUrl(currentUser.image || defaultAvatar);
    }
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("docappointToken");
      
      // আপনার ব্যাকএন্ডের প্রোফাইল আপডেট এন্ডপয়েন্ট
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, image: photoUrl }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        // লোকাল স্টোরেজ আপডেট করা
        localStorage.setItem("docappointUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
        
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

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
      </div>
    );
  }
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
      // কুকি-বেজড অথেনটিকেশন: কোনো হেডার বা টোকেন লাগবে না
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image: photoUrl }),
      });

      if (res.ok) {
        // সেশন রিফ্রেশ করার জন্য authClient ব্যবহার করুন
        await authClient.refetchSession();
        
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

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-sky-500"></span>
      </div>
    );
  }

  if (!session?.user) {
    return <div className="text-center py-20">Please login to view your profile.</div>;
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
              <img src={session.user.image || defaultAvatar} alt="Profile" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-800">{session.user.name}</h3>
          <p className="text-sm text-slate-400 font-medium">{session.user.email}</p>
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
      
      {/* Modal - আগের মতোই থাকবে */}
      <dialog id="update_profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-md rounded-3xl p-0 overflow-hidden shadow-2xl border-none">
          <div className="bg-sky-500 pt-10 pb-16 px-6 relative rounded-bl-[80px]">
            <h3 className="text-center text-white font-extrabold text-xl uppercase tracking-[0.2em]">Update Profile</h3>
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
              <img src={user.image || defaultAvatar} alt="Profile" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
          <p className="text-sm text-slate-400 font-medium">{user.email}</p>
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
      
      {/* Modal - অপরিবর্তিত */}
      <dialog id="update_profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-md rounded-3xl p-0 overflow-hidden shadow-2xl border-none">
          <div className="bg-sky-500 pt-10 pb-16 px-6 relative rounded-bl-[80px]">
            <button type="button" onClick={() => document.getElementById("update_profile_modal").close()} className="absolute left-6 top-8 text-white text-2xl font-light hover:text-sky-100 transition">←</button>
            <h3 className="text-center text-white font-extrabold text-xl uppercase tracking-[0.2em] drop-shadow-sm">Update Profile</h3>
          </div>
          <div className="px-8 py-6 bg-white">
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="form-control w-full">
                <label className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mb-1 pl-1">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full bg-white border-slate-200 text-slate-800 rounded-xl h-12 px-4 text-sm font-medium focus:outline-none" />
              </div>
              <div className="form-control w-full">
                <label className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mb-1 pl-1">Profile Photo URL</label>
                <input type="url" required value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input input-bordered w-full bg-white border-slate-200 text-slate-800 rounded-xl h-12 px-4 text-sm font-medium focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="submit" disabled={loading} className="btn bg-sky-500 hover:bg-sky-600 border-none text-white rounded-xl px-6 h-11 normal-case shadow-md">
                  {loading ? <span className="loading loading-spinner loading-xs"></span> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;