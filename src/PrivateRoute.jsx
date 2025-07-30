// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./hook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // If user is not authenticated, redirect to login
  if (!user) return <Navigate to="/" />;

  return children; // If authenticated, render the protected children
};

export default PrivateRoute;
