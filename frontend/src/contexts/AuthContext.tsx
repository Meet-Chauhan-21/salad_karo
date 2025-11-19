import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

export interface AuthUser {
  email: string;
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
}

interface StoredUser extends AuthUser {
  password: string; // Demo only; in real apps use a backend + hashing
}

type AuthResult = { ok: true } | { ok: false; error: string };

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (params: { email: string; password: string; name?: string; phone?: string; city?: string; address?: string }) => AuthResult;
  logout: () => void;
  updateProfile: (updates: { name?: string; city?: string; address?: string }) => AuthResult;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'skfb_auth_user_v1';
const USERS_STORAGE_KEY = 'skfb_users_v1';

const readUsers = (): Record<string, StoredUser> => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredUser>) : {};
  } catch {
    return {};
  }
};

const writeUsers = (users: Record<string, StoredUser>) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser;
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userData = {
          email: data.email,
          name: data.name,
          phone: data.phone,
          city: data.city,
          address: data.address
        };
        setUser(userData);
        // Store token in localStorage for API requests
        localStorage.setItem('authToken', data.jwtToken);
        return { ok: true };
      } else {
        return { ok: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { ok: false, error: 'Network error. Please try again.' };
    }
  }, []);

  const register = useCallback((params: { email: string; password: string; name?: string; phone?: string; city?: string; address?: string }): AuthResult => {
    // This function is now only used to set user state after successful backend registration
    const { email, name, phone, city, address } = params;
    setUser({ email, name, phone, city, address });
    return { ok: true };
  }, []);

  const updateProfile = useCallback((updates: { name?: string; city?: string; address?: string }): AuthResult => {
    if (!user) return { ok: false, error: 'Not authenticated' };
    const users = readUsers();
    const key = user.email.toLowerCase();
    const current = users[key];
    if (!current) return { ok: false, error: 'User not found' };
    // Only allow updating name, city, address
    const next: StoredUser = { ...current, name: updates.name ?? current.name, city: updates.city ?? current.city, address: updates.address ?? current.address };
    users[key] = next;
    writeUsers(users);
    setUser({ email: next.email, name: next.name, phone: next.phone, city: next.city, address: next.address });
    return { ok: true };
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    // Clear auth token and admin-related localStorage items on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUser');
    // Dispatch custom event to notify other components (like AdminAccessButton)
    window.dispatchEvent(new Event('admin-logout'));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoggedIn: !!user, isHydrated, login, register, logout, updateProfile }),
    [user, isHydrated, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


