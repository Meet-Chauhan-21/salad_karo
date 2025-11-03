import React, { useState, useEffect, useRef } from 'react';
import { Heart, Users, Leaf, Award, MapPin, Phone, Mail, Star, CheckCircle, TrendingUp, Clock, Target, Globe } from 'lucide-react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import BackToTopButton from '../components/BackToTopButton';

const About = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = [50000, 100000, 25, 4.9];
    const durations = [2000, 2000, 1500, 1500]; // Animation duration in ms
    
    targets.forEach((target, index) => {
      let start = 0;
      const increment = target / (durations[index] / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = start;
          return newCounters;
        });
      }, 16);
    });
  };

  const formatCounter = (value, index) => {
    if (index === 0) return Math.floor(value / 1000) + 'K+';
    if (index === 1) return Math.floor(value / 1000) + 'K+';
    if (index === 2) return Math.floor(value) + '+';
    if (index === 3) return value.toFixed(1);
    return Math.floor(value);
  };
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health First",
      description: "We believe that healthy eating should be accessible, delicious, and convenient for everyone.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Fresh & Organic",
      description: "We source only the freshest organic ingredients from trusted local farmers and suppliers.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building a community of health-conscious individuals who support each other's wellness journey.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Excellence",
      description: "Committed to delivering the highest quality salads with rigorous quality control standards.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const team = [
    {
      name: "Amit Sharma",
      role: "Founder & CEO",
      description: "Nutrition expert with 15+ years experience in healthy food industry. Passionate about making healthy eating accessible to all.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      expertise: ["Nutrition Science", "Business Strategy", "Sustainable Farming"]
    },
    {
      name: "Priya Patel",
      role: "Head Chef",
      description: "Award-winning chef specializing in healthy and innovative salad recipes. Creates magic with fresh ingredients.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b69f8e73?w=400&h=400&fit=crop&crop=face",
      expertise: ["Recipe Development", "Food Safety", "Culinary Arts"]
    },
    {
      name: "Rajesh Kumar",
      role: "Operations Director",
      description: "Ensures fresh delivery and maintains our high quality standards across all locations with precision.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      expertise: ["Supply Chain", "Quality Control", "Logistics"]
    }
  ];

  const stats = [
    { 
      number: "50K+", 
      label: "Happy Customers",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    { 
      number: "100K+", 
      label: "Salads Delivered",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-green-500 to-green-600"
    },
    { 
      number: "25+", 
      label: "Cities Served",
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
    { 
      number: "4.9", 
      label: "Average Rating",
      icon: <Star className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started with a vision to revolutionize healthy eating in India",
      icon: <Target className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description: "Reached our first milestone of 1000 satisfied customers",
      icon: <Users className="w-6 h-6" />
    },
    {
      year: "2022",
      title: "Multi-City Expansion",
      description: "Expanded to 10+ cities across India with consistent quality",
      icon: <Globe className="w-6 h-6" />
    },
    {
      year: "2023",
      title: "Sustainability Focus",
      description: "Launched eco-friendly packaging and farm partnerships",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Premium Experience",
      description: "Introduced subscription plans and premium salad varieties",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const features = [
    {
      title: "Farm to Table",
      description: "Direct sourcing from organic farms ensuring maximum freshness",
      icon: <Leaf className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
    },
    {
      title: "Expert Nutritionists",
      description: "Every salad is crafted by certified nutritionists for optimal health",
      icon: <Users className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality checks at every step from preparation to delivery",
      icon: <CheckCircle className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-60 h-60 bg-yellow-200/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-green-300/20 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-green-700 shadow-lg mb-8 animate-fade-in-up">
              <Leaf className="w-4 h-4 mr-2" />
              About Our Journey
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Revolutionizing <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Healthy Eating</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              We're on a mission to make healthy eating simple, accessible, and delightful for everyone. 
              Since 2020, we've been India's trusted partner in nutritious living.
            </p>


          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card/30" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:rotate-1">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-125 transition-all duration-500 group-hover:rotate-12`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-green-600">
                    {hasAnimated ? formatCounter(counters[index], index) : stat.number}
                  </div>
                  <div className="text-muted-foreground transition-colors duration-300 group-hover:text-gray-700">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="group bg-card p-6 rounded-2xl border border-border shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-green-50 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/0 to-green-600/0 group-hover:from-green-400/20 group-hover:to-green-600/20 transition-all duration-500"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-green-600">{member.name}</h3>
                <p className="text-primary font-medium mb-3 transition-all duration-300 group-hover:text-green-700 group-hover:scale-105">{member.role}</p>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-gray-700">{member.description}</p>
                
                {/* Hover overlay effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-100/0 to-green-200/0 group-hover:from-green-100/30 group-hover:to-green-200/20 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-br from-green-50/50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Get In Touch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center p-8 bg-white rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 animate-fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 transition-colors duration-300 group-hover:text-blue-600">Visit Us</h3>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-gray-700">123 Health Street, Green Valley, Mumbai - 400001</p>
                
                {/* Hover pulse effect */}
                <div className="absolute inset-0 rounded-2xl bg-blue-100/0 group-hover:bg-blue-100/20 transition-all duration-500 pointer-events-none"></div>
              </div>
              
              <div className="group text-center p-8 bg-white rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-green-50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 transition-colors duration-300 group-hover:text-green-600">Call Us</h3>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-gray-700 group-hover:font-medium">+91 98765 43210</p>
                
                {/* Hover pulse effect */}
                <div className="absolute inset-0 rounded-2xl bg-green-100/0 group-hover:bg-green-100/20 transition-all duration-500 pointer-events-none"></div>
              </div>
              
              <div className="group text-center p-8 bg-white rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 transition-colors duration-300 group-hover:text-purple-600">Email Us</h3>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-gray-700 group-hover:font-medium">hello@saladkaro.com</p>
                
                {/* Hover pulse effect */}
                <div className="absolute inset-0 rounded-2xl bg-purple-100/0 group-hover:bg-purple-100/20 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModernFooter />
      <BackToTopButton />
    </div>
  );
};

export default About;