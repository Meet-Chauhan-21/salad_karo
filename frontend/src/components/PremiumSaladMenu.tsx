import React, { useState, useMemo } from 'react';
import { Plus, Heart, Star, Filter, Utensils, Leaf, Zap, Salad, Pizza, Dumbbell, ShieldCheck, Flame, Crown, ChefHat, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { PRODUCTS } from '../lib/products';
import SaladDetailOverlay from './SaladDetailOverlay';

const PremiumSaladMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const { isLiked, toggleLike } = useLikes();

  // Get quantity of a product in cart
  const getProductQuantity = (productId: number): number => {
    const cartItem = cart.items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Category definitions with icons matching requirements
  const categories = [
    { name: 'All', icon: Salad, color: 'from-green-500 to-green-600', filter: 'all' },
    { name: 'Italian', icon: Pizza, color: 'from-red-500 to-red-600', filter: 'italian' },
    { name: 'Paneer Salad', icon: ChefHat, color: 'from-yellow-500 to-orange-500', filter: 'paneer' },
    { name: 'Low-Fiber', icon: Minus, color: 'from-blue-400 to-blue-500', filter: 'low-fiber' },
    { name: 'High-Protein', icon: Dumbbell, color: 'from-purple-500 to-purple-600', filter: 'high-protein' },
    { name: 'Healthy', icon: Heart, color: 'from-green-400 to-green-500', filter: 'healthy' },
    { name: 'Spicy', icon: Flame, color: 'from-orange-500 to-red-500', filter: 'spicy' },
    { name: 'Premium', icon: Crown, color: 'from-purple-600 to-pink-500', filter: 'premium' }
  ];

  // Filter products based on selected category and badge
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(product => 
      product.badge && product.badge.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleQuantityChange = (productId: number, change: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentQty = getProductQuantity(productId);
    const newQty = currentQty + change;
    
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQty);
    }
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="menu" className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-green-50">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div id="fresh-menu" className="text-center mb-16 animate-fade-in-up scroll-mt-24 md:scroll-mt-32">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-6">
            <Utensils className="w-4 h-4 mr-2" />
            Fresh Menu
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Premium <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Salad Collection</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handcrafted with love using the freshest organic ingredients. Each salad is a perfect blend of taste, nutrition, and wellness.
          </p>
        </div>

        {/* Enhanced Category Filters */}
        <div className="mb-16 animate-fade-in-up delay-200">
          {/* Mobile: Flex Wrap for All Filters Visible */}
          <div className="md:hidden px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.name;
                
                return (
                  <button
                    key={category.name}
                    data-filter={category.filter}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`filter-chip group relative px-3 py-2 sm:px-4 sm:py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 ${
                      isActive
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                        : 'bg-white text-gray-700 shadow-md'
                    } border-2 ${isActive ? 'border-transparent' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-300`}
                    aria-label={`Filter by ${category.name}`}
                    aria-pressed={isActive}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                      <span className="text-xs sm:text-sm">{category.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: Centered Flex */}
          <div className="hidden md:flex flex-wrap justify-center gap-4 px-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.name;
              
              return (
                <button
                  key={category.name}
                  data-filter={category.filter}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`filter-chip group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.06] active:scale-95 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl'
                  } border-2 ${isActive ? 'border-transparent' : 'border-gray-100 hover:border-green-200'} focus:outline-none focus:ring-4 focus:ring-green-300`}
                  aria-label={`Filter by ${category.name}`}
                  aria-pressed={isActive}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <IconComponent className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'text-white' : 'text-gray-600'} group-hover:scale-110`} />
                    {category.name}
                  </span>
                  
                  {/* Glow effect for active state */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl blur opacity-50 -z-10`}></div>
                  )}
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Premium Products Grid */}
        <div id="shop" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 lg:px-0">
          {filteredProducts.map((product, index) => {
            const quantity = getProductQuantity(product.id);
            const isProductLiked = isLiked(product.id);
            
            return (
              <div
                key={product.id}
                className="product-card group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden animate-fade-in-up border border-gray-100 hover:border-green-200 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image}
                    alt={`${product.name} - Fresh and delicious salad from Salad Karo`}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* CTA Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                      <p className="text-sm font-semibold text-gray-900 text-center">Click to view details</p>
                      <p className="text-xs text-gray-600 text-center">or add to cart</p>
                    </div>
                  </div>
                  
                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
                    className={`favorite-btn absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 ${
                      isProductLiked 
                        ? 'bg-red-500 text-white animate-bounce-in' 
                        : 'bg-white/90 text-gray-600 hover:text-red-500'
                    }`}
                    aria-label={isProductLiked ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        isProductLiked ? 'fill-white scale-110' : 'hover:fill-red-500'
                      }`}
                    />
                  </button>

                  {/* Category Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {product.badge}
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">({product.rating})</span>
                    <span className="text-sm text-gray-500">• {product.reviews} reviews</span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-700">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg font-medium text-gray-500 line-through decoration-2">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Dynamic Add/Quantity Button */}
                    {quantity === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="group/btn relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.06] active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add
                        </span>
                      </button>
                    ) : (
                      <div className="qty-control flex items-center gap-3 bg-green-100 rounded-2xl p-1 animate-fade-in scale-in">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(product.id, -1, e);
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-white text-green-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                          aria-label="Decrease quantity"
                        >
                          <span className="text-lg font-bold">−</span>
                        </button>
                        <span className="w-8 text-center font-bold text-green-700">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(product.id, 1, e);
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-white text-green-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="text-8xl mb-6">🥗</div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No salads found</h3>
            <p className="text-gray-500 text-lg mb-8">Try selecting a different category to explore more delicious options</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              View All Salads
            </button>
          </div>
        )}
      </div>

      {/* Salad Detail Overlay */}
      <SaladDetailOverlay 
        product={selectedProduct}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
        initialQuantity={selectedProduct ? (getProductQuantity(selectedProduct.id) || 1) : 1}
      />
    </section>
  );
};

export default PremiumSaladMenu;