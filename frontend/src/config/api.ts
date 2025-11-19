// API Configuration for different environments
const getApiBaseUrl = (): string => {
  // Use environment variable if available, otherwise fall back to defaults
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback for different environments
  if (import.meta.env.PROD) {
    return 'https://your-backend-domain.vercel.app'; // Replace with your actual backend URL
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
  USERS: '/auth/users',
  
  // Order endpoints
  CREATE_ORDER: '/orders/create',
  GET_USER_ORDERS: (email: string) => `/orders/user/${email}`,
  GET_ALL_ORDERS: '/orders/all',
  UPDATE_ORDER_STATUS: '/orders/update-status',
  
  // Salad endpoints
  GET_ALL_SALADS: '/salads/all',
  CREATE_SALAD: '/salads/create',
  UPDATE_SALAD: '/salads/update',
  DELETE_SALAD: '/salads/delete',
  TOGGLE_SALAD_STATUS: '/salads/toggle-status'
};