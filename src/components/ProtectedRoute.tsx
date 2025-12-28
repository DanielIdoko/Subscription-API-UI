import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
//   if (user == null) {
//     <Navigate to={"/login"} />;
//   }

  return <Outlet />;
};

export default ProtectedRoute;
