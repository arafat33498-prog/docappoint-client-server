import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // 🎯 সরাসরি আপনার লাইভ রেন্ডার সার্ভারের লিংক
  baseURL: "https://docappoint-server-ewq6.onrender.com", 
  
  fetchOptions: {
    credentials: "include", // ক্রস-ডোমেন কুকির জন্য বাধ্যতামূলক
    onError: async (context) => {
      console.error("Auth Client Fetch Error:", context);
    },
  },
});