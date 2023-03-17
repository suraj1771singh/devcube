import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { User } = useContext(AuthContext);

  const isAuthenticated = User;
 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
