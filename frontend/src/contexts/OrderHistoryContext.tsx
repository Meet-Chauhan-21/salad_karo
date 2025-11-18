import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  orderDate: string;
  deliveryDate?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  status: 'Processing' | 'Delivered' | 'Cancelled';
}

interface OrderHistoryContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Omit<Order, '_id' | 'userEmail' | 'userName' | 'userPhone' | 'orderDate' | 'status' | 'deliveryDate'>) => Promise<void>;
  fetchOrders: () => Promise<void>;
  getOrdersByUser: () => Order[];
  getTotalOrders: () => number;
  getTotalSpent: () => number;
  getFavoriteItem: () => string;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export const OrderHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from database when user changes
  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user?.email]);

  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3030/orders/user/${user.email}`);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error('Failed to fetch orders:', response.data.message);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData: Omit<Order, '_id' | 'userEmail' | 'userName' | 'userPhone' | 'orderDate' | 'status' | 'deliveryDate'>) => {
    if (!user?.email) return;

    try {
      const response = await axios.post('http://localhost:3030/orders/create', {
        userEmail: user.email,
        ...orderData
      });

      if (response.data.success) {
        // Refresh orders list after successful creation
        await fetchOrders();
      } else {
        console.error('Failed to create order:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const getOrdersByUser = () => {
    return orders;
  };

  const getTotalOrders = () => {
    return orders.length;
  };

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const getFavoriteItem = () => {
    if (orders.length === 0) return '';
    
    const itemCounts: { [key: string]: number } = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
      });
    });
    
    const mostOrdered = Object.entries(itemCounts).reduce((max, [name, count]) => 
      count > max.count ? { name, count } : max, { name: '', count: 0 }
    );
    
    return mostOrdered.name;
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, loading, addOrder, fetchOrders, getOrdersByUser, getTotalOrders, getTotalSpent, getFavoriteItem }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = (): OrderHistoryContextType => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within OrderHistoryProvider');
  }
  return context;
};
