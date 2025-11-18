import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/products';
import { useSalads } from '@/hooks/useSalads';

const ProductGrid = () => {
  const { products, loading, error } = useSalads();

  if (loading) {
    return (
      <section id="shop" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Loading fresh salads...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-lg text-red-500">Error loading salads. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-secondary-foreground">
            🥗 Fresh Collection
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-gradient">Our Fresh</span>
            <span className="text-foreground"> Salad Menu</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Discover our carefully curated selection of healthy, delicious salads made with the freshest ingredients
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fade-in-up delay-400">
          <button className="btn-hero">
            View All Salads
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;