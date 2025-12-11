import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLocation } from 'react-router-dom';

const FloatingControls = () => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [isWhatsAppExpanded, setIsWhatsAppExpanded] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  // Logic to determine if CartBar is visible (copied from GlobalCartBar)
  const HIDE_ON_PATHS = [
    "/cart",
    "/login",
    "/register",
    "/profile",
    "/membership",
    "/about",
    "/admin",
  ];

  const shouldHideCartBar = React.useMemo(() => {
    const path = location.pathname;
    if (HIDE_ON_PATHS.some((p) => path.startsWith(p))) return true;
    if (/^\/menu\/[0-9]+$/.test(path) || /^\/likes\/[0-9]+$/.test(path)) return true;
    return false;
  }, [location.pathname]);

  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const isCartVisible = itemCount > 0 && !shouldHideCartBar;

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsScrollVisible(true);
      } else {
        setIsScrollVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Handle ESC key to close WhatsApp expansion
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWhatsAppExpanded) {
        setIsWhatsAppExpanded(false);
      }
    };

    if (isWhatsAppExpanded) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isWhatsAppExpanded]);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle WhatsApp chat opening
  const openWhatsAppChat = () => {
    const phoneNumber = '919265379915';
    const message = encodeURIComponent(
      'Hi! I am interested in ordering fresh salads from Salad Karo. Can you help me with the menu and pricing?'
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      {/* Floating Controls Container */}
      <div className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[60] flex flex-col items-end space-y-3 sm:space-y-4 transition-all duration-300 ${isCartVisible ? 'mb-20 sm:mb-24' : ''}`}>

        {/* Back to Top Button */}
        {isScrollVisible && (
          <button
            onClick={scrollToTop}
            className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
            aria-label="Back to top"
            tabIndex={0}
          >
            {/* Shimmer effect */}
            <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/30 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-500" />

            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-y-1" />

            {/* Pulse ring on hover */}
            <span className="absolute inset-0 rounded-full bg-green-600 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-300" />
          </button>
        )}

        {/* WhatsApp Expanded Chat Preview */}
        {isWhatsAppExpanded && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 max-w-xs animate-scale-in border border-gray-200 mb-2 sm:mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Salad Karo</p>
                  <p className="text-xs text-green-600">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsWhatsAppExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                aria-label="Close chat preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">
                Hi! 👋 Need help with our fresh salad menu? I'm here to assist you!
              </p>
            </div>

            <button
              onClick={openWhatsAppChat}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-180 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <MessageCircle className="w-4 h-4" />
              Start Chat
            </button>

            {/* Quick Actions */}
            <div className="flex flex-col space-y-2 mt-3">
              <button
                onClick={() => {
                  const phoneNumber = '919265379915';
                  const message = encodeURIComponent('Hi! I want to place a quick order for fresh salads.');
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                }}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-medium transition-all duration-180 hover:scale-105 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Quick Order 🥗
              </button>

              <button
                onClick={() => {
                  const phoneNumber = '919265379915';
                  const message = encodeURIComponent('Hi! I need help choosing a subscription plan.');
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                }}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-medium transition-all duration-180 hover:scale-105 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Subscription Help 📅
              </button>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <div className="relative">
          <button
            onClick={() => {
              if (isWhatsAppExpanded) {
                openWhatsAppChat();
              } else {
                setIsWhatsAppExpanded(true);
              }
            }}
            onMouseEnter={() => setIsWhatsAppExpanded(true)}
            className="group bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
            style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}
            aria-label="Chat with us on WhatsApp"
            tabIndex={0}
          >
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
            <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-20"></div>

            {/* WhatsApp Icon */}
            <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488" />
            </svg>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </button>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            1
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us!
          </div>
        </div>
      </div>

      {/* Background overlay when WhatsApp expanded */}
      {isWhatsAppExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsWhatsAppExpanded(false)}
          aria-label="Close chat preview"
        />
      )}
    </>
  );
};

export default FloatingControls;
