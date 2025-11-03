import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

// Simple toast notification function
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  }`;
  toast.textContent = message;
  toast.style.transform = 'translateX(100%)';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

// API helper function
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

interface LikesContextValue {
  likedProductIds: Set<number>;
  isLiked: (productId: number) => boolean;
  toggleLike: (productId: number) => Promise<void>;
  getLikesCount: () => number;
  clearAllLikes: () => void;
}

export const LikesContext = createContext<LikesContextValue | undefined>(undefined);

const storageKeyForUser = (email: string) => `skfb_likes_${email}`;

export const LikesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [likedProductIds, setLikedProductIds] = useState<Set<number>>(new Set());

  // Load likes when user changes
  useEffect(() => {
    if (!user) {
      setLikedProductIds(new Set());
      return;
    }
    try {
      const raw = localStorage.getItem(storageKeyForUser(user.email));
      if (raw) {
        const arr = JSON.parse(raw) as number[];
        setLikedProductIds(new Set(arr));
      } else {
        setLikedProductIds(new Set());
      }
    } catch {
      setLikedProductIds(new Set());
    }
  }, [user]);

  // Persist when likes change
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(
        storageKeyForUser(user.email),
        JSON.stringify(Array.from(likedProductIds))
      );
    } catch {
      // ignore
    }
  }, [likedProductIds, user]);

  const isLiked = useCallback((productId: number) => {
    return likedProductIds.has(productId);
  }, [likedProductIds]);

  const toggleLike = useCallback(async (productId: number) => {
    const wasLiked = likedProductIds.has(productId);
    
    // Optimistic update
    setLikedProductIds(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
    
    try {
      // Try API call
      if (wasLiked) {
        await apiCall('/favorites', {
          method: 'DELETE',
          body: JSON.stringify({ productId })
        });
        showToast('Removed from favorites');
      } else {
        await apiCall('/favorites', {
          method: 'POST',
          body: JSON.stringify({ productId })
        });
        showToast('Added to favorites');
      }
    } catch (error) {
      // API failed, localStorage fallback is already handled
      console.log('Using localStorage fallback for favorites');
    }
  }, [likedProductIds]);

  const getLikesCount = useCallback(() => {
    return likedProductIds.size;
  }, [likedProductIds]);


  const clearAllLikes = useCallback(() => {
    setLikedProductIds(new Set());
    if (user) {
      try {
        localStorage.setItem(storageKeyForUser(user.email), JSON.stringify([]));
      } catch {}
    }
    showToast('All liked items cleared');
  }, [user]);

  const value = useMemo<LikesContextValue>(
    () => ({ likedProductIds, isLiked, toggleLike, getLikesCount, clearAllLikes }),
    [likedProductIds, isLiked, toggleLike, getLikesCount, clearAllLikes]
  );

  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>;
};

export const useLikes = (): LikesContextValue => {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error('useLikes must be used within LikesProvider');
  return ctx;
};


