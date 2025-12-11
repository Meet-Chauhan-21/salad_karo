import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import {
  Search,
  Eye,
  Check,
  X,
  Clock,
  Package,
  Mail,
  Phone,
  Truck,
  MoreHorizontal
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

interface Order {
  _id: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'Processing' | 'Delivered' | 'Cancelled';
  orderDate: string;
  deliveryDate: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [changedOrders, setChangedOrders] = useState<Map<string, string>>(new Map());

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log('AdminOrders component mounted');
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.GET_ALL_ORDERS));
      const data = await response.json();
      if (data.success) {
        // Sort by date descending (newest first)
        const sortedOrders = data.orders.sort((a: Order, b: Order) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        setOrders(sortedOrders);
      } else {
        console.error('API returned success:false');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders: ' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOptions = ['Processing', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === 'All Status' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return <Package className="h-4 w-4" />;
      case 'Delivered': return <Check className="h-4 w-4" />;
      case 'Cancelled': return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Update locally first
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, status: newStatus as Order['status'] } : order
    ));
    // Track the change
    setChangedOrders(prev => new Map(prev).set(orderId, newStatus));
  };

  const saveOrderStatus = async (orderId: string) => {
    try {
      const newStatus = changedOrders.get(orderId);
      if (!newStatus) return;

      const response = await fetch(buildApiUrl(`${API_ENDPOINTS.UPDATE_ORDER_STATUS}/${orderId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });
      const data = await response.json();

      if (data.success) {
        // Remove from changed orders after successful save
        setChangedOrders(prev => {
          const newMap = new Map(prev);
          newMap.delete(orderId);
          return newMap;
        });
        alert('Order status updated successfully!');
      }
    } catch (error) {
      console.error('Error saving order status:', error);
      alert('Failed to update order status');
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <AdminLayout currentPage="orders">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Debug Info */}
          {loading && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">Loading orders from database...</p>
            </div>
          )}
          {!loading && orders.length === 0 && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">No orders found in database. Please place some orders first.</p>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">View and manage customer orders</p>
            <p className="text-sm text-gray-500 mt-1">Total Orders: {orders.length}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'Processing').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'Processing').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'Delivered').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Truck className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders by ID, customer name, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Status">All Status</SelectItem>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table - Desktop View */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">Loading...</TableCell>
                    </TableRow>
                  ) : currentOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">No orders found.</TableCell>
                    </TableRow>
                  ) : (
                    currentOrders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium text-xs text-gray-500">#{order._id.slice(-6)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{order.userName || 'N/A'}</span>
                            <span className="text-xs text-gray-500">{order.userEmail}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600 line-clamp-1">
                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                          </span>
                        </TableCell>
                        <TableCell>₹{order.total}</TableCell>
                        <TableCell className="text-sm text-gray-500">{formatDate(order.orderDate)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className={`h-8 border-dashed ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-2">{order.status}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {statusOptions.map((status) => (
                                <DropdownMenuItem key={status} onClick={() => {
                                  updateOrderStatus(order._id, status);
                                }}>
                                  {status}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {changedOrders.has(order._id) && (
                            <Button
                              size="sm"
                              className="ml-2 h-8 bg-green-600 hover:bg-green-700"
                              onClick={() => saveOrderStatus(order._id)}
                            >
                              Save
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

            </div>
          </div>

          {/* Orders List - Mobile View */}
          <div className="space-y-4 md:hidden">
            {loading ? (
              <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
                Loading...
              </div>
            ) : currentOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
                No orders found.
              </div>
            ) : (
              currentOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-semibold text-gray-900 block">#{order._id.slice(-6)}</span>
                      <span className="text-xs text-gray-500">{formatDate(order.orderDate)}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className={`h-7 px-2 border-dashed text-xs ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {statusOptions.map((status) => (
                          <DropdownMenuItem key={status} onClick={() => updateOrderStatus(order._id, status)}>
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="border-t border-gray-100 py-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Customer:</span>
                      <span className="font-medium text-right">{order.userName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Items:</span>
                      <span className="text-gray-900 text-right line-clamp-1 max-w-[60%]">
                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total:</span>
                      <span className="font-bold text-green-600">₹{order.total}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    <Button
                      variant="outline"
                      className="flex-1 h-9 text-sm"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-2" />
                      Details
                    </Button>
                    {changedOrders.has(order._id) && (
                      <Button
                        className="flex-1 h-9 bg-green-600 hover:bg-green-700 text-sm"
                        onClick={() => saveOrderStatus(order._id)}
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {filteredOrders.length > 0 && (
            <div className="py-4 border-t border-gray-100">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>

        {filteredOrders.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                <Search className="h-8 w-8" />
              </div>
            </div>
            <p className="text-lg text-gray-500">No orders found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div>
                          <span className="font-medium">Name:</span> {selectedOrder.userName || 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{selectedOrder.userEmail}</span>
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {selectedOrder.userPhone || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Order Information</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div><span className="font-medium">Order Date:</span> {formatDate(selectedOrder.orderDate)}</div>
                        <div><span className="font-medium">Delivery Date:</span> {formatDate(selectedOrder.deliveryDate)}</div>
                        <div><span className="font-medium">Status:</span>
                          <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                            {getStatusIcon(selectedOrder.status)}
                            <span className="ml-1">{selectedOrder.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-500 ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-300">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-lg font-bold text-green-600">₹{selectedOrder.total}</span>
                      </div>
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

    </AdminLayout >
  );
};

export default AdminOrders;