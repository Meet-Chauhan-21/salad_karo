import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLikes } from '../contexts/LikesContext';
import { toast } from '@/components/ui/sonner';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { isLiked, toggleLike } = useLikes();
  const [isPinging, setIsPinging] = useState(false);
  const [isHeartPinging, setIsHeartPinging] = useState(false);

  // Get quantity of product in cart
  const getProductQuantity = (productId: number): number => {
    const cartItem = cart.items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle quantity change
  const handleQuantityChange = (productId: number, change: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentQty = getProductQuantity(productId);
    const newQty = currentQty + change;
    
    if (newQty <= 0) {
      removeFromCart(productId);
      toast('Removed from cart', { description: `${product.name} removed from your cart.` });
    } else {
      updateQuantity(productId, newQty);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setIsPinging(true);
    setTimeout(() => setIsPinging(false), 600);
    toast.success('Added to cart', {
      description: `${product.name} added to your cart.`
    });
  };

  const handleToggleLike = () => {
    if (!isLoggedIn) {
      alert('Please login to like salads.');
      return;
    }
    const willLike = !isLiked(product.id);
    toggleLike(product.id);
    setIsHeartPinging(true);
    setTimeout(() => setIsHeartPinging(false), 600);
    if (willLike) {
      toast.success('Added to likes', { description: `${product.name} saved to your likes.` });
    } else {
      toast('Removed from likes', { description: `${product.name} removed from your likes.` });
    }
  };

  return (
    <div className="card-product group">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-44 lg:h-48 object-cover group-hover:scale-110 transition-[var(--transition-smooth)]"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-[var(--transition-smooth)]">
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center">
            <button onClick={handleToggleLike} className="relative p-1.5 sm:p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-accent hover:text-accent-foreground transition-[var(--transition-smooth)] shadow-[var(--shadow-soft)]" aria-label="Toggle like">
              {isHeartPinging && (
                <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-accent/40 animate-ping" />
              )}
              <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isLiked(product.id) ? 'fill-accent text-accent' : ''}`} />
            </button>
            
            {getProductQuantity(product.id) > 0 ? (
              <div className="qty-control flex items-center gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-sm rounded-full p-0.5 sm:p-1 shadow-lg scale-in">
                <button
                  onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1, e); }}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
                <span className="min-w-[1.25rem] sm:min-w-[1.5rem] text-center font-bold text-gray-800 text-xs sm:text-sm">
                  {getProductQuantity(product.id)}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1, e); }}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAddToCart}
                className="relative px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary-glow transition-[var(--transition-smooth)] shadow-[var(--shadow-button)] flex items-center gap-1.5 sm:gap-2 active:scale-[0.98] text-xs sm:text-sm"
              >
                {isPinging && (
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/40 animate-ping" />
                )}
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-accent text-accent-foreground px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-[var(--transition-smooth)] line-clamp-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < product.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-xl sm:text-2xl font-bold text-primary">₹{product.price}</div>
            {product.originalPrice && (
              <div className="text-xs sm:text-sm text-muted-foreground line-through">₹{product.originalPrice}</div>
            )}
          </div>
          
          {getProductQuantity(product.id) > 0 ? (
            <div className="qty-control flex items-center gap-2 sm:gap-3 bg-green-100 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 scale-in">
              <button
                onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1, e); }}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-green-600 rounded-lg sm:rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <span className="min-w-[1.5rem] sm:min-w-[2rem] text-center font-bold text-green-700 text-sm sm:text-base">
                {getProductQuantity(product.id)}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1, e); }}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-green-600 rounded-lg sm:rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="relative p-2.5 sm:p-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full transition-[var(--transition-smooth)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-button)] hover:scale-110 active:scale-95"
              aria-label="Add to cart"
            >
              {isPinging && (
                <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/40 animate-ping" />
              )}
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;