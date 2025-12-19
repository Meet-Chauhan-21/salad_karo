import React, { useState } from 'react';
import { Leaf, Heart, Star, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrderHistory } from '../contexts/OrderHistoryContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import QuickOrderTopBar from '../components/QuickOrderTopBar';
import { useOrderNavigation } from '../hooks/use-order-navigation';
import AdminAccessButton from '../components/AdminAccessButton';
import { useNavigate } from 'react-router-dom';
import GoogleInfoModal from '../components/GoogleInfoModal';

const EnhancedCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const { user, googleRegister } = useAuth();
  const { handleOrderNow } = useOrderNavigation();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [attemptedCheckout, setAttemptedCheckout] = useState(false);

  const handleProductClick = (product: any) => {
    navigate(`/salad/${product.id}`, { state: { product } });
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateDelivery = () => {
    return calculateSubtotal() > 500 ? 0 : 50; // Free delivery above ₹500
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDelivery();
  };

  const handleCheckout = async () => {
    if (!user?.email) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    // Check if profile is complete
    console.log('User data:', user);
    console.log('Phone:', user.phone, 'City:', user.city, 'Address:', user.address);

    const isProfileIncomplete = !user.phone || !user.city || !user.address ||
      user.phone === '' || user.city === '' || user.address === '';

    if (isProfileIncomplete) {
      console.log('Profile incomplete, showing modal');
      setAttemptedCheckout(true);
      setShowProfileModal(true);
      return;
    }

    console.log('Profile complete, proceeding with checkout');

    try {
      // Prepare order data
      const orderData = {
        userEmail: user.email,
        items: cart.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: calculateSubtotal(),
        tax: parseFloat(calculateTax().toFixed(2)),
        delivery: calculateDelivery(),
        total: parseFloat(calculateTotal().toFixed(2))
      };

      console.log('Sending order data:', orderData);

      // Save order to database
      const response = await axios.post(buildApiUrl(API_ENDPOINTS.CREATE_ORDER), orderData);

      console.log('Order response:', response.data);

      if (response.data.success) {
        // Save order to local history
        addOrder(orderData);

        // Format cart items for WhatsApp message
        let message = "🥗 *New Order from Salad Karo*\n\n";
        message += "📦 *Order Details:*\n";
        message += "━━━━━━━━━━━━━━━━\n\n";

        cart.items.forEach((item, index) => {
          message += `${index + 1}. *${item.name}*\n`;
          message += `   Quantity: ${item.quantity}\n`;
          message += `   Price: ₹${item.price} each\n`;
          message += `   Subtotal: ₹${item.price * item.quantity}\n\n`;
        });

        message += "━━━━━━━━━━━━━━━━\n";
        message += `💰 *Subtotal:* ₹${calculateSubtotal()}\n`;
        message += `📊 *Tax (5%):* ₹${calculateTax().toFixed(2)}\n`;
        message += `🚚 *Delivery:* ${calculateDelivery() === 0 ? 'Free' : '₹' + calculateDelivery()}\n`;
        message += `━━━━━━━━━━━━━━━━\n`;
        message += `✅ *Total Amount:* ₹${calculateTotal().toFixed(2)}\n\n`;
        message += `👤 *Customer:* ${user.name || user.email}\n`;
        message += "Thank you for your order! 🙏";

        const phoneNumber = '919265379915';
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Clear cart
        clearCart();

        // Show success message
        toast.success('🎉 Order Successfully Confirmed!', {
          description: 'Your order has been placed. Opening WhatsApp...',
          duration: 5000
        });

        // Open WhatsApp
        setTimeout(() => {
          window.open(whatsappURL, '_blank');
        }, 500);
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to create order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Completion Modal */}
      <GoogleInfoModal
        isOpen={showProfileModal}
        onClose={() => {
          if (attemptedCheckout) {
            // Don't show error, just close
          }
          setShowProfileModal(false);
          setAttemptedCheckout(false);
        }}
        onSubmit={async (formData) => {
          try {
            const token = localStorage.getItem('authToken') || '';
            const res = await googleRegister({
              ...formData,
              email: user?.email || '',
              name: user?.name || '',
              picture: '',
              token: token
            });
            if (res.ok) {
              setShowProfileModal(false);
              setAttemptedCheckout(false);
              // Don't retry checkout - let user click again
              // The user object will be updated by AuthContext
            }
          } catch (e) {
            console.error('Profile update error:', e);
          }
        }}
        initialData={{
          phone: user?.phone,
          city: user?.city,
          address: user?.address
        }}
      />

      <QuickOrderTopBar />
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <ShoppingBag className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
          {cart.items.length > 0 && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="relative flex flex-col items-center justify-center py-24 text-center overflow-hidden bg-white rounded-3xl shadow-lg">
            {/* Floating decorative icons */}
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute top-8 left-10 animate-float opacity-20">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <div className="absolute top-20 right-16 animate-float-delayed opacity-20">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <div className="absolute bottom-12 left-24 animate-float opacity-20">
                <Star className="w-10 h-10 text-yellow-500" />
              </div>
              <div className="absolute bottom-6 right-8 animate-float-delayed opacity-20">
                <Leaf className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="pointer-events-none absolute z-0 w-64 h-64 rounded-full bg-gradient-to-br from-green-100 to-blue-100 blur-3xl" />

            <div className="relative z-10">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Looks like you haven't added any delicious salads yet. Start exploring our fresh menu!
              </p>
              <button
                onClick={handleOrderNow}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Menu
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.items.map(item => (
                    <div
                      key={item.id}
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleProductClick(item)}
                    >
                      <div className="flex items-center gap-6">
                        <div className="relative group">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl shadow-md hover:scale-105 transition-transform border-2 border-transparent hover:border-green-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-200 flex items-center justify-center pointer-events-none">
                            <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 px-2 py-1 rounded">👁️ View Details</div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-green-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, Math.max(1, item.quantity - 1));
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, item.quantity + 1);
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromCart(item.id);
                                }}
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-bold text-green-700">₹{item.price * item.quantity}</div>
                              <div className="text-sm text-gray-500">₹{item.price} each</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{calculateDelivery() === 0 ? 'Free' : `₹${calculateDelivery()}`}</span>
                  </div>
                  {calculateDelivery() > 0 && (
                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      Add ₹{500 - calculateSubtotal()} more for free delivery!
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={handleOrderNow}
                    className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ModernFooter />

      {/* Salad Detail Overlay - Removed as using redirect */}
      <AdminAccessButton />
    </div>
  );
};

export default EnhancedCart;