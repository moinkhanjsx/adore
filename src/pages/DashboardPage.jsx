import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { bookingAPI, authAPI } from '../services/api';
import Spinner from '../components/Spinner';
import { User, ShoppingBag, Edit, LogOut, Plus, Search } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    fetchUserBookings();
    
    if (user) {
      setEditForm({
        name: user.name || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      // Update user profile via API
      await authAPI.updateProfile(editForm);
      const updatedUser = { ...user, ...editForm };
      updateUser(updatedUser);
      setShowEditProfile(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-600';
      case 'Pending':
        return 'bg-yellow-600';
      case 'Cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-white">Please log in to access dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}!</h1>
            <p className="text-gray-400 mt-2">Manage your orders and profile</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </h2>
                <button
                  onClick={() => setShowEditProfile(!showEditProfile)}
                  className="text-green-400 hover:text-green-300"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              {!showEditProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">{user.phone}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEditProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEditProfile(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.querySelector('#products');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </button>
                <button 
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.querySelector('#products');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Browse Products
                </button>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Your Orders
              </h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No orders yet. Place your first order!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-medium">Order #{booking._id.toString().slice(-6)}</h3>
                          <p className="text-gray-400 text-sm">
                            {booking.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <p className="text-white font-semibold mt-1">₹{booking.totalAmount}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {new Date(booking.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
