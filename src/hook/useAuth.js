import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/auth/profile", { withCredentials: true });
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, logout };
};
