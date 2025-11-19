# Vercel Deployment Guide for Salad Karo

## Frontend Deployment Setup

### 1. Environment Variables Configuration

The frontend uses environment variables for API configuration. You need to set these in your Vercel dashboard:

#### Environment Variables:
```
VITE_API_BASE_URL = your-backend-domain-url
VITE_NODE_ENV = production
```

### 2. Files Created for Deployment

#### Frontend Configuration Files:
- `src/config/api.ts` - Centralized API configuration
- `.env.development` - Development environment variables  
- `.env.production` - Production environment variables
- `vercel.json` - Vercel deployment configuration

### 3. API Integration

All API calls have been updated to use the base URL configuration:
- Authentication APIs (`login`, `signup`)
- Order management APIs (`create`, `fetch`, `update`)
- Salad management APIs (`CRUD operations`)
- Admin panel APIs (`users`, `orders`, `salads`)

### 4. Deployment Steps

#### For Frontend (Vercel):
1. Push your code to GitHub repository
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL` = `https://your-backend-domain.vercel.app`
   - `VITE_NODE_ENV` = `production`
4. Deploy!

#### For Backend (Vercel):
1. Create a separate Vercel project for backend
2. Deploy your backend first to get the URL
3. Update the frontend `VITE_API_BASE_URL` with the backend URL

### 5. Updated Components

The following components have been updated to use the new API configuration:
- `AuthContext.tsx`
- `OrderHistoryContext.tsx`
- `Register.tsx`
- `Profile.tsx`
- `Cart.tsx`
- `EnhancedCart.tsx`
- `AdminUsersFixed.tsx`
- `AdminSaladsFixed.tsx`
- `AdminOrdersFixed.tsx`
- `useSalads.ts` hook

### 6. Configuration Structure

```typescript
// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3030';

// Helper function
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  CREATE_ORDER: '/orders/create',
  GET_ALL_SALADS: '/salads/all',
  // ... more endpoints
};
```

### 7. Important Notes

- **Backend URL**: Replace `https://your-backend-domain.vercel.app` with your actual backend URL
- **Environment Variables**: Make sure to set the correct API base URL in production
- **CORS**: Ensure your backend allows requests from your frontend domain
- **Database**: Make sure your MongoDB connection is properly configured for production

### 8. Testing

After deployment:
1. Test user registration and login
2. Test adding items to cart and placing orders  
3. Test admin panel functionality
4. Verify all API calls are working with the production backend

Your application is now ready for Vercel deployment! 🚀