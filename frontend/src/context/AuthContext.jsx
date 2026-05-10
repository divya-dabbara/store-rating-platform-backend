import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for auth data on app load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    // Listen for global auth errors (e.g. 401)
    const handleAuthError = () => {
      logout();
      toast.error('Session expired. Please login again.');
    };
    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: newToken, user: newUser } = response.data;
      
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success('Logged in successfully!');
      redirectBasedOnRole(newUser.role);
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      await api.post('/auth/signup', userData);
      toast.success('Account created! Please login.');
      navigate('/login');
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      toast.error(msg);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'ADMIN':
        navigate('/admin');
        break;
      case 'STORE_OWNER':
        navigate('/owner');
        break;
      case 'USER':
      default:
        navigate('/user');
        break;
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
    redirectBasedOnRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
