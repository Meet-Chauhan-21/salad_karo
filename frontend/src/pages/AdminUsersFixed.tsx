import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  Search, 
  Mail,
  Phone,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
  X,
  ShoppingBag
} from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  address?: string;
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('AdminUsers component mounted');
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users from API...');
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.USERS));
      console.log('Users API response:', response.data);
      if (response.data.success) {
        console.log('Users fetched:', response.data.users.length);
        setUsers(response.data.users);
      } else {
        console.error('API returned success:false');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users: ' + (error as any).message);
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    
    return matchesSearch;
  });

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'banned':
        return <Badge variant="destructive">Banned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout currentPage="users">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Debug Info */}
        {loading && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">Loading users from database...</p>
          </div>
        )}
        {!loading && users.length === 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">No users found in database.</p>
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              User Management
            </h1>
            <p className="text-gray-600 mt-2">View and manage customer accounts</p>
            <p className="text-sm text-gray-500 mt-1">Total Users: {users.length}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{loading ? '...' : totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{loading ? '...' : users.reduce((sum, u) => sum + u.totalOrders, 0)}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{loading ? '...' : totalRevenue.toLocaleString()}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
            <CardDescription>
              View all registered customer accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Stats</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow 
                          key={user._id} 
                          onClick={() => handleUserClick(user)}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-gray-400" />
                                {user.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3 text-gray-400" />
                                {user.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {user.city && (
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-3 w-3 text-gray-400" />
                                  {user.city}
                                </div>
                              )}
                              {user.address && (
                                <p className="text-xs text-gray-500">{user.address.substring(0, 30)}...</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{user.totalOrders} orders</p>
                              <p className="text-sm text-gray-500">₹{user.totalSpent.toFixed(2)} spent</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(user.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {new Date(user.joinDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* User Avatar and Basic Info */}
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h4>
                      <div className="mt-2">{getStatusBadge(selectedUser.status)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedUser.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedUser.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Location Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedUser.city || 'N/A'}</span>
                        </div>
                        {selectedUser.address && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Address:</span> {selectedUser.address}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Order Stats */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Total Orders</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.totalOrders}</p>
                    </div>

                    {/* Revenue Stats */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Total Spent</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">₹{selectedUser.totalSpent.toFixed(2)}</p>
                    </div>

                    {/* Join Date */}
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Member Since</span>
                      </div>
                      <p className="text-lg font-bold text-purple-600">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setIsModalOpen(false)}
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

export default AdminUsers;