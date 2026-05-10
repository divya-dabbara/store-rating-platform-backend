import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Search, MapPin, Star, Store } from 'lucide-react';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStores = async (searchQuery = '') => {
    try {
      const res = await api.get(`/stores?search=${searchQuery}`);
      setStores(res.data.stores);
    } catch (error) {
      toast.error('Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores(search);
  };

  const handleRate = async (storeId, currentRatingId, newRating) => {
    try {
      if (currentRatingId) {
        // Update existing
        await api.put(`/ratings/${currentRatingId}`, { rating: newRating });
        toast.success('Rating updated!');
      } else {
        // Create new
        await api.post('/ratings', { store_id: storeId, rating: newRating });
        toast.success('Rating submitted!');
      }
      fetchStores(search); // Refresh list to get updated data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading stores...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Discover Stores</h1>
          <p className="text-slate-500 text-sm">Find and rate your favorite stores</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name or address..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <button type="submit" className="hidden" />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No stores found matching your search.
          </div>
        ) : (
          stores.map((store) => (
            <div key={store.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Store size={18} className="text-indigo-500" />
                    {store.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-bold text-sm">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    {Number(store.average_rating).toFixed(1)}
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm flex items-start gap-1 mb-4">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  {store.address || 'No address provided'}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500 mb-2">Your Rating:</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = store.user_rating >= star;
                    return (
                      <button
                        key={star}
                        onClick={() => handleRate(store.id, store.rating_id, star)}
                        className={`p-1 transition-colors hover:scale-110 ${
                          isFilled ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'
                        }`}
                      >
                        <Star size={24} className={isFilled ? 'fill-current' : ''} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
