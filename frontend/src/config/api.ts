// API Configuration for different environments
const getApiBaseUrl = (): string => {
  // Use environment variable if available, otherwise fall back to defaults
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Fallback for different environments
  if (import.meta.env.PROD) {
    return 'https://salad-karo.vercel.app'; // Production backend URL
  }

  return 'http://localhost:3030'; // Development default
};

// Export the API base URL
export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  GOOGLE_LOGIN: '/auth/google-login',
  GOOGLE_REGISTER: '/auth/google-register',
  USERS: '/auth/users',

  // Order endpoints
  CREATE_ORDER: '/orders/create',
  GET_USER_ORDERS: (email: string) => `/orders/user/${email}`,
  GET_ALL_ORDERS: '/orders/all',
  UPDATE_ORDER_STATUS: (orderId: string) => `/orders/update-status/${orderId}`,

  // Salad endpoints
  GET_ALL_SALADS: '/salads/all',
  CREATE_SALAD: '/salads/create',
  UPDATE_SALAD: (id: string) => `/salads/update/${id}`,
  DELETE_SALAD: (id: string) => `/salads/delete/${id}`,
  TOGGLE_SALAD_STATUS: (id: string) => `/salads/toggle-status/${id}`,
  ADD_SALAD: '/salads/create',

  // Membership endpoints
  GET_ALL_MEMBERSHIPS: '/memberships/all',
  ADD_MEMBERSHIP: '/memberships/create',
  UPDATE_MEMBERSHIP: (id: string) => `/memberships/update/${id}`,
  DELETE_MEMBERSHIP: (id: string) => `/memberships/delete/${id}`,
  GET_ALL_PLANS: '/memberships/all',
  CREATE_PLAN: '/memberships/create',
  UPDATE_PLAN: '/memberships/update',
  DELETE_PLAN: '/memberships/delete',
  TOGGLE_PLAN_STATUS: '/memberships/toggle-status',
  GET_ALL_SUBSCRIPTIONS: '/memberships/subscriptions',
  UPDATE_SUBSCRIPTION_STATUS: '/memberships/update-status',
  
  // User endpoints
  GET_ALL_USERS: '/auth/users',
  UPDATE_USER_STATUS: (id: string) => `/auth/users/${id}/status`
};