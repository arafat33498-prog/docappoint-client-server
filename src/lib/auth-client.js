import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://docappoint-server-ewq6.onrender.com", // আপনার লাইভ ব্যাকএন্ড ইউআরএল
  
  // ক্রস-ডোমেন রিকোয়েস্টে কুকি এবং ক্রেডেনশিয়াল ঠিকঠাক পাঠানোর জন্য এটি এভাবে দিতে হবে:
  fetchOptions: {
    onError: async (context) => {
      console.error("Auth Client Fetch Error:", context);
    },
  },
});