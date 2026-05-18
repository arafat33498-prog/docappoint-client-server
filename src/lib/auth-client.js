import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // আমাদের এক্সপ্রেস সার্ভারের মেইন ইউআরএল (যেখানে Better Auth এপিআই সেট করেছি)
    baseURL: "http://localhost:5000" 
});