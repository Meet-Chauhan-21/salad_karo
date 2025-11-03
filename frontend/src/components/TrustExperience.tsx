import React, { useState, useEffect, useRef } from 'react';
import { Users, ChefHat, Award, TrendingUp } from 'lucide-react';

const TrustExperience = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    recipes: 0,
    experience: 0,
    satisfaction: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const finalValues = {
    customers: 1000,
    recipes: 50,
    experience: 5,
    satisfaction: 99
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animated counters
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        customers: Math.floor(finalValues.customers * progress),
        recipes: Math.floor(finalValues.recipes * progress),
        experience: Math.floor(finalValues.experience * progress),
        satisfaction: Math.floor(finalValues.satisfaction * progress)
      });

      if (currentStep >= steps) {
        setCounters(finalValues);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      icon: Users,
      value: counters.customers,
      suffix: '+',
      label: 'Happy Customers',
      description: 'Satisfied customers across India',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: ChefHat,
      value: counters.recipes,
      suffix: '+',
      label: 'Unique Recipes',
      description: 'Carefully crafted salad combinations',
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingUp,
      value: counters.experience,
      suffix: '+',
      label: 'Years Experience',
      description: 'In healthy food delivery',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      value: counters.satisfaction,
      suffix: '%',
      label: 'Satisfaction Rate',
      description: 'Customer happiness guarantee',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-green-400 rounded-full blur-3xl animate-float-slow-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl animate-float-slower"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6">
            <Award className="w-4 h-4 mr-2 text-yellow-400" />
            Trust & Experience
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Numbers That <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Speak For Us</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Our commitment to quality and customer satisfaction is reflected in these achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon Container */}
                <div className={`w-20 h-20 ${stat.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110 hover:rotate-3`}>
                  <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>
                  <p className="text-white/70 text-sm">{stat.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 ${stat.color} rounded-full transition-all duration-2000 ease-out`}
                    style={{ 
                      width: isVisible ? '100%' : '0%',
                      transitionDelay: `${index * 0.2}s`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center animate-fade-in-up">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Trusted by Health Enthusiasts Across India
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Join our growing community of health-conscious individuals who have made Salad Karo their go-to choice for nutritious, delicious meals
            </p>
            
            {/* Achievement Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'ISO Certified', subtitle: 'Quality Assurance' },
                { title: 'Organic Certified', subtitle: 'Fresh Ingredients' },
                { title: 'Health Approved', subtitle: 'Nutritionist Verified' }
              ].map((badge, index) => (
                <div 
                  key={badge.title}
                  className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{badge.title}</h4>
                  <p className="text-white/70 text-sm">{badge.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustExperience;