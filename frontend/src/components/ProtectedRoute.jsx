import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If authenticated but unauthorized, redirect to their default dashboard
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'STORE_OWNER':
        return <Navigate to="/owner" replace />;
      case 'USER':
      default:
        return <Navigate to="/user" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
