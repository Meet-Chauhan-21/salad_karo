import React from 'react';
import { Crown, Leaf, Clock, Truck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnhancedSubscriptionPacks from '../components/EnhancedSubscriptionPacks';
import BackToTopButton from '../components/BackToTopButton';

const Membership = () => {
  const benefits = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Fresh Daily',
      description: 'Salads prepared fresh every morning with organic ingredients'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Delivery',
      description: 'Contactless delivery to your doorstep at your preferred time'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Flexible Schedule',
      description: 'Change your delivery schedule anytime through our app'
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: 'Premium Quality',
      description: 'Only the finest ingredients sourced from trusted farmers'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Subscription Packs */}
      <EnhancedSubscriptionPacks />

      {/* Benefits Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Membership?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                text: "Salad Karo has transformed my eating habits. Fresh, delicious, and convenient!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                text: "The monthly plan is perfect for my busy schedule. Healthy eating made easy!",
                rating: 5
              },
              {
                name: "Anita Patel",
                text: "Amazing variety and quality. My family loves the different salad options!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border shadow-[var(--shadow-soft)]">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Membership;