import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Heart, Star, ShoppingCart, Clock, Award, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { useNavigate } from 'react-router-dom';

interface MobileSaladDetailProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
}

const MobileSaladDetail: React.FC<MobileSaladDetailProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  initialQuantity = 1 
}) => {
  const { addToCart, cart, updateQuantity: updateCartQuantity } = useCart();
  const { isLiked, toggleLike } = useLikes();
  const navigate = useNavigate();
  
  // Check if item is already in cart and get its quantity
  const existingItem = cart.items.find(item => item.id === product?.id);
  const isItemInCart = !!existingItem;
  const cartQuantity = existingItem ? existingItem.quantity : 0;
  
  // Set initial quantity based on cart state or provided initial quantity
  const [quantity, setQuantity] = useState(isItemInCart ? cartQuantity : initialQuantity);

  // Sync quantity when cart changes or initialQuantity changes
  useEffect(() => {
    if (isItemInCart) {
      setQuantity(cartQuantity);
    } else {
      setQuantity(initialQuantity);
    }
  }, [cartQuantity, initialQuantity, isItemInCart]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Handle Esc key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleAddToCart = async () => {
    if (isItemInCart) {
      // Update existing item to the new quantity
      updateCartQuantity(product.id, quantity);
    } else {
      // Add new item with specified quantity
      for (let i = 0; i < quantity; i++) {
        await addToCart(product);
      }
    }
    
    onClose();
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const buttonText = isItemInCart ? 'Update Cart' : 'Add to Cart';
  
  if (!product || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm border-b border-gray-100 p-4 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 text-center flex-1 px-4">Salad Details</h1>
          <button
            onClick={() => toggleLike(product.id)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label={isLiked(product.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked(product.id)
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-600'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-36">
          {/* Product Image */}
          <div className="relative w-full h-64 bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              </div>
            )}

            {/* VEG Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-green-600 text-xs font-bold rounded-full border border-green-200">
                VEG
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-4">
            {/* Name and Rating */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-green-600" />
                <span>{product.preparationTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Award className="w-4 h-4 text-green-600" />
                <span>{product.calories} cal</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Nutritional Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">120</div>
                  <div className="text-xs text-gray-600">Calories</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">8g</div>
                  <div className="text-xs text-gray-600">Protein</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">15g</div>
                  <div className="text-xs text-gray-600">Carbs</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">6g</div>
                  <div className="text-xs text-gray-600">Fiber</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section - Quantity and Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-4">
          {/* Quantity Selector */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 flex items-center justify-center bg-white text-green-600 rounded-full hover:bg-green-50 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="min-w-[3rem] text-center font-bold text-lg text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 flex items-center justify-center bg-white text-green-600 rounded-full hover:bg-green-50 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            {buttonText} • ₹{product.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSaladDetail;