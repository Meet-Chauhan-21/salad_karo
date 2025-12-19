import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import heroSalad from '../assets/hero-salad.jpg';
import { useOrderNavigation } from '../hooks/use-order-navigation';

const ModernHero = () => {
  const { handleOrderNow } = useOrderNavigation();
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      {/* Smooth Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-yellow-300/10"></div>
      
      {/* Subtle Parallax Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-yellow-200/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-24 sm:w-48 h-24 sm:h-48 bg-green-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12 pb-12 sm:pb-20 lg:pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh]">
          
          {/* Content Section */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12 order-2 lg:order-1 pb-8 sm:pb-16 lg:pb-24">
            
            {/* Small Badge */}
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-green-700 shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3"></span>
              <span className="hidden sm:inline">Fresh • Healthy • Delivered Daily</span>
              <span className="sm:hidden">Fresh • Healthy</span>
            </div>
            
            {/* Bold Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-gray-900">
                  Fresh & Healthy
                </span>
                <span className="block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Salad Delivered
                </span>
                <span className="block text-gray-900">
                  To Your Door
                </span>
              </h1>
              
              {/* Subtext */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xl leading-relaxed font-light">
                Premium quality salads made with locally sourced organic ingredients. 
                <span className="hidden sm:inline"> Start your healthy lifestyle journey today.</span>
              </p>
            </div>

            {/* Two Clear CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button 
                onClick={handleOrderNow}
                className="hero-cta-journey group bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.06] active:scale-95 hover:shadow-2xl hover:shadow-green-600/25 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Start your healthy journey - scroll to fresh menu"
              >
                <span className="hidden sm:inline">Start Your Healthy Journey</span>
                <span className="sm:hidden">Start Journey</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <a 
                href="/menu"
                className="hero-cta-menu group bg-white hover:bg-gray-50 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:scale-[1.06] active:scale-95 hover:shadow-xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-300 no-underline"
                aria-label="View menu - go to salad menu page"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                View Menu
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-8 md:gap-12 pt-6 sm:pt-8 pb-4 sm:pb-8 lg:pb-12">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1">1000+</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1">50+</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Fresh Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1">99%</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative sm:lg:pl-8 order-1 lg:order-2 flex items-center justify-center pb-8 sm:pb-12 lg:pb-20 xl:pb-32">
            
            {/* Main Image Container */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-none mb-8 sm:mb-12 lg:mb-16 xl:mb-28">
              
              {/* Glow Effect Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl scale-110"></div>
              
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <img 
                  src={heroSalad}
                  alt="Fresh, colorful salad bowl - Salad Karo"
                  className="w-full h-auto object-cover"
                />
                
                {/* Quality Badge Overlay */}
                <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 shadow-md sm:shadow-lg">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">4.9</span>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">Premium Quality</div>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 right-3 sm:right-4 lg:right-6 bg-green-600 text-white rounded-lg sm:rounded-xl lg:rounded-2xl px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 shadow-md sm:shadow-lg">
                  <div className="text-xs sm:text-sm font-medium opacity-90">Starting from</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">₹199</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 sm:-top-4 lg:-top-6 -right-2 sm:-right-4 lg:-right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-md sm:shadow-lg">
                <span className="text-base sm:text-xl lg:text-2xl">🥗</span>
              </div>
              
              <div className="absolute -bottom-6 sm:-bottom-8 lg:-bottom-12 xl:-bottom-16 -left-6 sm:-left-8 lg:-left-12 xl:-left-16 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-md sm:shadow-lg">
                <span className="text-sm sm:text-lg lg:text-xl">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto">
          <path 
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" 
            fill="white" 
            className="opacity-80"
          />
        </svg>
      </div>
    </section>
  );
};

export default ModernHero;