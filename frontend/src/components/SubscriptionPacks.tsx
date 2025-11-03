import React, { useState } from 'react';
import { Check, Star, Gift, Coffee, Zap } from 'lucide-react';

const SubscriptionPacks = () => {
  const [selectedPlan, setSelectedPlan] = useState('regular');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Pack',
      badge: 'Great Start',
      badgeColor: 'bg-blue-500',
      description: 'Perfect for trying out our fresh salad experience',
      price: 999,
      originalPrice: 1299,
      perSalad: 100,
      duration: 'month',
      saladsPerWeek: 3,
      features: [
        'Weekly fresh delivery',
        'Basic nutritional info',
        'Standard portions',
        'Popular salad varieties',
        'Customer support',
        'Flexible cancellation'
      ],
      comboAdd: {
        title: 'Make it a Combo',
        options: [
          { name: 'Fresh Juice', price: 39, popular: true },
          { name: 'Infused Water', price: 19 },
          { name: 'Green Tea', price: 29 }
        ]
      }
    },
    {
      id: 'regular',
      name: 'Regular Pack',
      badge: 'Most Popular',
      badgeColor: 'bg-green-500',
      description: 'Fixed healthy menu curated by our nutritionists',
      price: 1599,
      originalPrice: 1999,
      perSalad: 80,
      duration: 'month',
      saladsPerWeek: 5,
      features: [
        'Nutritionist curated menu',
        'Fresh daily delivery',
        'Balanced macro nutrients',
        'Seasonal ingredients',
        'No customization needed',
        'Perfect portion sizes'
      ],
      comboAdd: {
        title: 'Make it a Combo',
        options: [
          { name: 'Fresh Juice', price: 49, popular: true },
          { name: 'Green Smoothie', price: 59 },
          { name: 'Detox Water', price: 29 }
        ]
      }
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      badge: 'Best Value',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Ultimate healthy experience with premium ingredients',
      price: 2499,
      originalPrice: 3199,
      perSalad: 83,
      duration: 'month',
      saladsPerWeek: 7,
      features: [
        'Premium organic ingredients',
        'Daily chef-curated menus',
        'Full nutritional analysis',
        'Free diet consultation',
        'Priority delivery slots',
        'Exclusive seasonal specials',
        'Personal nutrition coach',
        'Weekend special bowls'
      ],
      comboAdd: {
        title: 'Make it a Combo',
        options: [
          { name: 'Premium Cold Press', price: 89, popular: true },
          { name: 'Protein Power Smoothie', price: 99 },
          { name: 'Superfood Booster', price: 79 },
          { name: 'Immunity Shot', price: 49 }
        ]
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-yellow-100 rounded-full text-sm font-medium text-yellow-700 mb-6">
            <Star className="w-4 h-4 mr-2" />
            Subscription Plans
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">Perfect Plan</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get fresh, healthy salads delivered daily with our flexible subscription plans designed for your lifestyle
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in-up ${
                selectedPlan === plan.id ? 'ring-4 ring-green-400 ring-opacity-50 scale-105' : ''
              } ${plan.id === 'premium' ? 'lg:scale-105 border-2 border-gradient-to-r from-purple-200 to-pink-200' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              
              {/* Popular Badge */}
              <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${plan.badgeColor} text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg ${
                plan.id === 'premium' ? 'animate-pulse' : ''
              }`}>
                {plan.badge}
              </div>
              </div>

              {/* Plan Header */}
              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{plan.originalPrice}</span>
                    <span className="text-sm text-gray-500">/{plan.duration}</span>
                  </div>
                  <div className="text-green-600 font-medium">
                    ₹{plan.perSalad} per salad • {plan.saladsPerWeek} salads/week
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Combo Add-ons */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-orange-500" />
                  <h4 className="font-bold text-gray-900">{plan.comboAdd.title}</h4>
                </div>
                
                <div className="space-y-3">
                  {plan.comboAdd.options.map((option, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {option.name === 'Fresh Juice' && <Zap className="w-4 h-4 text-orange-500" />}
                        {option.name === 'Premium Juice' && <Zap className="w-4 h-4 text-orange-500" />}
                        {option.name.includes('Smoothie') && <Coffee className="w-4 h-4 text-green-500" />}
                        {(option.name.includes('Water') || option.name.includes('Tea')) && <div className="w-4 h-4 bg-blue-400 rounded-full"></div>}
                        <span className="text-sm text-gray-700">{option.name}</span>
                        {option.popular && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Popular</span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">+₹{option.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className={`group/btn w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                selectedPlan === plan.id
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">
                  {selectedPlan === plan.id ? 'Selected Plan ✓' : 'Choose This Plan'}
                </span>
              </button>

              {/* Enhanced Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
                plan.id === 'premium' 
                  ? 'bg-gradient-to-r from-purple-400/10 to-pink-400/10' 
                  : 'bg-gradient-to-r from-green-400/10 to-blue-400/10'
              } group-hover:scale-105`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up">
          <p className="text-gray-600 mb-6">Not sure which plan is right for you?</p>
          <button className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
            Get Personalized Recommendation
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPacks;