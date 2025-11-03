import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Heart,
  Leaf
} from 'lucide-react';

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'Menu', href: '/menu' },
      { name: 'About Us', href: '/about' },
      { name: 'Subscription Plans', href: '/plans' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' }
    ],
    services: [
      { name: 'Fresh Salad Delivery', href: '/delivery' },
      { name: 'Meal Plans', href: '/meal-plans' },
      { name: 'Corporate Catering', href: '/catering' },
      { name: 'Event Catering', href: '/events' },
      { name: 'Nutritionist Consultation', href: '/nutrition' },
      { name: 'Diet Programs', href: '/diet-programs' }
    ],
    support: [
      { name: 'Customer Support', href: '/support' },
      { name: 'Track Your Order', href: '/track' },
      { name: 'Delivery Info', href: '/delivery-info' },
      { name: 'Returns & Refunds', href: '/returns' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      href: '#', 
      label: 'X (Twitter)', 
      color: 'hover:text-gray-200' 
    },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-green-400 rounded-full blur-2xl sm:blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-blue-400 rounded-full blur-2xl sm:blur-3xl animate-float-slow-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 bg-yellow-400 rounded-full blur-xl sm:blur-2xl animate-float-slower"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="pt-12 sm:pt-16 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Salad Karo</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Fresh Bites</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                India's leading healthy food delivery service. We're committed to providing fresh, 
                nutritious, and delicious salads that fuel your healthy lifestyle.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <span className="text-sm">123 Health Street, Mumbai, Maharashtra 400001</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-green-400" />
                  <span className="text-sm">hello@saladkaro.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Mon-Sun: 8:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {footerSections.quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Our Services</h4>
              <ul className="space-y-3">
                {footerSections.services.map((service) => (
                  <li key={service.name}>
                    <a 
                      href={service.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Social */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <ul className="space-y-3">
                {footerSections.support.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div className="pt-4">
                <h5 className="text-md font-semibold text-white mb-4">Follow Us</h5>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section - REMOVED */}

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© {currentYear} Salad Karo. Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
              <span>for healthy living.</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-green-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-green-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-green-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="pb-8">
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {[
              'ISO 9001 Certified',
              'FSSAI Licensed',
              'Organic Certified',
              'Nutritionist Approved'
            ].map((cert) => (
              <div key={cert} className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;