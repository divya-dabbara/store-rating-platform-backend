import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Store as StoreIcon, Star, MessageSquare } from 'lucide-react';

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, ratingsRes] = await Promise.all([
          api.get('/owner/dashboard'),
          api.get('/owner/ratings')
        ]);
        setDashboardData(dashRes.data.dashboard);
        setRatings(ratingsRes.data.ratings);
      } catch (error) {
        toast.error('Failed to load owner dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-10">Loading owner dashboard...</div>;
  }

  // Calculate aggregates from dashboardData
  const totalStores = dashboardData.length;
  const totalRatings = dashboardData.reduce((acc, store) => acc + Number(store.total_ratings), 0);
  const avgRating = totalStores > 0 
    ? dashboardData.reduce((acc, store) => acc + Number(store.average_rating), 0) / totalStores
    : 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Store Owner Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of your stores and customer feedback</p>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <StoreIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">My Stores</p>
            <p className="text-2xl font-bold text-slate-900">{totalStores}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Ratings Received</p>
            <p className="text-2xl font-bold text-slate-900">{totalRatings}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Overall Average Rating</p>
            <p className="text-2xl font-bold text-slate-900">{avgRating.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stores List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">My Stores</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {dashboardData.length === 0 ? (
              <div className="p-5 text-sm text-slate-500 text-center">You don't own any stores yet.</div>
            ) : (
              dashboardData.map(store => (
                <div key={store.store_id} className="p-5 flex justify-between items-center hover:bg-slate-50">
                  <div>
                    <h3 className="font-medium text-slate-900">{store.store_name}</h3>
                    <p className="text-xs text-slate-500">{store.total_ratings} ratings</p>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {Number(store.average_rating).toFixed(1)} <Star size={14} className="fill-indigo-600" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detailed Ratings List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Recent Ratings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Store</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {ratings.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">No ratings received yet.</td>
                  </tr>
                ) : (
                  ratings.map(r => (
                    <tr key={r.rating_id} className="hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">{r.store_name}</td>
                      <td className="p-4">
                        <p className="font-medium text-slate-800">{r.user_name}</p>
                        <p className="text-xs text-slate-500">{r.user_email}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              size={14} 
                              className={star <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
