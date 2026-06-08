// lib/auth.js
import { authClient } from "@/lib/auth-client";

// এখন আর localStorage লাগবে না, আমরা authClient এর সেশন ব্যবহার করব
export const useAuth = () => {
  return authClient.useSession();
};

export const logout = async () => {
  return await authClient.signOut();
};