import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
 
  const admin = localStorage.getItem('role'); 

  return admin ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;