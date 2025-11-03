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
      <div className="max-w-4xl mx-auto bg-white rounded-lg sm:rounded-xl shadow-[0_6px_24px_-6px_rgba(34,197,94,0.2)] border border-green-100/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4">
          {/* Left Side - Cart Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              {/* Item Count Badge */}
              <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-white">{itemCount > 99 ? '99+' : itemCount}</span>
              </div>
            </div>
            
            {/* Cart Details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <div className="flex items-center gap-1">
                <span className="text-gray-800 font-semibold text-sm sm:text-base">
                  {itemCount} item{itemCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  ₹{total}
                </span>
                <span className="text-gray-600 font-medium ml-1 text-xs sm:text-sm">total</span>
              </div>
            </div>
          </div>

          {/* Right Side - View Cart Button */}
          <button
            onClick={onViewCart}
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-md sm:rounded-lg shadow-[0_3px_15px_-3px_rgba(34,197,94,0.4)] hover:shadow-[0_4px_20px_-3px_rgba(34,197,94,0.5)] transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-green-300/50 text-sm sm:text-base"
            aria-label={`View cart with ${itemCount} items totaling ₹${total}`}
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            
            {/* Button Content */}
            <div className="relative flex items-center gap-1.5 text-sm md:text-base">
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </button>
        </div>

        {/* Subtle Bottom Accent Line */}
        <div className="h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-b-xl opacity-60"></div>
      </div>
    </div>
  );
};

export default CartBar;
