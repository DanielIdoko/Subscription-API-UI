import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { authStore } from '../store/authStore';
import { Spinner } from './ui/Spinner';

export const ProtectedRoute: React.FC = () => {
  const { token, user, isLoading, fetchCurrentUser } = authStore();

  useEffect(() => {
    // If we have a token but no user, try to fetch current user
    if (token && !user && !isLoading) {
      fetchCurrentUser();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="sm" />
      </div>
    );
  }

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
