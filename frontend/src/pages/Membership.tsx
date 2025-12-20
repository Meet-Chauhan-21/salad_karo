import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Star, Sparkles, Zap, Shield, Heart, Truck, Clock, Award, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS, buildApiUrl } from '../config/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { useCart } from '../contexts/CartContext';

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

const Membership = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
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



  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowModal(true);
  };

  const handleProceedToCheckout = async () => {
    if (selectedPlanData) {
      // Map plan to product format
      const product = {
        id: selectedPlanData.id,
        name: `${selectedPlanData.name} Membership`,
        description: `${selectedPlanData.saladsPerWeek} - ${billingCycle} plan`,
        price: selectedPlanData.price,
        originalPrice: selectedPlanData.originalPrice,
        image: 'https://cdn-icons-png.flaticon.com/512/2558/2558944.png', // Premium membership icon
        rating: 5,
        reviews: 0,
        badge: selectedPlanData.badge
      };

      await addToCart(product);
      setShowModal(false);
      navigate('/cart');
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-green-600 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back</span>
        </button>

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-100 rounded-full text-sm font-bold text-green-700 mb-4">
            <Heart className="w-4 h-4 fill-current" />
            MEMBERSHIP PLANS
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Choose Your <span className="text-green-600">Wellness Plan</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Premium quality salads delivered fresh to your doorstep. Start your healthy lifestyle today.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white p-2 rounded-full shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${billingCycle === 'monthly'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${billingCycle === 'quarterly'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Quarterly
              <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-green-600" />
          </div>
        ) : (
          /* Plans Grid */
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
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
                  <div className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-3 font-bold text-sm tracking-wide">
                    ⭐ MOST POPULAR CHOICE
                  </div>
                )}

                <div className="p-6">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${plan.recommended ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    } mb-4`}>
                    {plan.icon}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-black text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-500 font-semibold mb-4">{plan.saladsPerWeek}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
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

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 mb-6 ${plan.recommended
                      ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                      }`}
                  >
                    Get Started
                  </button>

                  {/* Features List */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">What's Included:</p>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${plan.recommended ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                          <Check className={`w-3 h-3 ${plan.recommended ? 'text-green-600' : 'text-gray-600'}`} />
                        </div>
                        <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { icon: <Shield className="w-8 h-8" />, title: '100% Organic', subtitle: 'Farm Fresh' },
            { icon: <Truck className="w-8 h-8" />, title: 'Free Delivery', subtitle: 'On Premium Plans' },
            { icon: <Clock className="w-8 h-8" />, title: 'Quick Service', subtitle: '2-3 Hours' },
            { icon: <Star className="w-8 h-8" />, title: '4.9/5 Rating', subtitle: '2000+ Reviews' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-xl mb-3">
                {item.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* FAQ or Extra Info */}
        <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-3xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black mb-4">Still Have Questions?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our customer support team is here to help you choose the perfect plan for your lifestyle.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
            Contact Support
          </button>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && selectedPlanData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                {selectedPlanData.icon}
                <h3 className="text-2xl font-black">{selectedPlanData.name} Plan</h3>
              </div>
              <p className="text-3xl font-black">₹{selectedPlanData.price}<span className="text-lg font-medium opacity-90">/month</span></p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="bg-green-50 rounded-2xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Your Plan Includes:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>{selectedPlanData.saladsPerWeek}</strong></span>
                  </li>
                  {selectedPlanData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModernFooter />
    </div>
  );
};

export default Membership;