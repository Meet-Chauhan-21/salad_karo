import React from 'react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { Shield, Eye, Lock, Database, Phone, Mail, MapPin, Calendar, Users, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-600 via-green-700 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Your privacy matters to us. Learn how we protect and handle your personal information.
          </p>
          <div className="mt-8 flex justify-center items-center gap-2 text-green-100">
            <Calendar className="w-5 h-5" />
            <span>Last Updated: October 2024</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 rounded-full p-2">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Welcome to Salad Karo ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p>
              By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you disagree with any part of this policy, please do not access our website or use our services.
            </p>
          </div>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 rounded-full p-2">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Name, email address, and phone number when you create an account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Delivery address and payment information for order processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Dietary preferences and food allergies for personalized service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Communication preferences and feedback</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Usage Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Website browsing patterns and page views</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Order history and purchase behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Device information and IP addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Cookies and similar tracking technologies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 rounded-full p-2">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Service Delivery</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Process and fulfill your orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Provide customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Send order confirmations and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Manage your account and preferences</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Business Operations</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Improve our website and services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Analyze usage patterns and trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Send promotional communications (with consent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 rounded-full p-2">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Information Sharing and Disclosure</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">We Do Not Sell Your Personal Information</span>
              </div>
              <p className="text-red-700">We never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">We may share information with:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Service Providers:</span> Delivery partners, payment processors, and technology providers who help us operate our business
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Legal Requirements:</span> When required by law, court order, or to protect our rights and safety
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets (with notice to you)
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 rounded-full p-2">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Technical Safeguards</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• SSL encryption for data transmission</li>
                  <li>• Secure servers and databases</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Access controls and authentication</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Operational Safeguards</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Employee training and background checks</li>
                  <li>• Limited access on a need-to-know basis</li>
                  <li>• Regular security awareness programs</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>Please note:</strong> While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 rounded-full p-2">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your Privacy Rights</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              You have certain rights regarding your personal information. These may include:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Access:</span>
                    <span className="text-gray-600"> Request copies of your personal information</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Correction:</span>
                    <span className="text-gray-600"> Update or correct inaccurate information</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Deletion:</span>
                    <span className="text-gray-600"> Request deletion of your personal information</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Portability:</span>
                    <span className="text-gray-600"> Obtain a copy of your data in a portable format</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Opt-out:</span>
                    <span className="text-gray-600"> Unsubscribe from marketing communications</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Restriction:</span>
                    <span className="text-gray-600"> Limit how we process your information</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-blue-800">
                To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-green-600 to-orange-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Privacy Questions?</h2>
            <p className="text-green-100">We're here to help with any privacy-related concerns</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-green-100">privacy@saladkaro.com</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-green-100">+91 98765 43210</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-green-100">Mumbai, Maharashtra</p>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <p className="text-green-100">
              We typically respond to privacy inquiries within 24-48 hours
            </p>
          </div>
        </div>

        {/* Updates to Policy */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 rounded-full p-2">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Changes to This Policy</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>Update the "Last Updated" date at the top of this policy</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>Notify you via email or prominent website notice for significant changes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>Provide you with the opportunity to review the updated policy</span>
              </li>
            </ul>
            
            <p>
              Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </div>
        </div>
        
      </div>

      <ModernFooter />
    </div>
  );
};

export default PrivacyPolicy;
