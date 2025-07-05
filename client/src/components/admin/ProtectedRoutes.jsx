// import React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// function ProtectedRoutes() {
//   const location = useLocation();
//   const admin = localStorage.getItem("role");

//   // Prevent redirect loop
//   if (!admin && location.pathname !== "/login") {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }
// export default ProtectedRoutes;


import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const location = useLocation();
  const role = localStorage.getItem("role"); // E.g., 'admin' or null

  // If not logged in (no role) and trying to access a protected route
  if (!role) {
    // Don't block the login page itself
    if (location.pathname !== "/login") {
      return <Navigate to="/login" replace />;
    }
  }

  // If logged in and tries to access login page again, redirect to dashboard
  if (role === "admin" && location.pathname === "/login") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

