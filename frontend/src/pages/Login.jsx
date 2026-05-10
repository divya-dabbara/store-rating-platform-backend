import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <Star className="text-indigo-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
