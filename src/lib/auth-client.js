import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://docappoint-server-ewq6.onrender.com", // আপনার লাইভ ব্যাকএন্ড ইউআরএল
  
  fetchOptions: {
    // 🌍 ক্রস-ডোমেন রিকোয়েস্টে ব্রাউজার যেন কুকি (Session Cookie) পাঠাতে পারে
    credentials: "include", 
    onError: async (context) => {
      console.error("Auth Client Fetch Error:", context);
    },
  },
});