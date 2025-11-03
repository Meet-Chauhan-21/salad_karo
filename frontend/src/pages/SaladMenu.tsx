import React, { useState, useMemo, useContext, useRef } from 'react';
import SaladDetailOverlay from '../components/SaladDetailOverlay';
import { Search, Filter, ShoppingCart, Star, Heart, Plus, Minus, ChevronDown, ChevronUp, X, Leaf, Award, Clock, Users } from 'lucide-react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import FloatingControls from '../components/FloatingControls';
import CustomerTestimonials from '../components/CustomerTestimonials';
import AdminAccessButton from '../components/AdminAccessButton';
import { CartContext, useCart } from '../contexts/CartContext';
import { LikesContext, useLikes } from '../contexts/LikesContext';
import { useOverlay } from '../contexts/OverlayContext';
import { PRODUCTS, Product } from '../lib/products';
import { useNavigate } from 'react-router-dom';
import { useOrderNavigation } from '../hooks/use-order-navigation';

// Extended product interface for menu
interface ExtendedProduct extends Product {
  category: string;
  ingredients: string[];
  isVeg: boolean;
  tags: string[];
  preparationTime: string;
  calories: number;
}

const SaladMenu = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { handleOrderNow } = useOrderNavigation();
  // Overlay state and handlers
  const [selectedSalad, setSelectedSalad] = useState<ExtendedProduct | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Overlay open only if not clicking like/add to cart
  const handleSaladClick = (salad: ExtendedProduct, e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Prevent overlay if like/add to cart button or their children are clicked
    if (
      target.closest('button') ||
      target.closest('.like-btn') ||
      target.closest('.add-btn') ||
      target.closest('.qty-control')
    ) {
      return;
    }
    setSelectedSalad(salad);
    setIsDetailOpen(true);
    setIsSaladDetailOpen(true);
  };

  const closeDetailOverlay = () => {
    setIsDetailOpen(false);
    setSelectedSalad(null);
    setIsSaladDetailOpen(false);
  };
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const { likedProductIds, toggleLike, isLiked } = useLikes();
  const { setIsSaladDetailOpen } = useOverlay();

  // Get quantity of a product in cart
  const getProductQuantity = (productId: number): number => {
    const cartItem = cart.items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle quantity change
  const handleQuantityChange = (productId: number, change: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentQty = getProductQuantity(productId);
    const newQty = currentQty + change;
    
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQty);
    }
  };

  // Category and sort options
  const CATEGORIES = [
    'All',
    'Classic',
    'Premium',
    'Spicy',
    'Veg',
    'Protein',
    'Low Calorie',
    'Seasonal',
  ];
  const SORT_OPTIONS = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'newest', label: 'Newest' },
  ];

  // Filtering and sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 350]);
  const [sortBy, setSortBy] = useState('popularity');

  // Map PRODUCTS to ExtendedProduct with mock data for missing fields
  const extendedSalads: ExtendedProduct[] = useMemo(() => 
    PRODUCTS.map(p => ({
      ...p,
      category: p.badge || 'Classic',
      ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Olive Oil', 'Fresh Herbs'],
      isVeg: true,
      tags: ['Fresh', 'Organic', 'Healthy'],
      preparationTime: '15 min',
      calories: 120,
    })),
    []
  );

  // Get all unique ingredients
  const allIngredients = useMemo(() => {
    const ingredients = new Set<string>();
    extendedSalads.forEach(salad => {
      salad.ingredients.forEach((ingredient: string) => ingredients.add(ingredient));
    });
    return Array.from(ingredients).sort();
  }, [extendedSalads]);

  // Filter and sort salads
  const filteredSalads = useMemo(() => {
    let filtered = extendedSalads.filter(salad => {
      const matchesSearch = salad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salad.ingredients.some((ing: string) => ing.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || salad.category === selectedCategory;
      const matchesPrice = salad.price >= priceRange[0] && salad.price <= priceRange[1];
      const matchesIngredients = selectedIngredients.length === 0 ||
        selectedIngredients.some((ing) => salad.ingredients.includes(ing));

      return matchesSearch && matchesCategory && matchesPrice && matchesIngredients;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'popularity':
        default:
          return b.reviews - a.reviews;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy, selectedIngredients, extendedSalads]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(ing => ing !== ingredient)
        : [...prev, ingredient]
    );
  };

  const clearFilters = () => {
  setSelectedCategory('All');
  setPriceRange([0, 350]);
  setSelectedIngredients([]);
  setSearchTerm('');
  };

  const getTotalCartItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-br from-green-600 via-green-500 to-green-400 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-white rounded-full"></div>
          <div className="absolute top-10 sm:top-20 right-5 sm:right-10 lg:right-20 w-12 sm:w-18 lg:w-24 h-12 sm:h-18 lg:h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-5 sm:bottom-10 left-1/4 sm:left-1/3 w-20 sm:w-28 lg:w-40 h-20 sm:h-28 lg:h-40 bg-white rounded-full"></div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-10 text-white">
            {/* Left: Headline & Description */}
            <div className="text-center lg:text-left">
              {/* Hero Qualities */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6 animate-fade-in-up">
                <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/60 text-green-800 text-xs font-semibold shadow-sm">
                  <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Fresh</span>
                  <span className="sm:hidden">🌿</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/60 text-green-800 text-xs font-semibold shadow-sm">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20c0-4 2-8 5-11a12 12 0 0 1 5-3"/><path d="M3 20c0-6 3-11 8-15"/></svg>
                  <span className="hidden sm:inline">Organic</span>
                  <span className="sm:hidden">🌱</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/60 text-green-800 text-xs font-semibold shadow-sm">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V6a2 2 0 0 0-2-2h-4"/><path d="M3 10V6a2 2 0 0 1 2-2h4"/><path d="M7 22h10"/><path d="M7 10h10"/><path d="M12 2v20"/></svg>
                  <span className="hidden sm:inline">Local</span>
                  <span className="sm:hidden">🏪</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up">
                <span className="block">Our Fresh & Healthy</span>
                <span className="block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  Salad Menu
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-2xl lg:max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up">
                Discover our handcrafted salads made with premium ingredients, 
                perfect for every taste and dietary preference.
              </p>
            </div>

            {/* Right: CTAs + Trust Badges */}
            <div className="flex flex-col items-center lg:items-end gap-6 animate-fade-in-up">
              {/* CTA Group */}
              <div className="flex items-center justify-center lg:justify-end gap-4">
                <button
                  onClick={handleOrderNow}
                  className="px-6 py-3 rounded-xl bg-white text-green-700 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Order Now
                </button>
                <a
                  href="/membership"
                  className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/30 font-semibold backdrop-blur hover:bg-white/15 hover:border-white/40 transition-all"
                >
                  View Plans
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col items-stretch w-full max-w-sm gap-3">
                <div className="flex items-center justify-between bg-black px-4 py-3 rounded-2xl backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="text-white/90 font-semibold">4.9/5</span>
                  </div>
                  <span className="text-white/70">Average Rating</span>
                </div>
                <div className="flex items-center justify-between bg-black px-4 py-3 rounded-2xl backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-300" />
                    <span className="text-white/90 font-semibold">10K+</span>
                  </div>
                  <span className="text-white/70">Happy Customers</span>
                </div>
                <div className="flex items-center justify-between bg-black px-4 py-3 rounded-2xl backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-300" />
                    <span className="text-white/90 font-semibold">Same‑Day</span>
                  </div>
                  <span className="text-white/70">Fresh Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto">
            <path 
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" 
              fill="white" 
              className="opacity-90"
            />
          </svg>
        </div>
      </section>

      <main className="py-8 sm:py-12 overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
              
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search salads, ingredients, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="w-full lg:w-auto">
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 sm:px-4 lg:px-6 py-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="350"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="350"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  {/* Sort By */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <Filter className="w-4 h-4 text-green-600" />
                      Sort By
                    </label>
                    <div className="relative group">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl bg-gradient-to-r from-white to-gray-50 text-gray-700 font-semibold shadow-sm hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:from-green-50 focus:to-white transition-all duration-300 cursor-pointer appearance-none"
                      >
                        {SORT_OPTIONS.map(option => (
                          <option key={option.value} value={option.value} className="py-3 font-medium">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none transition-transform duration-200 group-hover:scale-110">
                        <ChevronDown className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>
                </div>
                
                {/* Ingredients Filter */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Filter by Ingredients
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allIngredients.slice(0, 12).map(ingredient => (
                      <button
                        key={ingredient}
                        onClick={() => toggleIngredient(ingredient)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedIngredients.includes(ingredient)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {ingredient}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Showing {filteredSalads.length} of {extendedSalads.length} salads
            </p>
            {getTotalCartItems() > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-green-600 font-medium">
                <ShoppingCart className="w-5 h-5" />
                {getTotalCartItems()} items in cart
              </div>
            )}
          </div>
          
          {/* Salad Grid */}
          <div ref={gridRef} id="shop" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredSalads.map((salad, index) => (
              <div
                key={salad.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={(e) => handleSaladClick(salad, e)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={salad.image}
                    alt={salad.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {salad.badge && (
                      <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                        {salad.badge}
                      </span>
                    )}
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-bold rounded-full flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      VEG
                    </span>
                  </div>
                  {/* Like Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(salad.id); }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 like-btn"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked(salad.id)
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  {/* Quick Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {salad.preparationTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {salad.calories} cal
                      </div>
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < salad.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({salad.reviews})</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {salad.category}
                    </span>
                  </div>
                  {/* Name and Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {salad.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {salad.description}
                  </p>
                  {/* Ingredients Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {salad.ingredients.slice(0, 3).map(ingredient => (
                      <span
                        key={ingredient}
                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {salad.ingredients.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{salad.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">₹{salad.price}</span>
                      {salad.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{salad.originalPrice}</span>
                      )}
                    </div>
                    
                    {getProductQuantity(salad.id) > 0 ? (
                      <div className="qty-control flex items-center gap-3 bg-green-100 rounded-2xl p-1 animate-fade-in scale-in">
                        <button
                          onClick={(e) => handleQuantityChange(salad.id, -1, e)}
                          className="w-8 h-8 flex items-center justify-center bg-white text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="min-w-[2rem] text-center font-bold text-green-700">
                          {getProductQuantity(salad.id)}
                        </span>
                        <button
                          onClick={(e) => handleQuantityChange(salad.id, 1, e)}
                          className="w-8 h-8 flex items-center justify-center bg-white text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(salad); }}
                        className="group/btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg hover:shadow-xl add-btn"
                      >
                        <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-200" />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredSalads.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No salads found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your filters or search terms to find the perfect salad for you.
              </p>
              <button
                onClick={clearFilters}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* Salad Detail Overlay */}
      {isDetailOpen && selectedSalad && (
        <SaladDetailOverlay
          product={selectedSalad}
          isOpen={isDetailOpen}
          onClose={closeDetailOverlay}
          initialQuantity={getProductQuantity(selectedSalad.id) || 1}
        />
      )}

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <CustomerTestimonials />
      </section>

      <FloatingControls />
      <AdminAccessButton />
      <ModernFooter />
    </div>
  );
};

export default SaladMenu;
