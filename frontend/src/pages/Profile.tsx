import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import QuickOrderTopBar from '../components/QuickOrderTopBar';
import AdminAccessButton from '../components/AdminAccessButton';
import { useAuth } from '../contexts/AuthContext';
import { useOrderHistory } from '../contexts/OrderHistoryContext';
import { toast } from '@/components/ui/sonner';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Package,
  Clock,
  Star,
  Edit3,
  Save,
  X,
  ShoppingBag,
  Leaf,
  Award,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isLoggedIn, isHydrated, updateProfile, logout } = useAuth();
  const { orders, loading, getTotalOrders, getTotalSpent, getFavoriteItem } = useOrderHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name ?? '',
    city: user?.city ?? '',
    address: user?.address ?? '',
    phone: user?.phone ?? ''
  });

  useEffect(() => {
    setEditForm({
      name: user?.name ?? '',
      city: user?.city ?? '',
      address: user?.address ?? '',
      phone: user?.phone ?? ''
    });
  }, [user]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    window.location.href = '/login';
    return null;
  }

  const handleSaveProfile = async () => {
    try {
      // Update in local context
      const result = updateProfile({
        name: editForm.name.trim() || undefined,
        city: editForm.city.trim() || undefined,
        address: editForm.address.trim() || undefined
      });
      
      if (result.ok) {
        // Also update in backend database
        try {
          await axios.put('http://localhost:3030/auth/update-profile', {
            email: user?.email,
            name: editForm.name.trim(),
            city: editForm.city.trim(),
            address: editForm.address.trim()
          });
          toast.success('Profile updated successfully!');
          setIsEditing(false);
        } catch (dbError) {
          console.error('Database update error:', dbError);
          // Local update succeeded, so we still show success
          toast.success('Profile updated locally!');
          setIsEditing(false);
        }
      } else {
        const errorMsg = 'error' in result ? result.error : 'Failed to update profile';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('An error occurred while updating profile');
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name ?? '',
      city: user?.city ?? '',
      address: user?.address ?? '',
      phone: user?.phone ?? ''
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'Processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <QuickOrderTopBar />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your account and view your order history</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - User Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
                      <p className="text-green-100">{user?.email}</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {isEditing ? (
                  <>
                    {/* Edit Mode */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          City
                        </label>
                        <input
                          type="text"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          placeholder="Enter your city"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Address
                        </label>
                        <textarea
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                          placeholder="Enter your full address"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* View Mode */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{user?.phone || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">City</p>
                          <p className="font-medium">{user?.city || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{user?.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-4">
                      <button
                        onClick={logout}
                        className="w-full py-3 px-4 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{getTotalOrders()}</p>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{getTotalSpent().toFixed(2)}</p>
                <p className="text-sm text-gray-500">Total Spent</p>
              </div>
            </div>

            {/* Favorite Item */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Favorite Salad</h3>
                  <p className="text-sm text-gray-500">Most ordered item</p>
                </div>
              </div>
              <p className="text-lg font-medium text-green-600">{getFavoriteItem() || 'No orders yet'}</p>
            </div>
          </div>

          {/* Right Column - Order History */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
                    <p className="text-sm text-gray-500">Your recent salad orders</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Orders...</h3>
                    <p className="text-gray-500">Please wait while we fetch your order history.</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500 mb-6">Start ordering your favorite salads!</p>
                    <a href="/#shop" className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
                      Browse Menu
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6">
                      {(showAllOrders ? orders : orders.slice(0, 2)).map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                          {/* Order Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">ORD-{order._id.slice(-8).toUpperCase()}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>

                          {/* Order Items */}
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Leaf className="w-4 h-4 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                              </div>
                            ))}
                          </div>

                          {/* Order Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              Delivered on {new Date(order.deliveryDate || order.orderDate).toLocaleDateString('en-IN')}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">₹{order.total.toFixed(2)}</p>
                              <p className="text-sm text-gray-500">Total Amount</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Show All/Less Button */}
                    {orders.length > 2 && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => setShowAllOrders(!showAllOrders)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                        >
                          {showAllOrders ? 'Show Less History' : `Show All History (${orders.length} orders)`}
                          <ArrowRight className={`w-4 h-4 transition-transform ${showAllOrders ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AdminAccessButton />
      <ModernFooter />
    </div>
  );
};

export default Profile;


