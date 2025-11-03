import React from 'react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { Shield, Clock, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const ReturnPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-fade-in-up">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Return Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Easy Returns for Fresh Guarantee
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              We're committed to your satisfaction with our fresh, premium salads. Learn about our hassle-free return process.
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
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Introduction</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At Salad Karo, we take pride in delivering the freshest, highest-quality salads to your doorstep. 
                  However, we understand that sometimes you may need to return a product due to quality concerns or other issues.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This Return Policy outlines our commitment to customer satisfaction and the process for returning products 
                  that don't meet our high standards or your expectations.
                </p>
              </div>
            </section>

            {/* Return Eligibility */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Return Eligibility</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptable Returns</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Quality Issues</h4>
                          <p className="text-sm text-gray-600">Spoiled, wilted, or damaged items upon delivery</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Wrong Order</h4>
                          <p className="text-sm text-gray-600">Incorrect items delivered or missing products</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Delivery Issues</h4>
                          <p className="text-sm text-gray-600">Late delivery beyond promised time window</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Packaging Problems</h4>
                          <p className="text-sm text-gray-600">Damaged or contaminated packaging</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Return Process</h2>
                </div>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        1
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
                      <p className="text-sm text-gray-600">
                        Report the issue within 24 hours of delivery via phone, email, or our app
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        2
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification</h3>
                      <p className="text-sm text-gray-600">
                        Our team will verify the issue and approve the return request
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        3
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Resolution</h3>
                      <p className="text-sm text-gray-600">
                        Receive refund, replacement, or credit within 2-3 business days
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-semibold text-yellow-800 mb-2">Important Timeline</h4>
                        <p className="text-yellow-700">
                          Return requests must be initiated within <strong>24 hours</strong> of delivery. 
                          Due to the perishable nature of our products, we cannot accept returns after this period.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Rights */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Rights as a Customer</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Full Refund Guarantee</h4>
                      <p className="text-gray-700">100% money back for quality issues or incorrect orders</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Free Replacement</h4>
                      <p className="text-gray-700">Complimentary replacement for damaged or spoiled items</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Store Credit Option</h4>
                      <p className="text-gray-700">Flexible credit for future orders with bonus value</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">No Questions Asked</h4>
                      <p className="text-gray-700">Simple return process without complicated procedures</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12 animate-fade-in-up">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 md:p-10 text-white">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Need to Return Something?</h2>
                  <p className="text-xl text-green-100">Contact our customer support team - we're here to help!</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                    <p className="text-green-100 mb-3">Get help via email</p>
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
                    <p className="text-green-100 mb-3">Speak with our team</p>
                    <a 
                      href="tel:+911234567890" 
                      className="inline-block bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors"
                    >
                      +91 123-456-7890
                    </a>
                  </div>
                </div>
                
                <div className="text-center mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Support Hours</h4>
                  <p className="text-green-100">Monday - Sunday: 7:00 AM - 10:00 PM</p>
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

export default ReturnPolicy;