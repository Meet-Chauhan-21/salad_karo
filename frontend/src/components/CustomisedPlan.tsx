import React, { useState } from 'react';
import { 
  ChefHat, 
  Calendar, 
  Target, 
  Zap, 
  Leaf, 
  Dumbbell, 
  Heart,
  ArrowRight,
  Check,
  Info
} from 'lucide-react';

const CustomisedPlan = () => {
  const [selectedFrequency, setSelectedFrequency] = useState('5');
  const [selectedDiet, setSelectedDiet] = useState('balanced');

  const frequencies = [
    { 
      id: '5', 
      label: '5 Salads/Week', 
      price: 999, 
      originalPrice: 1249,
      perSalad: 200,
      savings: 250,
      popular: false 
    },
    { 
      id: '10', 
      label: '10 Salads/Week', 
      price: 1799, 
      originalPrice: 2499,
      perSalad: 180,
      savings: 700,
      popular: true 
    },
    { 
      id: '14', 
      label: '14 Salads/Week', 
      price: 2399, 
      originalPrice: 3499,
      perSalad: 171,
      savings: 1100,
      popular: false 
    }
  ];

  const dietTypes = [
    {
      id: 'balanced',
      name: 'Balanced Diet',
      icon: Target,
      description: 'Perfect mix of proteins, carbs, and healthy fats',
      benefits: ['Weight management', 'Energy boost', 'Overall wellness'],
      color: 'bg-blue-500'
    },
    {
      id: 'keto',
      name: 'Keto Friendly',
      icon: Zap,
      description: 'Low-carb, high-fat for ketosis',
      benefits: ['Rapid weight loss', 'Mental clarity', 'Stable energy'],
      color: 'bg-purple-500'
    },
    {
      id: 'vegan',
      name: 'Pure Vegan',
      icon: Leaf,
      description: '100% plant-based nutrition',
      benefits: ['Eco-friendly', 'Digestive health', 'Clean eating'],
      color: 'bg-green-500'
    },
    {
      id: 'protein',
      name: 'High Protein',
      icon: Dumbbell,
      description: 'Extra protein for muscle building',
      benefits: ['Muscle growth', 'Post-workout', 'Satiety'],
      color: 'bg-red-500'
    },
    {
      id: 'lowcarb',
      name: 'Low Carb',
      icon: Heart,
      description: 'Reduced carbs for better metabolism',
      benefits: ['Blood sugar control', 'Fat burning', 'Reduced cravings'],
      color: 'bg-orange-500'
    }
  ];

  const selectedFrequencyData = frequencies.find(f => f.id === selectedFrequency);
  const selectedDietData = dietTypes.find(d => d.id === selectedDiet);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-6">
            <ChefHat className="w-4 h-4 mr-2" />
            Personalized Plans
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Create Your <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Perfect Plan</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Design a nutrition plan that fits your lifestyle, goals, and dietary preferences with our interactive customization tool
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Step 1: Frequency Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Choose Frequency</h3>
              </div>
              
              <div className="space-y-4">
                {frequencies.map((freq) => (
                  <div
                    key={freq.id}
                    onClick={() => setSelectedFrequency(freq.id)}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedFrequency === freq.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {freq.popular && (
                      <div className="absolute -top-3 left-4 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{freq.label}</span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">₹{freq.price}</div>
                        <div className="text-sm text-gray-500 line-through">₹{freq.originalPrice}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      ₹{freq.perSalad} per salad
                    </div>
                    
                    <div className="text-sm font-medium text-green-600">
                      Save ₹{freq.savings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Diet Type Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Select Diet Type</h3>
              </div>
              
              <div className="space-y-4">
                {dietTypes.map((diet) => {
                  const IconComponent = diet.icon;
                  return (
                    <div
                      key={diet.id}
                      onClick={() => setSelectedDiet(diet.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedDiet === diet.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${diet.color} rounded-full flex items-center justify-center text-white`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{diet.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{diet.description}</p>
                          
                          <div className="flex flex-wrap gap-1">
                            {diet.benefits.map((benefit, i) => (
                              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 3: Plan Summary & Checkout */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Your Custom Plan</h3>
              </div>

              {/* Plan Summary */}
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-sm text-gray-300 mb-1">Frequency</div>
                  <div className="font-semibold">{selectedFrequencyData?.label}</div>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-sm text-gray-300 mb-1">Diet Type</div>
                  <div className="font-semibold">{selectedDietData?.name}</div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Base Price</span>
                  <span>₹{selectedFrequencyData?.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-green-400">
                  <span>Discount</span>
                  <span>-₹{selectedFrequencyData?.savings}</span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span>₹{selectedFrequencyData?.price}</span>
                  </div>
                  <div className="text-sm text-gray-300 mt-1">
                    ₹{selectedFrequencyData?.perSalad} per salad
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="text-sm font-medium text-gray-300 mb-3">Included Features:</div>
                {[
                  'Personalized nutrition plan',
                  'Fresh daily preparation',
                  'Flexible delivery schedule',
                  'Nutritionist consultation',
                  'Progress tracking',
                  'Skip/pause anytime'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2">
                Start My Custom Plan
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="text-center mt-4">
                <span className="text-sm text-gray-400">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CustomisedPlan;