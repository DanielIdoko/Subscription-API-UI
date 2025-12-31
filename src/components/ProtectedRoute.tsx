import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: any }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
