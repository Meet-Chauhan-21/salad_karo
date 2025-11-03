import React, { useState, useMemo } from 'react';
import { Plus, Heart, Star, Filter } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { PRODUCTS } from '../lib/products';

const categories = ['Italian', 'Paneer Salad', 'Low Fiber', 'High Protein', 'Healthy', 'Spicy', 'Premium'];

const EnhancedFreshSaladMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addToCart } = useCart();
  const { isLiked, toggleLike } = useLikes();

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(product => product.badge === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <section id="shop" className="relative py-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        {/* Floating vegetables decoration */}
        <div className="absolute top-10 left-10 w-20 h-20 opacity-10">
          <div className="w-full h-full bg-green-400 rounded-full animate-float"></div>
        </div>
        <div className="absolute top-32 right-20 w-16 h-16 opacity-10">
          <div className="w-full h-full bg-orange-400 rounded-full animate-float-delayed"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 opacity-10">
          <div className="w-full h-full bg-red-400 rounded-full animate-float"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 animate-fade-in-up">
            Fresh Salad Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
            Discover our premium collection of fresh, healthy, and delicious salads made with the finest ingredients
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-300">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              All Salads
            </span>
            {selectedCategory !== 'All' && (
              <span className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            )}
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="relative z-10">{category}</span>
              {selectedCategory !== category && (
                <span className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              )}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      isLiked(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 hover:text-red-500'
                    }`}
                  />
                </button>

                {/* Category Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
                  <span className="text-sm text-gray-600">({product.rating})</span>
                  <span className="text-sm text-gray-500">• {product.reviews} reviews</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-green-700">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="group/btn relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 active:scale-95"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🥗</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No salads found</h3>
            <p className="text-gray-500">Try selecting a different category to explore more options</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EnhancedFreshSaladMenu;