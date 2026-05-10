import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Store, Users, Star } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigation = () => {
    switch (user?.role) {
      case 'ADMIN':
        return [
          { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        ];
      case 'STORE_OWNER':
        return [
          { name: 'My Dashboard', href: '/owner', icon: LayoutDashboard },
        ];
      case 'USER':
      default:
        return [
          { name: 'Stores', href: '/user', icon: Store },
        ];
    }
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
            <Star className="text-yellow-400" fill="currentColor" size={24} />
            StoreRating
          </h1>
          <div className="mt-4 pb-4 border-b border-slate-700">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-indigo-900 text-indigo-200 text-xs rounded-full font-semibold">
              {user?.role}
            </span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 text-slate-300 hover:bg-red-900/50 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
