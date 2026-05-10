import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Users, Store as StoreIcon, Star, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', owner_id: '' });

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, storesRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/users'),
        api.get('/admin/stores')
      ]);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setStores(storesRes.data.stores);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', newUser);
      toast.success('User created successfully');
      setShowUserForm(false);
      setNewUser({ name: '', email: '', password: '', role: 'USER' });
      fetchData(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    }
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/stores', newStore);
      toast.success('Store created successfully');
      setShowStoreForm(false);
      setNewStore({ name: '', email: '', address: '', owner_id: '' });
      fetchData(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create store');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading admin dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.total_users || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <StoreIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Stores</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.total_stores || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Ratings</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.total_ratings || 0}</p>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Users</h2>
          <button 
            onClick={() => setShowUserForm(!showUserForm)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors"
          >
            <Plus size={16} /> Add User
          </button>
        </div>
        
        {showUserForm && (
          <div className="p-6 bg-slate-50 border-b border-slate-100">
            <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
                <input required type="text" className="w-full px-3 py-2 border rounded-md" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                <input required type="email" className="w-full px-3 py-2 border rounded-md" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <input required type="password" className="w-full px-3 py-2 border rounded-md" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border rounded-md bg-white" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                  <option value="USER">USER</option>
                  <option value="STORE_OWNER">STORE OWNER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700">Save</button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-4 text-slate-500">#{u.id}</td>
                  <td className="p-4 font-medium text-slate-900">{u.name}</td>
                  <td className="p-4 text-slate-600">{u.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold">
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stores Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Stores</h2>
          <button 
            onClick={() => setShowStoreForm(!showStoreForm)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors"
          >
            <Plus size={16} /> Add Store
          </button>
        </div>

        {showStoreForm && (
          <div className="p-6 bg-slate-50 border-b border-slate-100">
            <form onSubmit={handleCreateStore} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Store Name</label>
                <input required type="text" className="w-full px-3 py-2 border rounded-md" value={newStore.name} onChange={e => setNewStore({...newStore, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-md" value={newStore.email} onChange={e => setNewStore({...newStore, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Address</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" value={newStore.address} onChange={e => setNewStore({...newStore, address: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Owner ID</label>
                <input required type="number" className="w-full px-3 py-2 border rounded-md" value={newStore.owner_id} onChange={e => setNewStore({...newStore, owner_id: e.target.value})} />
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700">Save</button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-medium">Store Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Address</th>
                <th className="p-4 font-medium">Avg Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {stores.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">{s.name}</td>
                  <td className="p-4 text-slate-600">{s.email || '-'}</td>
                  <td className="p-4 text-slate-600">{s.address || '-'}</td>
                  <td className="p-4 font-medium text-indigo-600 flex items-center gap-1">
                    {Number(s.average_rating).toFixed(1)} <Star size={14} className="fill-indigo-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
