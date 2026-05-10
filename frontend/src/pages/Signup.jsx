import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'USER'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await signup(formData);
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
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="text-slate-500 mt-2 text-sm">Join the Store Rating Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address (Optional)</label>
              <input
                type="text"
                name="address"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
              <select
                name="role"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="USER">Regular User</option>
                <option value="STORE_OWNER">Store Owner</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
