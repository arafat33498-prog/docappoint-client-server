import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://docappoint-server-ewq6.onrender.com",
  fetchOptions: {
    credentials: "include"
  }
});