// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
        withCredentials: true,
      });

      if (res.data.user) {
        setUser(res.data.user);
        console.log("User fetched:", res.data.user);
        
      }

      // Save token if it exists
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Token saved to localStorage", res.data.token);
        
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, logout };
};
