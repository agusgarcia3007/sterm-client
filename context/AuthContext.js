"use client";

import { createContext, useEffect, useState } from "react";
import { useFetch, usePost } from "../hooks";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const resetState = (state) => {
    Object.keys(state).forEach((key) => {
      state[key] = "";
    });
  };

  const handleLogin = async (user) => {
    try {
      setLoading(true);
      const res = await fetch("https://sterm.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setAuth(true);
      setLoading(false);
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAuth(false);
    }
  };

  useEffect(() => {
    if (!token) router.push("/Login");
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ router, auth, token, loading, resetState, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
