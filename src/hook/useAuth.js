// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/auth/user", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, logout, loading };
};
