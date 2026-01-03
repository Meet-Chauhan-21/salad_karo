import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

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

interface Salad {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  isActive: boolean;
}

interface Membership {
  _id: string;
  id?: string; // For compatibility
  planName: string;
  planType: 'Starter' | 'Popular' | 'Elite';
  price: number;
  originalPrice: number;
  duration: number; // in months
  saladsPerWeek: string;
  features: string[];
  discount: number;
  isActive: boolean;
  name?: string; // Alias for planName
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

interface AdminDataContextType {
  // Orders
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;
  fetchOrders: (force?: boolean) => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  
  // Salads
  salads: Salad[];
  saladsLoading: boolean;
  saladsError: string | null;
  fetchSalads: (force?: boolean) => Promise<void>;
  addSalad: (salad: Partial<Salad>) => Promise<void>;
  updateSalad: (id: string, salad: Partial<Salad>) => Promise<void>;
  deleteSalad: (id: string) => Promise<void>;
  toggleSaladStatus: (id: string) => Promise<void>;
  
  // Memberships
  memberships: Membership[];
  membershipsLoading: boolean;
  membershipsError: string | null;
  fetchMemberships: (force?: boolean) => Promise<void>;
  addMembership: (membership: Partial<Membership>) => Promise<void>;
  updateMembership: (id: string, membership: Partial<Membership>) => Promise<void>;
  deleteMembership: (id: string) => Promise<void>;
  toggleMembershipStatus: (id: string) => Promise<void>;
  
  // Users
  users: User[];
  usersLoading: boolean;
  usersError: string | null;
  fetchUsers: (force?: boolean) => Promise<void>;
  updateUserStatus: (id: string, isActive: boolean) => Promise<void>;
  
  // Refresh all data
  refreshAllData: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [ordersFetched, setOrdersFetched] = useState(false);
  
  // Salads State
  const [salads, setSalads] = useState<Salad[]>([]);
  const [saladsLoading, setSaladsLoading] = useState(false);
  const [saladsError, setSaladsError] = useState<string | null>(null);
  const [saladsFetched, setSaladsFetched] = useState(false);
  
  // Memberships State
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [membershipsLoading, setMembershipsLoading] = useState(false);
  const [membershipsError, setMembershipsError] = useState<string | null>(null);
  const [membershipsFetched, setMembershipsFetched] = useState(false);
  
  // Users State
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [usersFetched, setUsersFetched] = useState(false);

  // Fetch Orders
  const fetchOrders = useCallback(async (force: boolean = false) => {
    if (!force && ordersFetched) {
      console.log('Orders already fetched, using cached data');
      return;
    }
    
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.GET_ALL_ORDERS));
      const data = await response.json();
      if (data.success) {
        const sortedOrders = data.orders.sort((a: Order, b: Order) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        setOrders(sortedOrders);
        setOrdersFetched(true);
      } else {
        setOrdersError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrdersError((error as Error).message);
    } finally {
      setOrdersLoading(false);
    }
  }, [ordersFetched]);

  // Update Order Status
  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.UPDATE_ORDER_STATUS(orderId)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(prev => prev.map(order =>
          order._id === orderId ? { ...order, status: status as any } : order
        ));
      } else {
        throw new Error(data.message || 'Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }, []);

  // Fetch Salads
  const fetchSalads = useCallback(async (force: boolean = false) => {
    if (!force && saladsFetched) {
      console.log('Salads already fetched, using cached data');
      return;
    }
    
    setSaladsLoading(true);
    setSaladsError(null);
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.GET_ALL_SALADS));
      const data = await response.json();
      if (data.success) {
        setSalads(data.salads);
        setSaladsFetched(true);
      } else {
        setSaladsError('Failed to fetch salads');
      }
    } catch (error) {
      console.error('Error fetching salads:', error);
      setSaladsError((error as Error).message);
    } finally {
      setSaladsLoading(false);
    }
  }, [saladsFetched]);

  // Add Salad
  const addSalad = useCallback(async (salad: Partial<Salad>) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.ADD_SALAD), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(salad),
      });
      const data = await response.json();
      if (data.success) {
        setSalads(prev => [...prev, data.salad]);
      } else {
        throw new Error(data.message || 'Failed to add salad');
      }
    } catch (error) {
      console.error('Error adding salad:', error);
      throw error;
    }
  }, []);

  // Update Salad
  const updateSalad = useCallback(async (id: string, salad: Partial<Salad>) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.UPDATE_SALAD(id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(salad),
      });
      const data = await response.json();
      if (data.success) {
        setSalads(prev => prev.map(s => s._id === id ? { ...s, ...salad } : s));
      } else {
        throw new Error(data.message || 'Failed to update salad');
      }
    } catch (error) {
      console.error('Error updating salad:', error);
      throw error;
    }
  }, []);

  // Delete Salad
  const deleteSalad = useCallback(async (id: string) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.DELETE_SALAD(id)), {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setSalads(prev => prev.filter(s => s._id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete salad');
      }
    } catch (error) {
      console.error('Error deleting salad:', error);
      throw error;
    }
  }, []);

  // Toggle Salad Status
  const toggleSaladStatus = useCallback(async (id: string) => {
    try {
      const salad = salads.find(s => s._id === id);
      if (!salad) return;
      
      const response = await fetch(buildApiUrl(API_ENDPOINTS.TOGGLE_SALAD_STATUS(id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !salad.isActive }),
      });
      const data = await response.json();
      if (data.success) {
        setSalads(prev => prev.map(s => s._id === id ? { ...s, isActive: !s.isActive } : s));
      } else {
        throw new Error(data.message || 'Failed to toggle salad status');
      }
    } catch (error) {
      console.error('Error toggling salad status:', error);
      throw error;
    }
  }, [salads]);

  // Fetch Memberships
  const fetchMemberships = useCallback(async (force: boolean = false) => {
    if (!force && membershipsFetched) {
      console.log('Memberships already fetched, using cached data');
      return;
    }
    
    setMembershipsLoading(true);
    setMembershipsError(null);
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.GET_ALL_MEMBERSHIPS));
      const data = await response.json();
      // Backend returns array directly, not wrapped in success object
      if (Array.isArray(data)) {
        // Transform data to include both _id and id for compatibility
        const transformedMemberships = data.map((m: any) => ({
          ...m,
          id: m._id || m.id,
          name: m.planName
        }));
        setMemberships(transformedMemberships);
        setMembershipsFetched(true);
      } else {
        setMembershipsError('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching memberships:', error);
      setMembershipsError((error as Error).message);
    } finally {
      setMembershipsLoading(false);
    }
  }, [membershipsFetched]);

  // Add Membership
  const addMembership = useCallback(async (membership: Partial<Membership>) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.ADD_MEMBERSHIP), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(membership),
      });
      const data = await response.json();
      if (data.plan) {
        const transformedPlan = {
          ...data.plan,
          id: data.plan._id || data.plan.id,
          name: data.plan.planName
        };
        setMemberships(prev => [...prev, transformedPlan]);
        return transformedPlan;
      } else {
        throw new Error(data.message || 'Failed to add membership');
      }
    } catch (error) {
      console.error('Error adding membership:', error);
      throw error;
    }
  }, []);

  // Update Membership
  const updateMembership = useCallback(async (id: string, membership: Partial<Membership>) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.UPDATE_MEMBERSHIP(id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(membership),
      });
      const data = await response.json();
      if (data.plan) {
        const transformedPlan = {
          ...data.plan,
          id: data.plan._id || data.plan.id,
          name: data.plan.planName
        };
        setMemberships(prev => prev.map(m => (m._id === id || m.id === id) ? { ...m, ...transformedPlan } : m));
        return transformedPlan;
      } else {
        throw new Error(data.message || 'Failed to update membership');
      }
    } catch (error) {
      console.error('Error updating membership:', error);
      throw error;
    }
  }, []);

  // Delete Membership
  const deleteMembership = useCallback(async (id: string) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.DELETE_MEMBERSHIP(id)), {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.message) {
        setMemberships(prev => prev.filter(m => m._id !== id && m.id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete membership');
      }
    } catch (error) {
      console.error('Error deleting membership:', error);
      throw error;
    }
  }, []);

  // Toggle Membership Status
  const toggleMembershipStatus = useCallback(async (id: string) => {
    try {
      const membership = memberships.find(m => m._id === id || m.id === id);
      if (!membership) return;
      
      const response = await fetch(buildApiUrl(API_ENDPOINTS.TOGGLE_PLAN_STATUS + `/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.plan) {
        setMemberships(prev => prev.map(m => 
          (m._id === id || m.id === id) ? { ...m, isActive: !m.isActive } : m
        ));
      } else {
        throw new Error(data.message || 'Failed to toggle membership status');
      }
    } catch (error) {
      console.error('Error toggling membership status:', error);
      throw error;
    }
  }, [memberships]);

  // Fetch Users
  const fetchUsers = useCallback(async (force: boolean = false) => {
    if (!force && usersFetched) {
      console.log('Users already fetched, using cached data');
      return;
    }
    
    setUsersLoading(true);
    setUsersError(null);
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.GET_ALL_USERS));
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setUsersFetched(true);
      } else {
        setUsersError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsersError((error as Error).message);
    } finally {
      setUsersLoading(false);
    }
  }, [usersFetched]);

  // Update User Status
  const updateUserStatus = useCallback(async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.UPDATE_USER_STATUS(id)), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, isActive } : u));
      } else {
        throw new Error(data.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }, []);

  // Refresh All Data
  const refreshAllData = useCallback(async () => {
    await Promise.all([
      fetchOrders(true),
      fetchSalads(true),
      fetchMemberships(true),
      fetchUsers(true),
    ]);
  }, [fetchOrders, fetchSalads, fetchMemberships, fetchUsers]);

  const value: AdminDataContextType = {
    orders,
    ordersLoading,
    ordersError,
    fetchOrders,
    updateOrderStatus,
    
    salads,
    saladsLoading,
    saladsError,
    fetchSalads,
    addSalad,
    updateSalad,
    deleteSalad,
    toggleSaladStatus,
    
    memberships,
    membershipsLoading,
    membershipsError,
    fetchMemberships,
    addMembership,
    updateMembership,
    deleteMembership,
    toggleMembershipStatus,
    
    users,
    usersLoading,
    usersError,
    fetchUsers,
    updateUserStatus,
    
    refreshAllData,
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
