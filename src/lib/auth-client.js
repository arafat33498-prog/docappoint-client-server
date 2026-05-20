// lib/auth.js

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("docappointUser");
  return user ? JSON.parse(user) : null;
};

export const setSession = (user, token) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("docappointUser", JSON.stringify(user));
  localStorage.setItem("docappointToken", token);
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("docappointUser");
  localStorage.removeItem("docappointToken");
};