import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit,
  Trash2,
  Plus,
  X,
  Crown,
  Star,
  Award,
  Users,
  Calendar,
  DollarSign,
  Save
} from 'lucide-react';

interface Membership {
  id: string;
  planName: string;
  planType: 'Basic' | 'Premium' | 'Gold';
  price: number;
  duration: number; // in months
  features: string[];
  maxOrders: number;
  discount: number; // percentage
  isActive: boolean;
  totalSubscribers: number;
  revenue: number;
}

interface UserMembership {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planName: string;
  planType: 'Basic' | 'Premium' | 'Gold';
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Cancelled';
  ordersUsed: number;
  maxOrders: number;
}

const AdminMemberships: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([
    {
      id: 'PLAN-001',
      planName: 'Basic Plan',
      planType: 'Basic',
      price: 299,
      duration: 1,
      features: ['5 Orders per month', '5% Discount', 'Basic Support'],
      maxOrders: 5,
      discount: 5,
      isActive: true,
      totalSubscribers: 45,
      revenue: 13455
    },
    {
      id: 'PLAN-002',
      planName: 'Premium Plan',
      planType: 'Premium',
      price: 599,
      duration: 1,
      features: ['15 Orders per month', '10% Discount', 'Priority Support', 'Free Delivery'],
      maxOrders: 15,
      discount: 10,
      isActive: true,
      totalSubscribers: 32,
      revenue: 19168
    },
    {
      id: 'PLAN-003',
      planName: 'Gold Plan',
      planType: 'Gold',
      price: 999,
      duration: 1,
      features: ['Unlimited Orders', '15% Discount', '24/7 Support', 'Free Delivery', 'Exclusive Salads'],
      maxOrders: -1, // -1 for unlimited
      discount: 15,
      isActive: true,
      totalSubscribers: 12,
      revenue: 11988
    }
  ]);

  const [userMemberships, setUserMemberships] = useState<UserMembership[]>([
    {
      id: 'SUB-001',
      userId: 'USER-001',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      planName: 'Premium Plan',
      planType: 'Premium',
      startDate: '2025-09-01',
      endDate: '2025-10-01',
      status: 'Active',
      ordersUsed: 8,
      maxOrders: 15
    },
    {
      id: 'SUB-002',
      userId: 'USER-002',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      planName: 'Gold Plan',
      planType: 'Gold',
      startDate: '2025-08-15',
      endDate: '2025-09-15',
      status: 'Expired',
      ordersUsed: 25,
      maxOrders: -1
    },
    {
      id: 'SUB-003',
      userId: 'USER-003',
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      planName: 'Basic Plan',
      planType: 'Basic',
      startDate: '2025-09-10',
      endDate: '2025-10-10',
      status: 'Active',
      ordersUsed: 3,
      maxOrders: 5
    },
    {
      id: 'SUB-004',
      userId: 'USER-004',
      userName: 'Sarah Wilson',
      userEmail: 'sarah@example.com',
      planName: 'Premium Plan',
      planType: 'Premium',
      startDate: '2025-08-20',
      endDate: '2025-09-20',
      status: 'Active',
      ordersUsed: 12,
      maxOrders: 15
    },
    {
      id: 'SUB-005',
      userId: 'USER-005',
      userName: 'David Lee',
      userEmail: 'david@example.com',
      planName: 'Basic Plan',
      planType: 'Basic',
      startDate: '2025-08-05',
      endDate: '2025-09-05',
      status: 'Cancelled',
      ordersUsed: 2,
      maxOrders: 5
    }
  ]);

  const [activeTab, setActiveTab] = useState<'plans' | 'users'>('plans');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<Membership | UserMembership | null>(null);
  const [formData, setFormData] = useState<Partial<Membership>>({});

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'Basic': return <Users className="h-5 w-5" />;
      case 'Premium': return <Star className="h-5 w-5" />;
      case 'Gold': return <Crown className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'Basic': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMemberships = memberships.filter(membership => {
    const matchesSearch = 
      membership.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.planType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || (statusFilter === 'Active' ? membership.isActive : !membership.isActive);
    return matchesSearch && matchesStatus;
  });

  const filteredUserMemberships = userMemberships.filter(membership => {
    const matchesSearch = 
      membership.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || membership.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (type: 'add' | 'edit' | 'view', item?: Membership | UserMembership) => {
    setModalType(type);
    setSelectedItem(item || null);
    if (type === 'add') {
      setFormData({
        planName: '',
        planType: 'Basic',
        price: 0,
        duration: 1,
        features: [],
        maxOrders: 5,
        discount: 0,
        isActive: true
      });
    } else if (type === 'edit' && item && 'planName' in item) {
      setFormData(item);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newMembership: Membership = {
        id: `PLAN-${String(memberships.length + 1).padStart(3, '0')}`,
        planName: formData.planName || '',
        planType: formData.planType || 'Basic',
        price: formData.price || 0,
        duration: formData.duration || 1,
        features: formData.features || [],
        maxOrders: formData.maxOrders || 5,
        discount: formData.discount || 0,
        isActive: formData.isActive !== false,
        totalSubscribers: 0,
        revenue: 0
      };
      setMemberships([...memberships, newMembership]);
    } else if (modalType === 'edit' && selectedItem && 'planName' in selectedItem) {
      setMemberships(memberships.map(m => 
        m.id === selectedItem.id ? { ...m, ...formData } : m
      ));
    }
    closeModal();
  };

  const deleteMembership = (id: string) => {
    if (window.confirm('Are you sure you want to delete this membership plan?')) {
      setMemberships(memberships.filter(m => m.id !== id));
    }
  };

  const toggleMembershipStatus = (id: string) => {
    setMemberships(memberships.map(m => 
      m.id === id ? { ...m, isActive: !m.isActive } : m
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const totalRevenue = memberships.reduce((sum, m) => sum + m.revenue, 0);
  const totalSubscribers = memberships.reduce((sum, m) => sum + m.totalSubscribers, 0);
  const activeSubscribers = userMemberships.filter(u => u.status === 'Active').length;

  return (
    <AdminLayout currentPage="memberships">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Membership Management</h1>
            <p className="text-gray-600">Manage membership plans and user subscriptions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSubscribers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Plans</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {memberships.filter(m => m.isActive).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{activeSubscribers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === 'plans'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Membership Plans ({memberships.length})
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === 'users'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  User Subscriptions ({userMemberships.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={activeTab === 'plans' ? "Search plans..." : "Search users..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    {activeTab === 'plans' ? (
                      <>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </>
                    ) : (
                      <>
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                        <option value="Cancelled">Cancelled</option>
                      </>
                    )}
                  </select>
                </div>
                {activeTab === 'plans' && (
                  <button
                    onClick={() => openModal('add')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plan
                  </button>
                )}
              </div>

              {activeTab === 'plans' ? (
                /* Membership Plans Grid */
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMemberships.map((membership) => (
                    <div key={membership.id} className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg ${getPlanColor(membership.planType).replace('text-', 'text-').replace('border-', 'bg-').split(' ')[0]}`}>
                            {getPlanIcon(membership.planType)}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-semibold text-gray-900">{membership.planName}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPlanColor(membership.planType)}`}>
                              {membership.planType}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal('edit', membership)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteMembership(membership.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-3xl font-bold text-gray-900">₹{membership.price}</span>
                          <span className="text-sm text-gray-500">per month</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Max Orders:</span>
                            <span className="font-medium">{membership.maxOrders === -1 ? 'Unlimited' : membership.maxOrders}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Discount:</span>
                            <span className="font-medium">{membership.discount}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subscribers:</span>
                            <span className="font-medium">{membership.totalSubscribers}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Revenue:</span>
                            <span className="font-medium">₹{membership.revenue.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Features:</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            {membership.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <button
                            onClick={() => toggleMembershipStatus(membership.id)}
                            className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                              membership.isActive
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {membership.isActive ? 'Active Plan' : 'Inactive Plan'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* User Subscriptions Table */
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders Used
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUserMemberships.map((subscription) => (
                        <tr key={subscription.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{subscription.userName}</div>
                              <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPlanColor(subscription.planType)}`}>
                              {getPlanIcon(subscription.planType)}
                              <span className="ml-1">{subscription.planName}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>
                              <div className="font-medium">{formatDate(subscription.startDate)}</div>
                              <div className="text-gray-500">to {formatDate(subscription.endDate)}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {subscription.ordersUsed} / {subscription.maxOrders === -1 ? '∞' : subscription.maxOrders}
                              </div>
                              {subscription.maxOrders !== -1 && (
                                <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-blue-600 h-1.5 rounded-full" 
                                    style={{width: `${Math.min((subscription.ordersUsed / subscription.maxOrders) * 100, 100)}%`}}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                              {subscription.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => openModal('view', subscription)}
                              className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {((activeTab === 'plans' && filteredMemberships.length === 0) ||
                (activeTab === 'users' && filteredUserMemberships.length === 0)) && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <Search className="h-8 w-8" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-500">No {activeTab === 'plans' ? 'plans' : 'subscriptions'} found</p>
                  <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Plan */}
      {isModalOpen && (modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {modalType === 'add' ? 'Add New Plan' : 'Edit Plan'}
                  </h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                    <input
                      type="text"
                      value={formData.planName || ''}
                      onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                    <select
                      value={formData.planType || 'Basic'}
                      onChange={(e) => setFormData({ ...formData, planType: e.target.value as 'Basic' | 'Premium' | 'Gold' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="Gold">Gold</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                      <input
                        type="number"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Orders</label>
                      <input
                        type="number"
                        value={formData.maxOrders === -1 ? '' : formData.maxOrders || ''}
                        onChange={(e) => setFormData({ ...formData, maxOrders: parseInt(e.target.value) || 5 })}
                        placeholder="Enter -1 for unlimited"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                      <input
                        type="number"
                        value={formData.discount || ''}
                        onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                    <textarea
                      value={formData.features?.join('\n') || ''}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive !== false}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active Plan</label>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {modalType === 'add' ? 'Add Plan' : 'Save Changes'}
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View User Subscription */}
      {isModalOpen && modalType === 'view' && selectedItem && 'userName' in selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Subscription Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">User Information</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div><span className="font-medium">Name:</span> {selectedItem.userName}</div>
                      <div><span className="font-medium">Email:</span> {selectedItem.userEmail}</div>
                      <div><span className="font-medium">User ID:</span> {selectedItem.userId}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Subscription Details</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div><span className="font-medium">Plan:</span> {selectedItem.planName}</div>
                      <div><span className="font-medium">Type:</span> 
                        <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPlanColor(selectedItem.planType)}`}>
                          {getPlanIcon(selectedItem.planType)}
                          <span className="ml-1">{selectedItem.planType}</span>
                        </span>
                      </div>
                      <div><span className="font-medium">Start Date:</span> {formatDate(selectedItem.startDate)}</div>
                      <div><span className="font-medium">End Date:</span> {formatDate(selectedItem.endDate)}</div>
                      <div><span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedItem.status)}`}>
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Usage Statistics</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div><span className="font-medium">Orders Used:</span> {selectedItem.ordersUsed}</div>
                      <div><span className="font-medium">Max Orders:</span> {selectedItem.maxOrders === -1 ? 'Unlimited' : selectedItem.maxOrders}</div>
                      {selectedItem.maxOrders !== -1 && (
                        <div>
                          <span className="font-medium">Usage:</span> 
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{width: `${Math.min((selectedItem.ordersUsed / selectedItem.maxOrders) * 100, 100)}%`}}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500 mt-1 block">
                            {Math.round((selectedItem.ordersUsed / selectedItem.maxOrders) * 100)}% used
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMemberships;