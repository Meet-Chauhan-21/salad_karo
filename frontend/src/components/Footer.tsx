import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-foreground to-primary text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary-glow rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Salad Karo</h3>
            </div>
            <p className="text-background/80 leading-relaxed">
              Your trusted partner for healthy, fresh, and delicious salads delivered right to your doorstep. 
              We believe in promoting a healthy lifestyle through nutritious meals.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-background/10 backdrop-blur-sm rounded-full hover:bg-accent hover:text-foreground transition-[var(--transition-smooth)]">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 bg-background/10 backdrop-blur-sm rounded-full hover:bg-accent hover:text-foreground transition-[var(--transition-smooth)]">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="p-2 bg-background/10 backdrop-blur-sm rounded-full hover:bg-accent hover:text-foreground transition-[var(--transition-smooth)]">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-background/80 hover:text-accent transition-[var(--transition-smooth)]">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="text-background/80 hover:text-accent transition-[var(--transition-smooth)]">
                  Shop
                </a>
              </li>
              <li>
                <a href="#membership" className="text-background/80 hover:text-accent transition-[var(--transition-smooth)]">
                  Membership
                </a>
              </li>
              <li>
                <a href="#about" className="text-background/80 hover:text-accent transition-[var(--transition-smooth)]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-background/80 hover:text-accent transition-[var(--transition-smooth)]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Our Services</h4>
            <ul className="space-y-3">
              <li className="text-background/80">Fresh Salad Delivery</li>
              <li className="text-background/80">Monthly Membership</li>
              <li className="text-background/80">Custom Meal Plans</li>
              <li className="text-background/80">Corporate Catering</li>
              <li className="text-background/80">Event Catering</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-background/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-background/80">hello@saladkaro.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <span className="text-background/80">
                  123 Health Street,<br />
                  Green Valley, Mumbai 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              © 2024 Salad Karo. All rights reserved. Made with ❤️ for healthy living.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-background/60 hover:text-accent transition-[var(--transition-smooth)]">
                Privacy Policy
              </a>
              <a href="#terms" className="text-background/60 hover:text-accent transition-[var(--transition-smooth)]">
                Terms of Service
              </a>
              <a href="#cookies" className="text-background/60 hover:text-accent transition-[var(--transition-smooth)]">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;