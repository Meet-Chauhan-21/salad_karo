import React, { useState, useEffect } from 'react';
import {
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
  Save,
  Loader2,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS, buildApiUrl } from '../config/api';
import { toast } from 'sonner';

interface Membership {
  id: string;
  planName: string;
  planType: 'Starter' | 'Popular' | 'Elite';
  price: number;
  originalPrice: number;
  duration: number; // in months
  saladsPerWeek: string;
  features: string[];
  discount: number; // percentage
  isActive: boolean;
  totalSubscribers: number;
  revenue: number;
}

interface UserMembership {
  id: string; // This is the subscription ID
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  planName: string;
  planType: 'Starter' | 'Popular' | 'Elite';
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Cancelled';
  ordersUsed: number;
  saladsPerWeek: string;
}

const AdminMemberships: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  const [userMemberships, setUserMemberships] = useState<UserMembership[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansRes, subsRes] = await Promise.all([
        axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_PLANS)),
        axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_SUBSCRIPTIONS))
      ]);
      setMemberships(plansRes.data);
      setUserMemberships(subsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load membership data');
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState<'plans' | 'users'>('plans');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<Membership | UserMembership | null>(null);
  const [formData, setFormData] = useState<Partial<Membership>>({});

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'Starter': return <Users className="h-5 w-5" />;
      case 'Popular': return <Star className="h-5 w-5" />;
      case 'Elite': return <Crown className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'Starter': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Popular': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Elite': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Expired': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMemberships = memberships.filter(membership => {
    const matchesSearch =
      membership.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.planType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === 'All Statuses' || (statusFilter === 'Active' ? membership.isActive : !membership.isActive);
    return matchesSearch && matchesStatus;
  });

  const filteredUserMemberships = userMemberships.filter(membership => {
    const matchesSearch =
      membership.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === 'All Statuses' || membership.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (type: 'add' | 'edit' | 'view', item?: Membership | UserMembership) => {
    setModalType(type);
    setSelectedItem(item || null);
    if (type === 'add') {
      setFormData({
        planName: '',
        planType: 'Starter',
        price: 0,
        originalPrice: 0,
        duration: 1,
        saladsPerWeek: '3 Salads/Week',
        features: [],
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

  const handleSave = async () => {
    try {
      if (modalType === 'add') {
        const payload = {
          planName: formData.planName,
          planType: formData.planType,
          price: formData.price,
          originalPrice: formData.originalPrice,
          duration: formData.duration,
          saladsPerWeek: formData.saladsPerWeek,
          features: formData.features,
          discount: formData.discount,
          isActive: formData.isActive !== false
        };
        await axios.post(buildApiUrl(API_ENDPOINTS.CREATE_PLAN), payload);
        toast.success('Plan created successfully');
      } else if (modalType === 'edit' && selectedItem && 'planName' in selectedItem) {
        await axios.put(buildApiUrl(`${API_ENDPOINTS.UPDATE_PLAN}/${selectedItem.id}`), formData);
        toast.success('Plan updated successfully');
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error('Failed to save plan');
    }
  };

  const deleteMembership = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this membership plan?')) {
      try {
        await axios.delete(buildApiUrl(`${API_ENDPOINTS.DELETE_PLAN}/${id}`));
        toast.success('Plan deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting plan:', error);
        toast.error('Failed to delete plan');
      }
    }
  };

  const toggleMembershipStatus = async (id: string) => {
    try {
      await axios.put(buildApiUrl(`${API_ENDPOINTS.TOGGLE_PLAN_STATUS}/${id}`));
      toast.success('Plan status updated');
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleUpdateSubscriptionStatus = async (subscriptionId: string, newStatus: string) => {
    try {
      // Optimistic update
      setUserMemberships(prev => prev.map(sub =>
        sub.id === subscriptionId ? { ...sub, status: newStatus as any } : sub
      ));

      await axios.put(buildApiUrl(`${API_ENDPOINTS.UPDATE_SUBSCRIPTION_STATUS}/${subscriptionId}`), { status: newStatus });
      toast.success(`Subscription status updated to ${newStatus}`);

      // Refresh to ensure sync
      fetchData();
    } catch (error) {
      console.error('Error updating subscription status:', error);
      toast.error('Failed to update subscription status');
      fetchData(); // Revert on error
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const calculateDaysProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();

    if (now < start) return 0;
    if (now > end) return 100;

    const total = end - start;
    const elapsed = now - start;

    return Math.min(Math.round((elapsed / total) * 100), 100);
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const days = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const totalRevenue = memberships.reduce((sum, m) => sum + m.revenue, 0);
  const totalSubscribers = memberships.reduce((sum, m) => sum + m.totalSubscribers, 0);
  const activeSubscribers = userMemberships.filter(u => u.status === 'Active').length;

  if (loading) {
    return (
      <AdminLayout currentPage="memberships">
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="memberships">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Membership Management</h1>
              <p className="text-gray-600">Overview of your membership ecosystem</p>
            </div>
            {activeTab === 'plans' && (
              <button
                onClick={() => openModal('add')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Plan
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center relative z-10">
                <div className="p-3 bg-green-100/50 rounded-xl backdrop-blur-sm">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Revenue</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center relative z-10">
                <div className="p-3 bg-blue-100/50 rounded-xl backdrop-blur-sm">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Subscribers</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{totalSubscribers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center relative z-10">
                <div className="p-3 bg-purple-100/50 rounded-xl backdrop-blur-sm">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Plans</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">
                    {memberships.filter(m => m.isActive).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center relative z-10">
                <div className="p-3 bg-yellow-100/50 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Users</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{activeSubscribers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls & Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
            <div className="border-b border-gray-100">
              <nav className="flex px-2">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`px-8 py-5 text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-2 ${activeTab === 'plans'
                    ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                >
                  <Award className="w-4 h-4" />
                  Membership Plans <span className="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{memberships.length}</span>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-8 py-5 text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-2 ${activeTab === 'users'
                    ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                >
                  <Users className="w-4 h-4" />
                  User Subscriptions <span className="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{userMemberships.length}</span>
                </button>
              </nav>
            </div>

            <div className="p-6 bg-gray-50/50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      placeholder={activeTab === 'plans' ? "Search by plan name or type..." : "Search by user, email or plan..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white shadow-sm"
                    />
                  </div>
                </div>
                <div className="md:w-64 relative">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                      <Filter className="h-5 w-5 text-gray-500" />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-white shadow-sm h-auto">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Statuses">All Statuses</SelectItem>
                        {activeTab === 'plans' ? (
                          <>
                            <SelectItem value="Active">Active Plans</SelectItem>
                            <SelectItem value="Inactive">Inactive Plans</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="Active">Active Users</SelectItem>
                            <SelectItem value="Expired">Expired Users</SelectItem>
                            <SelectItem value="Cancelled">Cancelled Users</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {activeTab === 'plans' ? (
            /* Membership Plans Grid */
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredMemberships.map((membership) => (
                <div key={membership.id} className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-300 overflow-hidden flex flex-col group">
                  <div className="p-8 flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-xl text-white shadow-lg transform transition-transform group-hover:rotate-12 ${membership.planType === 'Elite' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                          membership.planType === 'Popular' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                            'bg-gradient-to-br from-blue-400 to-blue-600'
                          }`}>
                          {getPlanIcon(membership.planType)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{membership.planName}</h3>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-1 ${getPlanColor(membership.planType)}`}>
                            {membership.planType}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openModal('edit', membership)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteMembership(membership.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-gray-900">₹{membership.price}</span>
                          <span className="text-gray-500 font-medium">/ month</span>
                        </div>
                        {membership.originalPrice > membership.price && (
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-400 line-through">₹{membership.originalPrice}</span>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                              {membership.discount}% SAVE
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Subscribers</p>
                          <p className="text-lg font-bold text-gray-900 mt-0.5">{membership.totalSubscribers}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Est. Revenue</p>
                          <p className="text-lg font-bold text-gray-900 mt-0.5">₹{membership.revenue > 1000 ? (membership.revenue / 1000).toFixed(1) + 'k' : membership.revenue}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {membership.saladsPerWeek}
                        </p>
                        {membership.features.slice(0, 3).map((feature, idx) => (
                          <p key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            {feature}
                          </p>
                        ))}
                        {membership.features.length > 3 && (
                          <p className="text-xs text-gray-400 font-medium pl-3.5">+ {membership.features.length - 3} more features</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                    <button
                      onClick={() => toggleMembershipStatus(membership.id)}
                      className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${membership.isActive
                        ? 'bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-sm'
                        : 'bg-white border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 shadow-sm opacity-80'
                        }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${membership.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {membership.isActive ? 'Active Plan' : 'Inactive Plan'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* User Subscriptions Table */
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User Profile</th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Membership Detail</th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Progress & Timeline</th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUserMemberships.map((subscription) => {
                      let progress = calculateDaysProgress(subscription.startDate, subscription.endDate);
                      let daysLeft = getDaysRemaining(subscription.endDate);
                      const isExpired = subscription.status === 'Expired';
                      const isCancelled = subscription.status === 'Cancelled';

                      if (isExpired || isCancelled) {
                        progress = 100;
                        daysLeft = 0;
                      }

                      return (
                        <tr
                          key={subscription.id}
                          className="hover:bg-blue-50/50 transition-colors duration-200 group"
                        >
                          <td className="px-8 py-5" onClick={() => openModal('view', subscription)}>
                            <div className="cursor-pointer">
                              <div className="font-bold text-gray-900 text-base">{subscription.userName}</div>
                              <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                              {subscription.userPhone && (
                                <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-blue-600">
                                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                  {subscription.userPhone}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-5" onClick={() => openModal('view', subscription)}>
                            <div className="cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                {getPlanIcon(subscription.planType)}
                                <span className="font-bold text-gray-800">{subscription.planName}</span>
                              </div>
                              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${getPlanColor(subscription.planType)}`}>
                                {subscription.planType}
                              </span>
                              <div className="mt-2 text-sm text-gray-500 font-medium">
                                {subscription.ordersUsed} items ordered
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 w-1/3" onClick={() => openModal('view', subscription)}>
                            <div className="space-y-2 cursor-pointer">
                              <div className="flex justify-between text-xs font-medium text-gray-500">
                                <span>Started {formatDate(subscription.startDate)}</span>
                                <span>Ends {formatDate(subscription.endDate)}</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${isCancelled ? 'bg-red-500' :
                                    isExpired ? 'bg-gray-500' :
                                      daysLeft < 5 ? 'bg-red-500' :
                                        progress > 80 ? 'bg-orange-500' : 'bg-green-500'
                                    }`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700">{progress}% utilized</span>
                                <span className={`font-bold px-2 py-0.5 rounded-md ${isCancelled ? 'bg-red-100 text-red-700' :
                                  isExpired ? 'bg-gray-100 text-gray-700' :
                                    daysLeft < 5 ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'
                                  }`}>
                                  {isCancelled ? 'Plan Cancelled' :
                                    isExpired ? 'Plan Expired' :
                                      `${daysLeft} days remaining`}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="relative inline-block text-left w-full max-w-[140px]">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={`w-full justify-between font-bold border rounded-lg h-9 px-3 text-sm
                                      ${subscription.status === 'Active' ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800' : ''}
                                      ${subscription.status === 'Expired' ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800' : ''}
                                      ${subscription.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800' : ''}
                                    `}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {subscription.status}
                                    <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[140px]">
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleUpdateSubscriptionStatus(subscription.id, 'Active'); }}>
                                    Active
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleUpdateSubscriptionStatus(subscription.id, 'Expired'); }}>
                                    Expired
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleUpdateSubscriptionStatus(subscription.id, 'Cancelled'); }}>
                                    Cancelled
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
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
                          value={formData.planType || 'Starter'}
                          onChange={(e) => setFormData({ ...formData, planType: e.target.value as 'Starter' | 'Popular' | 'Elite' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Starter">Starter</option>
                          <option value="Popular">Popular</option>
                          <option value="Elite">Elite</option>
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                          <input
                            type="number"
                            value={formData.originalPrice || ''}
                            onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Salads Per Week</label>
                          <input
                            type="text"
                            value={formData.saladsPerWeek || ''}
                            onChange={(e) => setFormData({ ...formData, saladsPerWeek: e.target.value })}
                            placeholder="e.g., 3 Salads/Week or Unlimited"
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                        <input
                          type="number"
                          value={formData.discount || ''}
                          onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
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
                          <div><span className="font-medium">Name:</span> {(selectedItem as UserMembership).userName}</div>
                          <div><span className="font-medium">Email:</span> {(selectedItem as UserMembership).userEmail}</div>
                          <div><span className="font-medium">User ID:</span> {(selectedItem as UserMembership).userId}</div>
                          {(selectedItem as UserMembership).userPhone && (
                            <div><span className="font-medium">Phone:</span> {(selectedItem as UserMembership).userPhone}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Subscription Details</h4>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div><span className="font-medium">Plan:</span> {(selectedItem as UserMembership).planName}</div>
                          <div><span className="font-medium">Type:</span>
                            <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPlanColor((selectedItem as UserMembership).planType)}`}>
                              {getPlanIcon((selectedItem as UserMembership).planType)}
                              <span className="ml-1">{(selectedItem as UserMembership).planType}</span>
                            </span>
                          </div>
                          <div><span className="font-medium">Start Date:</span> {formatDate((selectedItem as UserMembership).startDate)}</div>
                          <div><span className="font-medium">End Date:</span> {formatDate((selectedItem as UserMembership).endDate)}</div>
                          <div><span className="font-medium">Status:</span>
                            <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor((selectedItem as UserMembership).status)}`}>
                              {(selectedItem as UserMembership).status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Usage Statistics</h4>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div><span className="font-medium">Orders Used:</span> {(selectedItem as UserMembership).ordersUsed}</div>
                          <div><span className="font-medium">Plan Allocation:</span> {(selectedItem as UserMembership).saladsPerWeek}</div>
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

        </div>
      </div>
    </AdminLayout >
  );
};

export default AdminMemberships;