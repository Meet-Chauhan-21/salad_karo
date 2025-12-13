import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface CartBarProps {
  itemCount: number;
  total: number;
  isExiting?: boolean;
  onViewCart: () => void;
}

const CartBar: React.FC<CartBarProps> = ({ itemCount, total, isExiting = false, onViewCart }) => {
  return (
    <div className={`fixed bottom-3 sm:bottom-4 left-2 right-2 sm:left-3 sm:right-3 z-50 ${isExiting ? 'animate-slide-down' : 'animate-slide-up'}`}>
      {/* Glassmorphism container with refined shadow */}
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(34,197,94,0.08)] border border-green-100/60">
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3">
          
          {/* Left Side - Cart Info */}
          <div className="flex items-center gap-3">
            {/* Refined cart icon with subtle glow */}
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(34,197,94,0.25)]">
                <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
              </div>
              
              {/* Sleeker item count badge */}
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_3px_8px_rgba(249,115,22,0.3)] border border-white">
                <span className="text-xs font-bold text-white">{itemCount > 99 ? '99+' : itemCount}</span>
              </div>
            </div>
            
            {/* Enhanced typography and spacing */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-800 font-semibold text-sm sm:text-base tracking-tight">
                  {itemCount} item{itemCount !== 1 ? 's' : ''}
                </span>
                <div className="w-1 h-1 bg-gray-300/70 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">in cart</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent tracking-tight">
                  ₹{total.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">total</span>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced button with better visual hierarchy */}
          <div className="flex items-center gap-3">
            {/* Optional: Add a subtle progress indicator or message */}
            <div className="hidden sm:block text-xs text-gray-500 font-medium px-2 py-1 bg-green-50/50 rounded-md border border-green-100">
              Free shipping over ₹500
            </div>
            
            <button
              onClick={onViewCart}
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-4 py-2.5 sm:px-5 rounded-lg shadow-[0_4px_16px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.35)] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-green-400/50"
              aria-label={`View cart with ${itemCount} items totaling ₹${total}`}
            >
              {/* Refined button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              
              {/* Button content with improved spacing */}
              <div className="relative flex items-center gap-2 text-sm sm:text-base">
                <span className="tracking-tight">View Cart</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* More subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
          </div>
        </div>

        {/* Enhanced gradient accent with opacity */}
        <div className="h-[3px] bg-gradient-to-r from-transparent via-green-400/60 to-transparent"></div>
      </div>
    </div>
  );
};

export default CartBar;