import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, User, Heart, LogOut, ChevronDown, FileText, Shield, Scale, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrderNavigation } from '../hooks/use-order-navigation';
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
  const location = useLocation();
  const navigate = useNavigate();

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

  const isShopActive = location.pathname === '/' && location.hash === '#shop';
  const navLinkClass = (active: boolean) =>
    `pb-1 border-b-2 transition-[var(--transition-smooth)] ${active ? 'text-primary border-primary' : 'text-foreground border-transparent hover:border-primary'} font-medium`;

  return (
    <header className="bg-card/80 backdrop-blur-md shadow-[var(--shadow-soft)] sticky top-0 z-50 border-b border-border">
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
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full items-center justify-center animate-pulse-glow" style={{display: 'none'}}>
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
                className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1.5 lg:px-6 lg:py-2.5 rounded-full transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-sm lg:text-base"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in-up">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-center mb-4 pb-4 border-b border-border">
              <img 
                src="/images/saladkaro-logo.jpg" 
                alt="SaladKaro Logo" 
                className="w-12 h-12 mr-3 object-cover rounded-full"
              />
              <h2 className="text-xl font-bold text-gradient">SaladKaro</h2>
            </div>
            <nav className="flex flex-col space-y-3">
              <NavLink to="/" className={({ isActive }) => `${navLinkClass(isActive && location.hash !== '#shop')} py-2 text-base`} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/menu" className={({ isActive }) => `${navLinkClass(isActive)} py-2 text-base`} onClick={() => setIsMenuOpen(false)}>Salad Menu</NavLink>
              <NavLink to="/membership" className={({ isActive }) => `${navLinkClass(isActive)} py-2 text-base`} onClick={() => setIsMenuOpen(false)}>Subscription Plan</NavLink>
              <NavLink to="/about" className={({ isActive }) => `${navLinkClass(isActive)} py-2 text-base`} onClick={() => setIsMenuOpen(false)}>About</NavLink>
              
              {/* Mobile Policy Links */}
              <div className="pt-3 border-t border-border">
                <div className="text-sm font-semibold text-muted-foreground mb-3 px-2">Other</div>
                <div className="grid grid-cols-2 gap-2">
                  <NavLink to="/return-policy" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <RotateCcw className="w-4 h-4" />
                    Return Policy
                  </NavLink>
                  <NavLink to="/refund-policy" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <FileText className="w-4 h-4" />
                    Refund Policy
                  </NavLink>
                  <NavLink to="/privacy-policy" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <Shield className="w-4 h-4" />
                    Privacy Policy
                  </NavLink>
                  <NavLink to="/disclaimer" className="flex items-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <Scale className="w-4 h-4" />
                    Disclaimer
                  </NavLink>
                </div>
              </div>
              
              {/* Order Now Button for Mobile */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => {
                    handleOrderNow();
                    setIsMenuOpen(false);
                  }}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full transition-[var(--transition-smooth)] font-semibold hover:shadow-[var(--shadow-glow)] hover:scale-105 text-center"
                >
                  <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/30 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-[var(--transition-smooth)]" />
                  Order Now
                </button>
              </div>
              
              <div className="flex items-center justify-center pt-3 border-t border-border">
                {isLoggedIn ? (
                  <a 
                    href="/profile" 
                    className="group relative overflow-hidden bg-secondary text-foreground px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-secondary/80 transition-[var(--transition-smooth)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 to-accent/10" />
                    <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/20 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-[var(--transition-smooth)]" />
                    <User className="w-4 h-4" />
                    {user?.name || user?.email.split('@')[0] || 'Profile'}
                  </a>
                ) : (
                  <a 
                    href="/login" 
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/30 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-500" />
                    <span className="relative flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Login
                    </span>
                  </a>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Login Dialog removed; using dedicated pages */}
    </header>
  );
};

export default Header;