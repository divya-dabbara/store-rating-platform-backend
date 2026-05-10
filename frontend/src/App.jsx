import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Default redirect based on auth happens inside ProtectedRoute but we need a root catch */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected Routes wrapped in Layout */}
          <Route element={<DashboardLayout />}>
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/user" 
              element={
                <ProtectedRoute allowedRoles={['USER']}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/owner" 
              element={
                <ProtectedRoute allowedRoles={['STORE_OWNER']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
