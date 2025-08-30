import { Navigate } from "react-router-dom";
import { useAuth } from "./hook/useAuth";
import React from "react";
// import { useAPI} from "./hook/useAPI"


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  let mydata = user;
  console.log(mydata);

  
  
  

  if (loading) return <p>Loading...</p>;

  // If user is not authenticated, redirect to login
  if (!user) return <Navigate to="/" />;

   return React.cloneElement(children, { user }); // If authenticated, render the protected children
};

export default PrivateRoute;
