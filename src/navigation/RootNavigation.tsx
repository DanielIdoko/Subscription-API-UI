import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Spinner } from '../components/ui/Spinner';
import { ToastContainer } from '../components/ToastContainer';

// Lazy load pages
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const SubscriptionsPage = lazy(() => import('../pages/SubscriptionsPage'));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const NotificationPage = lazy(() => import('../pages/NotificationPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Spinner size="lg" />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Auth Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SubscriptionsPage />
            </Suspense>
          }
        />
        <Route
          path="/analytics"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AnalyticsPage />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route
          path="/notifications"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NotificationPage />
            </Suspense>
          }
        />
      </Route>

      {/* Redirect root to dashboard */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DashboardPage />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

export const RootNavigation: React.FC = () => {
  return (
    <ToastContainer>
      <RouterProvider router={router} />
    </ToastContainer>
  );
};

export default RootNavigation;
