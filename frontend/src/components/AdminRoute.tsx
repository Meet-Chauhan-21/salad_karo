import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const adminUser = localStorage.getItem('adminUser');
  
  console.log('AdminRoute - isAdmin:', isAdmin);
  console.log('AdminRoute - adminUser:', adminUser);
  
  if (!isAdmin || !adminUser) {
    console.log('Not authenticated as admin, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('Admin authenticated, rendering children');
  return <>{children}</>;
};

export default AdminRoute;