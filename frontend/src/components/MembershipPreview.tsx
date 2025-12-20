import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Zap, Award, ArrowRight, Star, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS, buildApiUrl } from '../config/api';

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  saladsPerWeek: string;
  badge?: string;
  badgeColor: string;
  icon: React.ReactNode;
  features: string[];
  recommended?: boolean;
}

const MembershipPreview = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_PLANS));
        const activePlans = response.data.filter((plan: any) => plan.isActive);

        const mappedPlans = activePlans.map((plan: any) => ({
          id: plan._id,
          name: plan.planName,
          price: plan.price,
          originalPrice: plan.originalPrice,
          saladsPerWeek: plan.saladsPerWeek,
          badge: getBadgeText(plan.planType),
          badgeColor: getBadgeColor(plan.planType),
          icon: getPlanIcon(plan.planType),
          features: plan.features,
          recommended: plan.planType === 'Popular'
        }));

        setPlans(mappedPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'Starter': return <Sparkles className="w-6 h-6" />;
      case 'Popular': return <Zap className="w-6 h-6" />;
      case 'Elite': return <Award className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  const getBadgeText = (type: string) => {
    switch (type) {
      case 'Starter': return 'SAVE 40%';
      case 'Popular': return 'BEST VALUE';
      case 'Elite': return 'PREMIUM';
      default: return undefined;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Starter': return 'bg-blue-500';
      case 'Popular': return 'bg-orange-500';
      case 'Elite': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-100 rounded-full text-sm font-bold text-green-700 mb-4">
            <Sparkles className="w-4 h-4" />
            MEMBERSHIP PLANS
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Choose Your <span className="text-green-600">Wellness Plan</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Premium quality salads delivered fresh to your doorstep. Start your healthy lifestyle today.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-green-600" />
          </div>
        ) : (
          /* Plans Grid */
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent ${plan.recommended
                    ? 'md:scale-105 hover:border-black'
                    : 'hover:border-green-400'
                  }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-6 -right-12 ${plan.badgeColor} text-white px-12 py-1.5 text-xs font-black rotate-45 shadow-lg`}>
                    {plan.badge}
                  </div>
                )}

                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-2.5 font-bold text-sm tracking-wide">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="p-6 md:p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${plan.recommended ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    } mb-4`}>
                    {plan.icon}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-500 font-semibold mb-4">{plan.saladsPerWeek}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-black text-gray-900">₹{plan.price}</span>
                      <span className="text-base text-gray-500 font-medium">/month</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-400 line-through">₹{plan.originalPrice}</span>
                        <span className="text-sm font-bold text-green-600">
                          Save ₹{plan.originalPrice - plan.price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${plan.recommended ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                          <Check className={`w-3.5 h-3.5 ${plan.recommended ? 'text-green-600' : 'text-gray-600'}`} />
                        </div>
                        <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate('/membership')}
                    className={`w-full py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 ${plan.recommended
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                        : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                      }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Plans Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/membership')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-xl font-bold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
          >
            View All Plans & Features
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MembershipPreview;

