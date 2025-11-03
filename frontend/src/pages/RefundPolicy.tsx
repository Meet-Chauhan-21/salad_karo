import React from 'react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { CreditCard, Clock, Phone, Mail, CheckCircle, AlertTriangle, DollarSign, Zap } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-fade-in-up">
              <CreditCard className="w-5 h-5" />
              <span className="font-semibold">Refund Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Quick & Fair Refund Process
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Transparent refund policies designed to ensure your satisfaction and peace of mind with every order.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Refund Policy Overview</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At Salad Karo, your satisfaction is our priority. We offer fair and transparent refund policies 
                  to ensure you have confidence in every order you place with us.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This policy outlines when refunds are available, the process for requesting them, 
                  and the timeframes you can expect for processing.
                </p>
              </div>
            </section>

            {/* Refund Eligibility */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">When You Can Get a Refund</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Immediate Refunds</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Spoiled or rotten ingredients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Wrong order delivered</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Missing items from order</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Delivery never arrived</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Case-by-Case Review</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Late delivery (over 2 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Packaging quality issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Temperature concerns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Taste or quality dissatisfaction</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-semibold text-red-800 mb-2">No Refund Conditions</h4>
                      <p className="text-red-700">
                        Refunds are not available for orders consumed more than 50% or returned after 24 hours of delivery. 
                        Change of mind after consumption is not eligible for refunds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Process */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How to Request a Refund</h2>
                </div>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        1
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Report Issue</h4>
                      <p className="text-sm text-gray-600">Contact us within 24 hours</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        2
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Provide Details</h4>
                      <p className="text-sm text-gray-600">Share order info & photos</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        3
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Review Process</h4>
                      <p className="text-sm text-gray-600">We assess your request</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        4
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Get Refund</h4>
                      <p className="text-sm text-gray-600">Money back in 2-5 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Timeframes */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Refund Processing Time</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Credit/Debit Cards</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-2">2-5 Days</p>
                    <p className="text-sm text-gray-600">Bank processing time varies</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl text-center">
                    <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Wallets</h3>
                    <p className="text-2xl font-bold text-purple-600 mb-2">1-2 Days</p>
                    <p className="text-sm text-gray-600">PayTM, Google Pay, PhonePe</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Store Credit</h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">Instant</p>
                    <p className="text-sm text-gray-600">+ 10% bonus value</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Types */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Refund Options</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Full Monetary Refund</h4>
                      <p className="text-gray-700 mb-3">
                        Complete refund to your original payment method. Processing time depends on your bank or payment provider.
                      </p>
                      <div className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                        Best for: Quality issues, wrong orders
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Store Credit (Recommended)</h4>
                      <p className="text-gray-700 mb-3">
                        Instant credit to your Salad Karo account with 10% bonus value. Use for future orders with no expiry.
                      </p>
                      <div className="text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-block">
                        Best for: Future orders, faster processing
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Free Replacement</h4>
                      <p className="text-gray-700 mb-3">
                        New order of the same items delivered free of charge. Available for quality issues within 24 hours.
                      </p>
                      <div className="text-sm text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block">
                        Best for: Still want the same items
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 md:p-10 text-white">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a Refund?</h2>
                  <p className="text-xl text-green-100">Contact our support team for fast assistance</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                    <p className="text-green-100 mb-3">Quick refund processing</p>
                    <a 
                      href="mailto:support@saladkaro.com" 
                      className="inline-block bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors"
                    >
                      support@saladkaro.com
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                    <p className="text-green-100 mb-3">Instant assistance</p>
                    <a 
                      href="tel:+911234567890" 
                      className="inline-block bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors"
                    >
                      +91 123-456-7890
                    </a>
                  </div>
                </div>
                
                <div className="text-center mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Refund Support Hours</h4>
                  <p className="text-green-100">Monday - Sunday: 7:00 AM - 10:00 PM</p>
                  <p className="text-sm text-green-200 mt-2">Average response time: 30 minutes</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default RefundPolicy;