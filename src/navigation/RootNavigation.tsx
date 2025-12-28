import React, { lazy } from "react";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";

const HomePage = lazy(() => import("../pages/Home"));
const FinancePage = lazy(() => import("../pages/Finance"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const Signup = lazy(() => import("../pages/SIgnup"));
const Login = lazy(() => import("../pages/Login"));
const SubscriptionsPage = lazy(() => import("../pages/Subscriptions"));

const RootNavigation = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="finance" element={<FinancePage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default RootNavigation;
