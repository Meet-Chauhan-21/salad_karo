import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

// Unique, professional notification card
const notify = (message: string, type: 'success' | 'error' = 'success') => {
  const notification = document.createElement('div');
  notification.className = `fixed top-8 right-8 z-[9999] w-[340px] max-w-[90vw] px-0 py-0 rounded-3xl shadow-2xl border border-gray-200 bg-white flex items-center gap-4 transition-all duration-300`;
  notification.style.transform = 'translateY(-40px)';
  notification.style.opacity = '0';
  notification.innerHTML = `
    <div class='flex items-center gap-3 px-6 py-5 w-full'>
      <div class='flex items-center justify-center w-12 h-12 rounded-2xl ${type === 'success' ? 'bg-green-100' : 'bg-red-100'}'>
        ${type === 'success' ? '<svg width="28" height="28" fill="none" stroke="#22c55e" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>' : '<svg width="28" height="28" fill="none" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>'}
      </div>
      <div class='flex-1 min-w-0'>
        <div class='font-bold text-lg text-gray-900 mb-1'>${type === 'success' ? 'Success' : 'Removed'}</div>
        <div class='text-gray-600 text-base leading-tight'>${message}</div>
      </div>
    </div>
  `;
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateY(-40px)';
    notification.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 2600);
};

// API helper functions
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'HYDRATE_CART'; payload: CartState }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        // Increment quantity for existing item
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }

      // Add new item to cart
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    }
    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      const oldQuantity = item.quantity;
      const newQuantity = action.payload.quantity;
      const quantityDiff = newQuantity - oldQuantity;

      if (newQuantity === 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          total: state.total - (item.price * oldQuantity)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: newQuantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff)
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    case 'HYDRATE_CART':
      return action.payload;
    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'skfb_cart_v1';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });

  // Load cart from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.items) && typeof parsed.total === 'number') {
          // Direct hydration without re-dispatching to avoid double-adds
          dispatch({ type: 'HYDRATE_CART', payload: parsed });
        }
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = async (product: Product) => {
    // Optimistic update - increment quantity if item exists, add new if not
    dispatch({ type: 'ADD_TO_CART', payload: product });

    try {
      // Try API call
      await apiCall('/cart', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });

      // notify('Item added to cart!', 'success');
    } catch (error) {
      // API failed, localStorage fallback is already handled by useEffect
      console.log('Using localStorage fallback for cart');
      // notify('Added to cart (offline mode)', 'success');
    }
  };

  const removeFromCart = async (productId: string) => {
    // Optimistic update
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });

    try {
      // Try API call
      await apiCall('/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId })
      });

      notify('Item removed from cart.', 'error');
    } catch (error) {
      // API failed, localStorage fallback is already handled
      console.log('Using localStorage fallback for cart removal');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};