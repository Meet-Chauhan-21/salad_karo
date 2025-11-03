import React, { useEffect, useState } from 'react';
import { ArrowRight, Leaf, Heart, Star, Sparkles, Zap } from 'lucide-react';
import heroSalad from '../assets/hero-salad.jpg';
import { useOrderNavigation } from '../hooks/use-order-navigation';

const Hero = () => {
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [textIndex, setTextIndex] = useState(0);
  const healthyTexts = ["Healthy", "Fresh", "Tasty", "Nutritious"];
  const { handleOrderNow } = useOrderNavigation();

  useEffect(() => {
    // Generate random sparkle positions with slower regeneration
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const sparkleInterval = setInterval(generateSparkles, 6000); // Slower sparkle regeneration

    // Cycle through healthy texts with slower transitions
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % healthyTexts.length);
    }, 4000); // Slower text cycling

    return () => {
      clearInterval(sparkleInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 overflow-hidden">
      {/* Animated Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
        >
          <Sparkles className="w-4 h-4 text-accent/60" />
        </div>
      ))}

      {/* Morphing Background Shapes - Various Unique Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 animate-wave-motion"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 animate-liquid-motion" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-primary/5 animate-wave-motion" style={{animationDelay: '6s'}}></div>
        <div className="absolute top-60 left-1/2 w-28 h-28 bg-accent/8 animate-liquid-motion" style={{animationDelay: '9s'}}></div>
      </div>

      {/* Floating Background Elements - Various Unique Motions */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 animate-float opacity-20">
          <Leaf className="w-16 h-16 text-primary animate-gentle-pulse" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed opacity-20">
          <Heart className="w-12 h-12 text-accent animate-twinkle-stars" style={{animationDelay: '0.5s'}} />
        </div>
        <div className="absolute bottom-40 left-20 animate-float opacity-20">
          <Star className="w-10 h-10 text-primary-glow animate-twinkle-stars" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-delayed opacity-20">
          <Zap className="w-14 h-14 text-accent animate-prism-shift" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 animate-bounceInLeft">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full text-sm font-medium text-secondary-foreground animate-slide-in-top delay-100">
                <Leaf className="w-4 h-4 mr-2 text-primary animate-twinkle-stars" />
                Fresh • Healthy • Delivered Daily
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient animate-prism-shift">
                  {healthyTexts[textIndex]}, Fresh
                </span>
                <br />
                <span className="text-foreground animate-bounce-in-left" style={{animationDelay: '0.2s'}}>& Tasty –</span>
                <br />
                <span className="text-primary animate-typing-effect">Salad Karo!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed animate-slide-in-top" style={{animationDelay: '0.4s'}}>
                Discover our premium collection of fresh, nutritious salads made with locally sourced ingredients. 
                Start your healthy journey today with our expertly crafted recipes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-bounce-in-left" style={{animationDelay: '0.6s'}}>
              <button
                className="btn-hero group animate-gentle-pulse"
                onClick={handleOrderNow}
              >
                Start Your Healthy Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-button)] animate-bounce-in-right">
                View Menu
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 animate-slide-in-top" style={{animationDelay: '0.8s'}}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-gentle-pulse">1000+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-gentle-pulse" style={{animationDelay: '0.2s'}}>50+</div>
                <div className="text-sm text-muted-foreground">Healthy Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-gentle-pulse" style={{animationDelay: '0.4s'}}>99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-bounce-in-right">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-prism-shift"></div>
              
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-card to-secondary/30 rounded-3xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)] animate-liquid-motion">
                <img 
                  src={heroSalad}
                  alt="Fresh, colorful salad bowl - Salad Karo"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)] animate-slide-in-top">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent animate-twinkle-stars" style={{animationDelay: `${i * 0.2}s`}} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">4.9/5</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Premium Quality</div>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-6 right-6 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-[var(--shadow-button)] animate-gentle-pulse">
                  <div className="text-sm font-medium">Starting from</div>
                  <div className="text-2xl font-bold">₹199</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-[var(--shadow-soft)] animate-bounce-in-right">
                <Heart className="w-8 h-8 text-accent-foreground animate-gentle-pulse" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-glow rounded-full flex items-center justify-center shadow-[var(--shadow-soft)] animate-bounce-in-left">
                <Leaf className="w-6 h-6 text-primary-foreground animate-twinkle-stars" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="hsl(var(--card))" opacity="0.5"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;