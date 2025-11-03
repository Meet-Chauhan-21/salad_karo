import React from 'react';
import { 
  Clock, 
  MapPin, 
  Truck, 
  Navigation, 
  Utensils, 
  Moon,
  CheckCircle,
  Info
} from 'lucide-react';

const DeliveryTimings = () => {
  const deliveryZones = [
    { zone: 'Zone 1', distance: '0-5 km', charge: 'Free', color: 'bg-green-500' },
    { zone: 'Zone 2', distance: '5-10 km', charge: '₹25', color: 'bg-yellow-500' },
    { zone: 'Zone 3', distance: '10-15 km', charge: '₹45', color: 'bg-orange-500' },
    { zone: 'Zone 4', distance: '15+ km', charge: '₹65', color: 'bg-red-500' }
  ];

  const deliverySlots = [
    {
      type: 'lunch',
      icon: Utensils,
      title: 'Lunch Delivery',
      time: '11:00 AM - 2:00 PM',
      description: 'Perfect for office lunch or home dining',
      features: ['Fresh preparation', 'Hot delivery', 'Office-friendly packaging'],
      color: 'bg-orange-500'
    },
    {
      type: 'dinner',
      icon: Moon,
      title: 'Dinner Delivery',
      time: '6:00 PM - 10:00 PM',
      description: 'Healthy dinner delivered to your doorstep',
      features: ['Family portions', 'Nutritious meals', 'Late evening service'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-blue-100 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Truck className="w-4 h-4 mr-2 animate-bounce" />
            Delivery Information
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Fast & <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Reliable Delivery</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get your fresh salads delivered right on time with our flexible delivery options and transparent pricing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Delivery Zones */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Delivery Zones</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                {deliveryZones.map((zone, index) => (
                  <div 
                    key={zone.zone}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 ${zone.color} rounded-full`}></div>
                      <div>
                        <div className="font-semibold text-gray-900">{zone.zone}</div>
                        <div className="text-sm text-gray-600">{zone.distance}</div>
                      </div>
                    </div>
                    <div className={`font-bold ${zone.charge === 'Free' ? 'text-green-600' : 'text-gray-900'}`}>
                      {zone.charge}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-blue-900 mb-1">Free Delivery Zone</div>
                    <div className="text-sm text-blue-700">
                      Orders above ₹499 get free delivery in Zone 2 & 3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Timings */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {deliverySlots.map((slot, index) => {
                const IconComponent = slot.icon;
                return (
                  <div 
                    key={slot.type}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 ${slot.color} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{slot.title}</h3>
                        <div className="text-sm text-gray-600">{slot.time}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{slot.description}</p>
                    
                    <div className="space-y-3">
                      {slot.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delivery Process */}
        <div className="mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold text-center mb-8">How Delivery Works</h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  icon: Clock,
                  title: 'Order Placed',
                  description: 'Your order is confirmed and preparation begins'
                },
                {
                  step: '2',
                  icon: Utensils,
                  title: 'Fresh Preparation',
                  description: 'Salads prepared fresh with quality ingredients'
                },
                {
                  step: '3',
                  icon: Truck,
                  title: 'Out for Delivery',
                  description: 'Your order is packed and on the way'
                },
                {
                  step: '4',
                  icon: CheckCircle,
                  title: 'Delivered',
                  description: 'Fresh salads delivered to your doorstep'
                }
              ].map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={step.step}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                        {step.step}
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-white/80">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Tracking Info */}
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Navigation className="w-6 h-6 text-green-600 animate-spin-slow" />
              <h3 className="text-xl font-bold text-gray-900">Real-Time Tracking</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Track your order in real-time from preparation to delivery with SMS updates and live location sharing
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">📱 SMS Updates</span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">🗺️ Live Location</span>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">📞 Driver Contact</span>
              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">⏰ ETA Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryTimings;