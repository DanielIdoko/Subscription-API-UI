import React, { lazy } from "react";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";

const HomePage = lazy(() => import("../pages/Home"));
const FinancePage = lazy(() => import("../pages/Finance"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const SubscriptionsPage = lazy(() => import("../pages/Subscriptions"));
const Settings = lazy(() => import("../pages/Settings"));
const Notifications = lazy(() => import("../pages/Notifications"));

// From authstore
import { authStore } from "../store/authStore";

const RootNavigation = () => {
  const { user } = authStore();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<ProtectedRoute isAuthenticated={user} />}>
          <Route index element={<HomePage />} />
          <Route path="/user/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/user/profile/:user_id" element={<ProfilePage />} />
          <Route path="/user/finance" element={<FinancePage />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route
            path="/user/notifications/:user_id"
            element={<Notifications />}
          />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default RootNavigation;
