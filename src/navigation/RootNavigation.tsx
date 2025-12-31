import React, { lazy } from "react";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";

const HomePage = lazy(() => import("../pages/Home"));
const FinancePage = lazy(() => import("../pages/Finance"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const SubscriptionsPage = lazy(() => import("../pages/Subscriptions"));

// From authstore
import { authStore } from "../store/authStore";

const RootNavigation = () => {
  const { user } = authStore();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<ProtectedRoute isAuthenticated={user} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/finance" element={<FinancePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default RootNavigation;
