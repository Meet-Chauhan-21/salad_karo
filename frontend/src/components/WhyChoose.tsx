import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Shield, 
  Leaf, 
  ChefHat, 
  Award,
  RefreshCw,
  Target
} from 'lucide-react';

const WhyChoose = () => {
  const features = [
    {
      icon: Target,
      title: 'Balanced Nutrition',
      description: 'Expertly crafted recipes with perfect macro and micro-nutrient balance for optimal health',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      icon: Sparkles,
      title: 'Daily Variety',
      description: 'Never get bored with our rotating menu of 50+ unique salad combinations and seasonal specials',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      icon: Shield,
      title: 'No Added Sugars',
      description: 'Pure, natural ingredients with no artificial sweeteners, preservatives, or hidden sugars',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: Leaf,
      title: 'Specialized Diets',
      description: 'Keto, Vegan, Paleo, Low-carb, and High-protein options designed by certified nutritionists',
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600'
    },
    {
      icon: ChefHat,
      title: 'Customizable Meals',
      description: 'Personalize every salad with your preferred ingredients, portions, and dietary restrictions',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      icon: Award,
      title: 'Wholesome Ingredients',
      description: 'Premium organic vegetables, superfoods, and locally sourced ingredients for maximum freshness',
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600'
    },
    {
      icon: RefreshCw,
      title: 'Flexible Plans',
      description: 'Skip, pause, or modify your subscription anytime with no penalties or hidden fees',
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600'
    },
    {
      icon: Heart,
      title: 'Satisfaction Guarantee',
      description: '100% money-back guarantee within 30 days if you\'re not completely satisfied',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-6">
            <Heart className="w-4 h-4 mr-2 animate-pulse" />
            Why Choose Salad Karo
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Why We're <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Different</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our commitment to quality, nutrition, and customer satisfaction
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.color} ${feature.hoverColor} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Animation Element */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${feature.color} blur-xl`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 animate-fade-in-up">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Eating Habits?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made healthy eating a delicious and convenient part of their daily routine
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 hover:text-green-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Start Your Journey Today
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up">
          {[
            { number: '1000+', label: 'Happy Customers' },
            { number: '50+', label: 'Unique Recipes' },
            { number: '99%', label: 'Satisfaction Rate' },
            { number: '5★', label: 'Average Rating' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;