import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const CustomerTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    rating: 0,
    reviews: 0,
    recommend: 0
  });
  const statsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Software Engineer',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612c99e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Salad Karo has completely transformed my eating habits! The variety is amazing and I love how fresh everything tastes. My energy levels have improved dramatically since I started my subscription.',
      location: 'Mumbai'
    },
    {
      id: 2,
      name: 'Arjun Patel',
      role: 'Fitness Trainer',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      testimonial: 'As a fitness professional, I recommend Salad Karo to all my clients. The nutritional balance is perfect, and the customizable options make it easy to meet specific dietary goals.',
      location: 'Delhi'
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      role: 'Marketing Manager',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      testimonial: 'The convenience of having healthy, delicious salads delivered daily has been a game-changer for my busy lifestyle. Plus, their customer service is exceptional!',
      location: 'Bangalore'
    },
    {
      id: 4,
      name: 'Rohit Kumar',
      role: 'Doctor',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'I prescribe healthy eating to my patients, and Salad Karo makes it achievable. The quality of ingredients and nutritional information provided is impressive.',
      location: 'Chennai'
    },
    {
      id: 5,
      name: 'Kavya Nair',
      role: 'Yoga Instructor',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      testimonial: 'The vegan options are absolutely delicious! I love how they source organic ingredients locally. It aligns perfectly with my values and lifestyle.',
      location: 'Kochi'
    },
    {
      id: 6,
      name: 'Vikram Singh',
      role: 'Business Owner',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Running a business leaves little time for meal prep. Salad Karo ensures I eat healthy without any hassle. The delivery is always on time!',
      location: 'Pune'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Animated counter on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    // Animate rating (4.9)
    let ratingStep = 0;
    const ratingInterval = setInterval(() => {
      ratingStep++;
      const progress = ratingStep / steps;
      const currentValue = 4.9 * progress;
      setAnimatedNumbers((prev) => ({ ...prev, rating: currentValue }));
      if (ratingStep >= steps) clearInterval(ratingInterval);
    }, stepDuration);

    // Animate reviews (1000)
    let reviewsStep = 0;
    const reviewsInterval = setInterval(() => {
      reviewsStep++;
      const progress = reviewsStep / steps;
      const currentValue = Math.floor(1000 * progress);
      setAnimatedNumbers((prev) => ({ ...prev, reviews: currentValue }));
      if (reviewsStep >= steps) clearInterval(reviewsInterval);
    }, stepDuration);

    // Animate recommend (98)
    let recommendStep = 0;
    const recommendInterval = setInterval(() => {
      recommendStep++;
      const progress = recommendStep / steps;
      const currentValue = Math.floor(98 * progress);
      setAnimatedNumbers((prev) => ({ ...prev, recommend: currentValue }));
      if (recommendStep >= steps) clearInterval(recommendInterval);
    }, stepDuration);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-blue-100 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
            Customer Reviews
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from thousands of satisfied customers who have transformed their eating habits
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Main Testimonial Display */}
          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mx-4">
                    
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
                        <Quote className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 font-light">
                      "{testimonial.testimonial}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      
                      {/* Profile Image */}
                      <div className="relative">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                        <p className="text-gray-600 mb-2">{testimonial.role}</p>
                        <p className="text-sm text-gray-500 mb-3">{testimonial.location}</p>
                        
                        {/* Rating */}
                        <div className="flex justify-center md:justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Trust Statistics */}
        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up">
          {/* Average Rating */}
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0s' }}
          >
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
              {hasAnimated ? animatedNumbers.rating.toFixed(1) : '0.0'}★
            </div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>

          {/* Reviews */}
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {hasAnimated ? animatedNumbers.reviews : '0'}+
            </div>
            <div className="text-gray-600 font-medium">Reviews</div>
          </div>

          {/* Recommend Us */}
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              {hasAnimated ? animatedNumbers.recommend : '0'}%
            </div>
            <div className="text-gray-600 font-medium">Recommend Us</div>
          </div>

          {/* Support */}
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;