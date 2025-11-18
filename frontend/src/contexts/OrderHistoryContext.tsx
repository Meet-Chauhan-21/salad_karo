import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  status: 'Processing' | 'Delivered' | 'Cancelled';
  deliveryDate?: string;
}

interface OrderHistoryContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status' | 'deliveryDate'>) => void;
  getOrdersByUser: () => Order[];
  getTotalOrders: () => number;
  getTotalSpent: () => number;
  getFavoriteItem: () => string;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export const OrderHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage when component mounts or user changes
  useEffect(() => {
    if (user?.email) {
      const storageKey = `order_history_${user.email}`;
      const storedOrders = localStorage.getItem(storageKey);
      if (storedOrders) {
        try {
          setOrders(JSON.parse(storedOrders));
        } catch (error) {
          console.error('Error loading orders:', error);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, [user?.email]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (user?.email && orders.length > 0) {
      const storageKey = `order_history_${user.email}`;
      localStorage.setItem(storageKey, JSON.stringify(orders));
    }
  }, [orders, user?.email]);

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'deliveryDate'>) => {
    if (!user?.email) return;

    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Processing',
      deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Next day
    };

    setOrders(prev => [newOrder, ...prev]);
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
    <OrderHistoryContext.Provider value={{ orders, addOrder, getOrdersByUser, getTotalOrders, getTotalSpent, getFavoriteItem }}>
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
