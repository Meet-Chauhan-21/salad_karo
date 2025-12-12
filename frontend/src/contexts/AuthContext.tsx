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

type AuthResult =
  | { ok: true }
  | { ok: false; error: string; requiresInfo?: boolean; googleData?: any; currentData?: any };

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (params: { email: string; password: string; name?: string; phone?: string; city?: string; address?: string }) => AuthResult;
  logout: () => void;
  updateProfile: (updates: { name?: string; city?: string; address?: string }) => AuthResult;
  googleLogin: (token: string) => Promise<AuthResult>;
  googleRegister: (data: { email: string; name: string; picture?: string; phone: string; city: string; address: string; token: string }) => Promise<AuthResult>;
  setUser: (user: AuthUser | null) => void;
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
        // Store user data and token in localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem('authToken', data.jwtToken);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userName', data.name);
        return { ok: true };
      } else {
        return { ok: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { ok: false, error: 'Network error. Please try again.' };
    }
  }, []);

  // Google Login (Step 1: Verify & Check Status)
  const googleLogin = useCallback(async (token: string): Promise<AuthResult> => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.GOOGLE_LOGIN), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        // User logged in successfully
        const userData: AuthUser = {
          email: data.email,
          name: data.name,
          phone: data.phone,
          city: data.city,
          address: data.address
        };
        setUser(userData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem('authToken', data.jwtToken);
        localStorage.setItem('isLoggedIn', 'true');
        return { ok: true };
      } else if (data.requiresInfo) {
        // User needs to complete profile
        return {
          ok: false,
          error: 'Profile incomplete',
          requiresInfo: true,
          googleData: data.googleData,
          currentData: data.currentData
        };
      }
      return { ok: false, error: data.message || 'Login failed' };
    } catch (error) {
      console.error('Google Login Error:', error);
      return { ok: false, error: 'Network error' };
    }
  }, []);

  // Google Register (Step 2: Complete Profile)
  const googleRegister = useCallback(async (data: { email: string; name: string; picture?: string; phone: string; city: string; address: string; token: string }): Promise<AuthResult> => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.GOOGLE_REGISTER), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await response.json();

      if (response.ok && resData.success) {
        const userData: AuthUser = {
          email: resData.email,
          name: resData.name,
          phone: resData.phone,
          city: resData.city,
          address: resData.address
        };
        setUser(userData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem('authToken', resData.jwtToken);
        localStorage.setItem('isLoggedIn', 'true');
        return { ok: true };
      }
      return { ok: false, error: resData.message || 'Registration failed' };
    } catch (error) {
      console.error('Google Register Error:', error);
      return { ok: false, error: 'Network error' };
    }
  }, []);

  const register = useCallback((params: { email: string; password: string; name?: string; phone?: string; city?: string; address?: string }): AuthResult => {
    // This function sets user state after successful backend registration
    const { email, name, phone, city, address } = params;
    const userData = { email, name, phone, city, address };
    setUser(userData);

    // Store user data in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));

    return { ok: true };
  }, []);

  const updateProfile = useCallback((updates: { name?: string; city?: string; address?: string }): AuthResult => {
    if (!user) return { ok: false, error: 'Not authenticated' };

    const users = readUsers();
    const key = user.email.toLowerCase();
    const current = users[key];

    if (!current) {
      // If user data not found, create it from current user state with a default password
      // In a real app, this would require re-authentication or backend verification
      const newUserData: StoredUser = {
        email: user.email,
        name: user.name || '',
        phone: user.phone || '',
        city: user.city || '',
        address: user.address || '',
        password: 'temp_password' // Temporary password - in real apps, handle this differently
      };
      users[key] = newUserData;
    }

    // Update with new data
    const next: StoredUser = {
      ...users[key],
      name: updates.name ?? users[key].name,
      city: updates.city ?? users[key].city,
      address: updates.address ?? users[key].address
    };

    users[key] = next;
    writeUsers(users);
    setUser({ email: next.email, name: next.name, phone: next.phone, city: next.city, address: next.address });
    return { ok: true };
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    // Clear all user-related localStorage data
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUser');
    // Dispatch custom event to notify other components (like AdminAccessButton)
    window.dispatchEvent(new Event('admin-logout'));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoggedIn: !!user, isHydrated, login, register, logout, updateProfile, googleLogin, googleRegister, setUser }),
    [user, isHydrated, login, register, logout, updateProfile, googleLogin, googleRegister]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


