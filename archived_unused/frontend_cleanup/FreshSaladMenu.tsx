import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Leaf, Clock } from 'lucide-react';
import { useSalads } from '@/hooks/useSalads';

const FreshSaladMenu = () => {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const { products, loading, error } = useSalads();

  const toggleLike = (productId: string) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(productId)) {
      newLikedItems.delete(productId);
    } else {
      newLikedItems.add(productId);
    }
    setLikedItems(newLikedItems);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading fresh salads...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-xl text-red-500">Error loading salads. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-6">
            <Leaf className="w-4 h-4 mr-2" />
            Fresh Collection
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our Fresh <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Salad Menu</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of healthy, delicious salads made with the freshest organic ingredients sourced locally
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      likedItems.has(product.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  />
                </button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Fresh
                </div>

                {/* Prep Time */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  5 mins
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                </div>

                {/* Name & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Ingredients Preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {['Lettuce', 'Tomatoes', 'Cucumbers'].map((ingredient, i) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      {ingredient}
                    </span>
                  ))}
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.price + 50}</span>
                  </div>
                  
                  {/* Add to Cart Button - Hidden by default, appears on hover */}
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 flex items-center gap-2 hover:scale-105">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fade-in-up">
          <button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-600/25 flex items-center justify-center mx-auto">
            View All Salads
            <div className="ml-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <span className="text-sm">→</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreshSaladMenu;