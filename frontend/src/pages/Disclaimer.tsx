import React from 'react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { AlertTriangle, Scale, Shield, FileText, Phone, Mail, MapPin, Calendar, CheckCircle, Info, ExternalLink } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-orange-600 via-red-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Scale className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Disclaimer
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Important legal information and limitations regarding the use of Salad Karo services.
          </p>
          <div className="mt-8 flex justify-center items-center gap-2 text-orange-100">
            <Calendar className="w-5 h-5" />
            <span>Last Updated: October 2024</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* General Disclaimer */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 rounded-full p-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">General Disclaimer</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              The information contained on this website and our services is for general information purposes only. While we endeavor to keep the information up-to-date and correct, Salad Karo makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics for any purpose.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Important Notice</span>
              </div>
              <p className="text-yellow-700">
                Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage arising from loss of data or profits arising out of or in connection with the use of this website.
              </p>
            </div>
          </div>
        </div>

        {/* Service Availability */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 rounded-full p-2">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Service Availability & Quality</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Availability</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Services are subject to availability and may be temporarily interrupted for maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Delivery times are estimates and may vary due to weather, traffic, or other factors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>We reserve the right to modify or discontinue services without prior notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Website functionality may vary across different devices and browsers</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Food Quality & Safety</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>While we maintain high standards, food quality can be subjective and may vary</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Nutritional information is approximate and may vary based on preparation methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Customers with allergies must inform us, though we cannot guarantee allergen-free environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Expiry dates and freshness depend on proper storage and handling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Health & Dietary Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 rounded-full p-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Health & Dietary Information</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">Medical Disclaimer</span>
              </div>
              <p className="text-red-700">
                The information provided about nutrition, health benefits, and dietary suitability is for general informational purposes only and should not be considered as medical advice.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Important Considerations:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="bg-red-100 rounded-full p-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Consult Healthcare Professionals:</span> Always consult with a qualified healthcare provider before making significant dietary changes
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-100 rounded-full p-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Individual Needs:</span> Nutritional requirements vary by individual based on age, health status, and lifestyle
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-100 rounded-full p-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Allergies & Intolerances:</span> We cannot guarantee that our products are free from allergens or suitable for all dietary restrictions
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-100 rounded-full p-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Results May Vary:</span> Health outcomes and experiences may differ from person to person
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 rounded-full p-2">
              <Scale className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Limitation of Liability</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              To the maximum extent permitted by applicable law, Salad Karo, its directors, employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Financial Damages</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Loss of profits or revenue</li>
                  <li>• Loss of business or contracts</li>
                  <li>• Loss of anticipated savings</li>
                  <li>• Loss of data or information</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Other Damages</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Personal injury or property damage</li>
                  <li>• Wasted management time</li>
                  <li>• Loss of goodwill or reputation</li>
                  <li>• Any other pecuniary loss</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-800">
                <strong>Maximum Liability:</strong> Our total liability to you for all damages shall not exceed the amount paid by you for the specific service that gave rise to the claim.
              </p>
            </div>
          </div>
        </div>

        {/* Third-Party Links */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 rounded-full p-2">
              <ExternalLink className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Third-Party Links & Services</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by Salad Karo. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Third-Party Disclaimers:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                  <span>Payment processors and their security measures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                  <span>Delivery partners and their service quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                  <span>Social media platforms and their policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                  <span>Analytics and tracking services</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-indigo-800">
                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 rounded-full p-2">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Intellectual Property</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              All content, features, and functionality on our website, including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software, are the exclusive property of Salad Karo or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Usage Restrictions:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>You may not reproduce, distribute, or create derivative works</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Commercial use of our content is prohibited without written permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Our trademarks and logos may not be used without authorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Reverse engineering of our systems is strictly prohibited</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 rounded-full p-2">
              <Scale className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Governing Law & Jurisdiction</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              This disclaimer and your use of our website and services shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Jurisdiction</h3>
              <p className="text-yellow-700">
                Any legal action or proceeding arising under this disclaimer will be brought exclusively in the courts of Mumbai, Maharashtra, India, and you hereby consent to personal jurisdiction and venue therein.
              </p>
            </div>
            
            <p>
              If any provision of this disclaimer is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the disclaimer will otherwise remain in full force and effect.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Legal Questions?</h2>
            <p className="text-orange-100">Contact us for any legal or disclaimer-related inquiries</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-orange-100">legal@saladkaro.com</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-orange-100">+91 98765 43210</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-orange-100">Mumbai, Maharashtra</p>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <p className="text-orange-100">
              We typically respond to legal inquiries within 5-7 business days
            </p>
          </div>
        </div>

        {/* Final Notice */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 rounded-full p-2">
              <Info className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Updates to This Disclaimer</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We reserve the right to update or change this disclaimer at any time without prior notice. Your continued use of our website and services following the posting of any changes constitutes acceptance of those changes.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Effective Date:</strong> This disclaimer is effective as of October 2024 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
              </p>
            </div>
          </div>
        </div>
        
      </div>

      <ModernFooter />
    </div>
  );
};

export default Disclaimer;