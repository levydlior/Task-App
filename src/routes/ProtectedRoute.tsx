import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { token } = useAuth();

  console.log(token)
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
