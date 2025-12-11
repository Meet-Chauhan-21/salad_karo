import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Users,
  ShoppingCart,
  Crown,
  Salad,
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string; // Make it optional since we'll auto-detect
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  // Auto-detect current page from URL if not provided
  const getCurrentPage = () => {
    if (currentPage) return currentPage;

    const path = location.pathname;
    if (path === '/admin' || path.includes('/admin/orders')) return 'orders';
    if (path.includes('/admin/memberships')) return 'memberships';
    if (path.includes('/admin/salads')) return 'salads';
    if (path.includes('/admin/users')) return 'users';
    if (path.includes('/admin/settings')) return 'settings';
    return 'orders'; // Default to orders instead of dashboard
  };

  const activePageKey = getCurrentPage();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin');
    const adminData = localStorage.getItem('adminUser');

    if (!isAdmin || isAdmin !== 'true') {
      navigate('/login');
      return;
    }

    if (adminData) {
      setAdminUser(JSON.parse(adminData));
    }
  }, []);

  const menuItems = [
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders', key: 'orders' },
    { icon: Salad, label: 'Salads', path: '/admin/salads', key: 'salads' },
    { icon: Crown, label: 'Memberships', path: '/admin/memberships', key: 'memberships' },
    { icon: Users, label: 'Users', path: '/admin/users', key: 'users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings', key: 'settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUser');
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('admin-logout'));
    navigate('/login');
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 lg:w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col`}>
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Salad className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Salad Karo</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePageKey === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                    }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Admin Profile and Actions Section moved outside nav */}
          </nav>            <div className="p-4 pb-6 border-t border-gray-200 bg-gray-50/50 flex-shrink-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">{adminUser.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="overflow-hidden">
                <h3 className="font-semibold text-gray-900 truncate">{adminUser.name || 'Admin'}</h3>
                <p className="text-xs text-gray-500 truncate" title={adminUser.email || 'admin@saladkaro.pvt.in'}>{adminUser.email || 'admin@saladkaro.pvt.in'}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Link
                to="/"
                className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-green-600 rounded-lg transition-all duration-200 shadow-sm"
              >
                <Home className="h-4 w-4" />
                <span>View Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <Salad className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="font-semibold text-gray-900 text-sm sm:text-base">Admin Panel</span>
          </div>
          <div className="w-6 sm:w-8"></div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>

    </div >
  );
};

export default AdminLayout;
