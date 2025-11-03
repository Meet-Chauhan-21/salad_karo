import React, { useState } from 'react';
import { Mail, Phone, Gift, Send, CheckCircle } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-500 to-blue-600">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Family! 🎉</h3>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for subscribing! Check your email for exclusive deals and healthy recipes.
              </p>
              <div className="bg-green-50 rounded-2xl p-6">
                <p className="text-green-800 font-medium">
                  🎁 Your 20% welcome discount will arrive in your inbox shortly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 via-green-500 to-blue-600 relative overflow-hidden">
      
      {/* Background Animations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl animate-float-slow-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-float-slower"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header */}
          <div className="mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6">
              <Gift className="w-4 h-4 mr-2 animate-bounce" />
              Exclusive Offers & Updates
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">20% Off</span> Your First Order
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Subscribe to our newsletter for exclusive deals, healthy recipes, and nutrition tips delivered straight to your inbox
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                    placeholder="Phone number (optional)"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email}
                className="group w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
              {[
                { icon: '🎁', title: 'Exclusive Deals', description: '20% off first order + special discounts' },
                { icon: '📧', title: 'Healthy Recipes', description: 'Weekly recipes and nutrition tips' },
                { icon: '🏆', title: 'Early Access', description: 'First to know about new menu items' }
              ].map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 mt-6">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime. No spam, just healthy goodness! 🌱
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-white/80 mb-4">Join 5,000+ health enthusiasts already subscribed</p>
            <div className="flex justify-center items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  ⭐
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;