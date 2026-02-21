import React from "react";
import { Navigate } from "react-router";
import HomeLayout from "../pages/HomeLayout";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: any }) => {
  if (isAuthenticated) {
    return <Navigate to="/auth/signup" replace />;
  }

  return <HomeLayout />;
};

export default ProtectedRoute;
