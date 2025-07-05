import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const location = useLocation();
  const admin = localStorage.getItem("role");

  // Prevent redirect loop
  if (!admin && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

  

export default ProtectedRoutes;






