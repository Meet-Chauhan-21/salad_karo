import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Heart, Star, ShoppingCart, Clock, Truck, Shield, Award, Tag, Zap } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { useOverlay } from '../contexts/OverlayContext';

interface SaladDetailOverlayProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
}

const SaladDetailOverlay: React.FC<SaladDetailOverlayProps> = ({ product, isOpen, onClose, initialQuantity = 1 }) => {
  const { addToCart, cart, updateQuantity: updateCartQuantity } = useCart();
  const { isLiked, toggleLike } = useLikes();
  const { setIsSaladDetailOpen } = useOverlay();
  
  // Check if item is already in cart and get its quantity
  const existingItem = cart.items.find(item => item.id === product?.id);
  const isItemInCart = !!existingItem;
  const cartQuantity = existingItem ? existingItem.quantity : 0;
  
  // Set initial quantity based on cart state or provided initial quantity
  const [quantity, setQuantity] = useState(isItemInCart ? cartQuantity : initialQuantity);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sync quantity when cart changes or initialQuantity changes
  useEffect(() => {
    if (isItemInCart) {
      setQuantity(cartQuantity);
    } else {
      setQuantity(initialQuantity);
    }
  }, [cartQuantity, initialQuantity, isItemInCart]);

  // Product images array (using same image multiple times for demo)
  const productImages = [
    product?.image,
    product?.image,
    product?.image
  ];

  const nutritionFacts = [
    { label: 'Calories', value: '120', unit: 'kcal' },
    { label: 'Protein', value: '8', unit: 'g' },
    { label: 'Carbs', value: '15', unit: 'g' },
    { label: 'Fiber', value: '6', unit: 'g' }
  ];

  const tags = [
    'Fresh', 'Organic', 'Vegan', 'Gluten-Free', 'Low-Calorie', 'High-Protein'
  ];

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely delicious! Fresh ingredients and perfect portion size.',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Raj Patel',
      rating: 4,
      comment: 'Great taste and healthy option. Will definitely order again.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Anjali Singh',
      rating: 5,
      comment: 'Best salad I have ever had! Fresh and flavorful.',
      date: '2 weeks ago'
    }
  ];

  useEffect(() => {
    // Notify overlay context about the state change
    setIsSaladDetailOpen(isOpen);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap
      const overlay = document.querySelector('.detail-overlay');
      if (overlay) {
        (overlay as HTMLElement).focus();
      }
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
  }, [isOpen, onClose, setIsSaladDetailOpen]);

  const handleAddToCart = async () => {
    if (isItemInCart) {
      // Update existing item to the new quantity
      updateCartQuantity(product.id, cartQuantity + quantity);
    } else {
      // Add new item - addToCart adds 1 quantity, then update to desired quantity
      const productForCart = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        rating: product.rating,
        reviews: product.reviews,
        badge: product.badge
      };
      await addToCart(productForCart);
      if (quantity > 1) {
        updateCartQuantity(product.id, quantity);
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
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        className={`detail-overlay fixed top-4 bottom-4 left-4 right-4 sm:right-0 sm:top-10 sm:bottom-10 sm:left-auto sm:mr-10 h-auto w-auto sm:max-w-2xl md:max-w-3xl bg-white rounded-2xl sm:rounded-l-2xl shadow-2xl overflow-y-auto
          ${isOpen ? 'slide-in-rtl' : 'opacity-0 pointer-events-none'}
        `}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        style={{
          boxShadow: '0 0 40px 0 rgba(0,0,0,0.15)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 sm:p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 pr-4">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 flex-shrink-0"
              aria-label="Close product details"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-6 pb-8 sm:pb-6 space-y-6 sm:space-y-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              
              {/* Like Button */}
              <button
                onClick={() => toggleLike(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  isLiked(product.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart
                  className={`w-6 h-6 transition-all duration-300 ${
                    isLiked(product.id) ? 'fill-white' : 'hover:fill-red-500'
                  }`}
                />
              </button>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-green-500 ring-2 ring-green-500/30' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Award className="w-5 h-5" />
                <span className="font-medium">Top Rated</span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Nutrition Facts
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {nutritionFacts.map((fact, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{fact.value}</div>
                    <div className="text-sm text-gray-500">{fact.unit}</div>
                    <div className="text-sm font-medium text-gray-700">{fact.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price and Offers */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-green-700">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl font-medium text-gray-500 line-through decoration-2">₹{product.originalPrice}</span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
                </div>
              </div>

              {/* Special Offers */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-orange-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Free delivery on orders above ₹299</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Fresh preparation within 30 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm font-medium">Same day delivery available</span>
                </div>
              </div>
            </div>

            {/* Quantity and Update Cart */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-6 -mx-6 px-6 pb-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-2xl p-1">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-700 text-lg">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 max-w-xs bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.06] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-green-300"
                  aria-label={`${buttonText} ${quantity} ${product.name} for ₹${product.price * quantity}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {buttonText} - ₹{product.price * quantity}
                </button>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.name}</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaladDetailOverlay;