import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // প্রসেসটি লোকাল থাকলে localhost, আর লাইভ সার্ভারে থাকলে ব্যাকএন্ডের লাইভ URL টি ব্যবহার করবে
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000" 
});