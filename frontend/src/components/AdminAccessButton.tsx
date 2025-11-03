import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAccessButton: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem('isAdmin');
    const adminUser = localStorage.getItem('adminUser');
    
    if (adminStatus === 'true' && adminUser) {
      setIsAdmin(true);
      // Show the button after a small delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAdminAccess = () => {
    navigate('/admin/orders');
  };

  if (!isAdmin) return null;

  return (
    <>
      {/* Floating Admin Access Button - Positioned above other floating elements */}
      <div
        className={`fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <button
          onClick={handleAdminAccess}
          className="group flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
          title="Access Admin Panel"
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-medium text-xs sm:text-sm pr-1 sm:pr-2">
            <span className="hidden sm:inline">Admin Panel</span>
            <span className="sm:hidden">Admin</span>
          </span>
        </button>
      </div>

      {/* Dismiss Button (Optional) */}
      <button
        onClick={() => setIsVisible(false)}
        className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ transform: 'translate(140px, -12px)' }}
        title="Hide Admin Access"
      >
        <div className="w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors shadow-md">
          <X className="w-3 h-3" />
        </div>
      </button>
    </>
  );
};

export default AdminAccessButton;