import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Percent, Truck, Star, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import heroSalad from '../assets/hero-salad.jpg';
import mexicanSalad from '../assets/mexican-salad.jpg';
import sproutSalad from '../assets/sprout-salad.jpg';
import { useOrderNavigation } from '../hooks/use-order-navigation';
import Autoplay from "embla-carousel-autoplay"

// Mock Data for Banners
const BANNERS = [
  {
    id: 1,
    image: heroSalad,
    title: 'Signature Greek Salad',
    subtitle: 'Fresh Feta & Olives',
    calories: '320 kcal',
  },
  {
    id: 2,
    image: mexicanSalad,
    title: 'Avocado Power Bowl',
    subtitle: 'Superfood Charged',
    calories: '450 kcal',
  },
  {
    id: 3,
    image: sproutSalad,
    title: 'Immunity Sprout Mix',
    subtitle: 'Protein Packed',
    calories: '380 kcal',
  },
];

// Mock Data for Offers
const OFFERS = [
  {
    id: 1,
    title: '50% OFF',
    description: 'On your 1st order',
    code: 'TRYNEW',
    icon: <Percent className="w-4 h-4 text-white" />,
    color: 'bg-orange-500',
  },
  {
    id: 2,
    title: 'Free Delivery',
    description: 'Orders above ₹499',
    code: 'FREEDEL',
    icon: <Truck className="w-4 h-4 text-white" />,
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Free Drink',
    description: 'With Premium Plan',
    code: 'FREESIP',
    icon: <Clock className="w-4 h-4 text-white" />,
    color: 'bg-purple-500',
  },
];

const ModernHero = () => {
  const { handleOrderNow } = useOrderNavigation();
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="relative min-h-[min(50vh,400px)] lg:min-h-[min(90vh,800px)] bg-gradient-to-b from-green-50/50 via-white to-green-50/30 pt-4 pb-0 lg:pb-0 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-2 pb-6 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT COLUMN: Content & Offers - HIDDEN ON MOBILE */}
          <div className="hidden lg:flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 text-center lg:text-left">

            {/* Trust Label */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 animate-fade-in">
              <Badge variant="secondary" className="px-3 py-1 bg-green-100/80 text-green-700 hover:bg-green-100 border-green-200 backdrop-blur-sm shadow-sm">
                <Star className="w-3.5 h-3.5 mr-1 fill-green-700" />
                #1 Healthy Food Delivery in Town
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Freshness You Can{' '}
              <span className="relative inline-block text-green-600">
                Taste
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              , Delivered.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light hidden lg:block">
              Experience the crunch of locally sourced, premium organic salads.
              Healthy eating just got delicious.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleOrderNow}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-12 sm:h-14 text-lg shadow-lg shadow-green-600/20 transition-transform hover:scale-105"
              >
                Order Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 sm:h-14 text-lg border-2 hover:bg-gray-50 text-gray-700 bg-transparent"
                onClick={() => window.location.href = '/menu'}
              >
                View Menu
              </Button>
            </div>

            {/* DESKTOP OFFERS (Grid Layout) */}
            <div className="hidden lg:grid grid-cols-3 gap-4 mt-4">
              {OFFERS.map((offer) => (
                <Card key={offer.id} className="p-4 border-green-100 bg-white/60 backdrop-blur-sm hover:shadow-md transition-shadow cursor-default group">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${offer.color}`}>
                      {offer.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{offer.title}</h3>
                      <p className="text-xs text-muted-foreground">{offer.description}</p>
                      <div className="mt-1 inline-block bg-gray-100 px-2 py-0.5 rounded text-[10px] font-mono text-gray-600 border border-gray-200">
                        {offer.code}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex justify-center lg:justify-start gap-8 pt-4 border-t border-gray-100 mt-2">
              <div>
                <p className="text-2xl font-bold text-gray-900">30+</p>
                <p className="text-sm text-gray-500">Mins Delivery</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">10k+</p>
                <p className="text-sm text-gray-500">Happy Eaters</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-500">App Rating</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Carousel Banner - ONLY THIS VISIBLE ON MOBILE */}
          <div className="order-1 lg:order-2 relative w-full h-full lg:h-auto max-w-lg mx-auto lg:max-w-none">
            {/* Decorative blob behind carousel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-100 to-yellow-100 rounded-full blur-3xl -z-10 opacity-60"></div>

            <Carousel
              className="w-full relative group"
              opts={{ loop: true }}
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              setApi={setApi}
            >
              <CarouselContent>
                {BANNERS.map((banner) => (
                  <CarouselItem key={banner.id} className="cursor-pointer" onClick={handleOrderNow}>
                    <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.02]">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Banner Content */}
                      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 text-white">
                        <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 border-none mb-3">
                          Top Scorer
                        </Badge>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-1">{banner.title}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-200 font-medium">{banner.subtitle}</p>
                          <span className="text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                            {banner.calories}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/80 hover:bg-white border-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex" />
              <CarouselNext className="right-4 bg-white/80 hover:bg-white border-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex" />
            </Carousel>

            {/* Indicator Dots - Mobile Only */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {BANNERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index 
                      ? 'w-8 bg-green-600' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Float Offer - REMOVED ON MOBILE AS PER REQUEST */}
            <div className="hidden mt-6 -mx-4 px-4">
              {/* Hidden content */}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;