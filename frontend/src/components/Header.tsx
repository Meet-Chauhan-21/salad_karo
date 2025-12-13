import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, User, Heart, LogOut, ChevronDown, FileText, Shield, Scale, RotateCcw, Settings, Home, Leaf, Calendar, Info, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrderNavigation } from '../hooks/use-order-navigation';
import { useOverlay } from '../contexts/OverlayContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getCartItemsCount } = useCart();
  const { getLikesCount } = useLikes();
  const cartItemsCount = getCartItemsCount();
  const likesCount = getLikesCount();
  const { isLoggedIn, user, login, logout } = useAuth();
  const { handleOrderNow } = useOrderNavigation();
  const [emailInput, setEmailInput] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsCartBarHidden } = useOverlay();

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin');
      const adminUser = localStorage.getItem('adminUser');
      setIsAdmin(adminStatus === 'true' && !!adminUser);
    };

    checkAdminStatus();
    window.addEventListener('storage', checkAdminStatus);
    window.addEventListener('admin-logout', checkAdminStatus); // Custom event

    return () => {
      window.removeEventListener('storage', checkAdminStatus);
      window.removeEventListener('admin-logout', checkAdminStatus);
    };
  }, []);

  const isPolicyPageActive = ['/return-policy', '/refund-policy', '/privacy-policy', '/disclaimer'].includes(location.pathname);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPolicyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Hide global cart bar while the sidebar is open
      setIsCartBarHidden(true);
    } else {
      document.body.style.overflow = '';
      setIsCartBarHidden(false);
    }
    return () => {
      document.body.style.overflow = '';
      setIsCartBarHidden(false);
    };
  }, [isMenuOpen]);

  const isShopActive = location.pathname === '/' && location.hash === '#shop';
  const navLinkClass = (active: boolean) =>
    `pb-1 border-b-2 transition-[var(--transition-smooth)] ${active ? 'text-primary border-primary' : 'text-foreground border-transparent hover:border-primary'} font-medium`;

  return (
    <>
    <header className="bg-card/80 backdrop-blur-md shadow-[var(--shadow-soft)] sticky top-0 z-30 border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <img
              src="/images/saladkaro-logo.jpg"
              alt="SaladKaro Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full items-center justify-center animate-pulse-glow" style={{ display: 'none' }}>
              <span className="text-primary-foreground font-bold text-base sm:text-lg">🥗</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-gradient">SaladKaro</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => navLinkClass(isActive && location.hash !== '#shop')}>Home</NavLink>
            <NavLink to="/menu" className={({ isActive }) => navLinkClass(isActive)}>Salad Menu</NavLink>
            <NavLink to="/membership" className={({ isActive }) => navLinkClass(isActive)}>Subscription Plan</NavLink>
            <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>About</NavLink>

            {/* Policy Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsPolicyDropdownOpen(!isPolicyDropdownOpen)}
                className={`flex items-center gap-1 pb-1 border-b-2 transition-[var(--transition-smooth)] ${isPolicyPageActive ? 'text-primary border-primary' : 'text-foreground border-transparent hover:border-primary'} font-medium`}
              >
                Other
                <ChevronDown className={`w-4 h-4 transition-transform ${isPolicyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPolicyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in-up">
                  <div className="py-2">
                    <NavLink
                      to="/return-policy"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setIsPolicyDropdownOpen(false)}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Return Policy
                    </NavLink>
                    <NavLink
                      to="/refund-policy"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setIsPolicyDropdownOpen(false)}
                    >
                      <FileText className="w-4 h-4" />
                      Refund Policy
                    </NavLink>
                    <NavLink
                      to="/privacy-policy"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setIsPolicyDropdownOpen(false)}
                    >
                      <Shield className="w-4 h-4" />
                      Privacy Policy
                    </NavLink>
                    <NavLink
                      to="/disclaimer"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      onClick={() => setIsPolicyDropdownOpen(false)}
                    >
                      <Scale className="w-4 h-4" />
                      Disclaimer
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {isAdmin && (
              <a
                href="/admin/orders"
                className="group relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 lg:px-5 lg:py-2 rounded-full transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 text-sm lg:text-base mr-2"
              >
                <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Settings className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Admin Panel</span>
              </a>
            )}
            <a href="/likes" className="relative p-2 hover:bg-secondary rounded-full transition-[var(--transition-smooth)]">
              <Heart className={`w-4 h-4 lg:w-5 lg:h-5 transition-[var(--transition-smooth)] ${likesCount > 0 ? 'text-red-500 fill-red-500' : 'text-muted-foreground hover:text-red-500'}`} />
              {likesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-bold animate-scale-in">
                  {likesCount}
                </span>
              )}
            </a>
            <a href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-[var(--transition-smooth)]">
              <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground hover:text-primary" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-bold animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </a>
            {/* Order Now CTA Button */}
            <button
              onClick={handleOrderNow}
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1.5 lg:px-6 lg:py-2 rounded-full transition-[var(--transition-smooth)] font-semibold hover:shadow-[var(--shadow-glow)] hover:scale-105 text-sm lg:text-base"
            >
              <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/30 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-[var(--transition-smooth)]" />
              Order Now
            </button>
            {isLoggedIn ? (
              <a
                href="/profile"
                className="group relative overflow-hidden bg-secondary text-foreground px-2 py-1.5 lg:px-4 lg:py-2 rounded-full transition-[var(--transition-smooth)] font-medium flex items-center gap-1 lg:gap-2 hover:bg-secondary/80 hover:shadow-[var(--shadow-button)] text-sm lg:text-base"
                aria-label="Profile"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 to-accent/10" />
                <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/20 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-[var(--transition-smooth)]" />
                <User className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden lg:inline">{user?.name || user?.email.split('@')[0]}</span>
                <span className="lg:hidden">{(user?.name || user?.email.split('@')[0])?.slice(0, 6)}</span>
              </a>
            ) : (
              <a
                href="/login"
                className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 lg:px-6 lg:py-2.5 rounded-full transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-sm lg:text-base"
              >
                <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/30 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-500" />
                <span className="relative flex items-center gap-1 lg:gap-2">
                  <User className="w-3 h-3 lg:w-4 lg:h-4" />
                  Login
                </span>
              </a>
            )}
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Admin Icon for Mobile */}
            {isAdmin && (
              <a href="/admin/orders" className="relative p-2 hover:bg-secondary rounded-full transition-[var(--transition-smooth)]">
                <Settings className="w-5 h-5 text-purple-600" />
              </a>
            )}
            {/* Mobile Cart & Likes */}
            <a href="/likes" className="relative p-2 hover:bg-secondary rounded-full transition-[var(--transition-smooth)]">
              <Heart className={`w-5 h-5 transition-[var(--transition-smooth)] ${likesCount > 0 ? 'text-red-500 fill-red-500' : 'text-muted-foreground hover:text-red-500'}`} />
              {likesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-scale-in">
                  {likesCount}
                </span>
              )}
            </a>
            <a href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-[var(--transition-smooth)]">
              <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </a>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-secondary rounded-full transition-[var(--transition-smooth)]"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      </div>
    </header>

      {/* Mobile Sidebar Menu - Left Side - Outside header for proper z-index */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-[60] animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-screen w-72 bg-white shadow-2xl z-[70] animate-slide-in-left flex flex-col md:hidden" role="dialog" aria-modal="true">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/saladkaro-logo.jpg"
                  alt="SaladKaro Logo"
                  className="w-9 h-9 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold text-gray-900">SaladKaro</h2>
                  <span className="text-xs text-gray-500">Healthy. Fresh. Daily.</span>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar Content */}
            <nav className="flex-1 overflow-y-auto py-4 px-4">
              {/* Section: Quick Links */}
              <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Quick Links</div>
              <div className="space-y-1">
                {/* Home */}
                <NavLink
                  to="/"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive && location.hash !== '#shop'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5"><Home className="w-5 h-5" /></span>
                  <span>Home</span>
                </NavLink>

                {/* Salad Menu */}
                <NavLink
                  to="/menu"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5"><Leaf className="w-5 h-5" /></span>
                  <span>Salad Menu</span>
                </NavLink>

                {/* Subscription Plan */}
                <NavLink
                  to="/membership"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5"><Calendar className="w-5 h-5" /></span>
                  <span>Subscription Plan</span>
                </NavLink>

                {/* About */}
                <NavLink
                  to="/about"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5"><Info className="w-5 h-5" /></span>
                  <span>About</span>
                </NavLink>

                {/* Order Now */}
                <button
                  onClick={() => {
                    handleOrderNow();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors bg-green-600 text-white hover:bg-green-700 mt-1"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5"><ShoppingBag className="w-5 h-5" /></span>
                  <span>Order Now</span>
                </button>
              </div>

              {/* Section: Policies */}
              <div className="mt-4">
                <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Policies</div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  <NavLink to="/return-policy" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <RotateCcw className="w-4 h-4" />
                    Return
                  </NavLink>
                  <NavLink to="/refund-policy" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <FileText className="w-4 h-4" />
                    Refund
                  </NavLink>
                  <NavLink to="/privacy-policy" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <Shield className="w-4 h-4" />
                    Privacy
                  </NavLink>
                  <NavLink to="/disclaimer" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <Scale className="w-4 h-4" />
                    Disclaimer
                  </NavLink>
                </div>
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              {isLoggedIn ? (
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{user?.name || user?.email.split('@')[0]}</div>
                    <div className="text-xs text-blue-100">Profile</div>
                  </div>
                </a>
              ) : (
                <a
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-sm font-semibold transition-colors bg-green-600 text-white hover:bg-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Login
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;