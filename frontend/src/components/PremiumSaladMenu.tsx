import React, { useState, useMemo } from 'react';
import { Plus, Heart, Star, Filter, Utensils, Leaf, Zap, Salad, Pizza, Dumbbell, ShieldCheck, Flame, Crown, ChefHat, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { useSalads } from '../hooks/useSalads';
import { useNavigate } from 'react-router-dom';
import SaladDetailOverlay from './SaladDetailOverlay';

const PremiumSaladMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const { isLiked, toggleLike } = useLikes();
  const { products, loading, error } = useSalads();
  const navigate = useNavigate();

  // Get quantity of a product in cart
  const getProductQuantity = (productId: string): number => {
    const cartItem = cart.items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Category definitions with icons matching actual badges in database
  const categories = [
    { name: 'All', icon: Salad, color: 'from-green-500 to-green-600', filter: 'all' },
    { name: 'Popular', icon: Star, color: 'from-yellow-500 to-orange-500', filter: 'popular' },
    { name: 'Spicy', icon: Flame, color: 'from-orange-500 to-red-500', filter: 'spicy' },
    { name: 'Premium', icon: Crown, color: 'from-purple-600 to-pink-500', filter: 'premium' },
    { name: 'Healthy', icon: Heart, color: 'from-green-400 to-green-500', filter: 'healthy' },
    { name: 'Tangy', icon: Zap, color: 'from-blue-400 to-blue-500', filter: 'tangy' },
    { name: 'Protein Rich', icon: Dumbbell, color: 'from-purple-500 to-purple-600', filter: 'protein rich' },
    { name: 'Classic', icon: ChefHat, color: 'from-red-500 to-red-600', filter: 'classic' }
  ];

  // Filter products based on selected category and badge
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product =>
      product.badge && product.badge.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleQuantityChange = (productId: string, change: number, e?: React.MouseEvent) => {
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
    // Detect if device is mobile
    const isMobile = window.innerWidth <= 768;

    console.log('Product clicked:', product.name, 'isMobile:', isMobile, 'width:', window.innerWidth);

    if (isMobile) {
      // Navigate to mobile detail page
      console.log('Navigating to mobile page for product:', product.id);
      navigate(`/salad/${product.id}`, { state: { product } });
    } else {
      console.log('Opening overlay for desktop');
      // Open overlay for desktop
      setSelectedProduct(product);
      setIsOverlayOpen(true);
    }
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <section id="menu" className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading premium salads...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="menu" className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center py-12">
            <p className="text-xl text-red-500">Error loading salads. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="relative pt-2 pb-4 md:py-20 overflow-hidden bg-gradient-to-b from-white to-green-50">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Hidden on Mobile */}
        <div id="fresh-menu" className="hidden md:block text-center mb-16 scroll-mt-24 md:scroll-mt-32">
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
        <div className="mb-6 md:mb-16">
          {/* Mobile: Flex Wrap for All Filters Visible - HIDDEN ON MOBILE */}
          <div className="hidden px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.name;

                return (
                  <button
                    key={category.name}
                    data-filter={category.filter}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`filter-chip group relative px-3 py-2 sm:px-4 sm:py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 ${isActive
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
                  className={`filter-chip group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.06] active:scale-95 ${isActive
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
        <div id="shop" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredProducts.map((product, index) => {
            const quantity = getProductQuantity(product.id);
            const isProductLiked = isLiked(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} - Fresh and delicious salad from Salad Karo`}
                    className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
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
                    className={`favorite-btn absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 ${isProductLiked
                      ? 'bg-red-500 text-white animate-bounce-in'
                      : 'bg-white/90 text-gray-600 hover:text-red-500'
                      }`}
                    aria-label={isProductLiked ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${isProductLiked ? 'fill-white scale-110' : 'hover:fill-red-500'
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
                <div className="p-3 md:p-6">
                  {/* Rating - Mobile & Desktop */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-700">({product.rating})</span>
                  </div>

                  <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Description - Desktop Only */}
                  <p className="hidden md:block text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Reviews - Desktop Only */}
                  <div className="hidden md:flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-500">• {product.reviews} reviews</span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <span className="text-lg md:text-2xl font-bold text-green-700">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs md:text-lg font-medium text-red-500 line-through md:decoration-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Dynamic Add/Quantity Button */}
                    {quantity === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="group/btn relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.06] active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-1 md:gap-2">
                          <Plus className="w-3 h-3 md:w-4 md:h-4" />
                          Add
                        </span>
                      </button>
                    ) : (
                      <div className="qty-control flex items-center gap-2 md:gap-3 bg-green-100 rounded-xl md:rounded-2xl p-1 animate-fade-in scale-in">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(product.id, -1, e);
                          }}
                          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white text-green-700 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                          aria-label="Decrease quantity"
                        >
                          <span className="text-sm md:text-lg font-bold">−</span>
                        </button>
                        <span className="w-6 md:w-8 text-center text-sm md:text-base font-bold text-green-700">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(product.id, 1, e);
                          }}
                          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white text-green-700 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4" />
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