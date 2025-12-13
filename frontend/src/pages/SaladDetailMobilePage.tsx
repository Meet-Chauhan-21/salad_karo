import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Plus, Minus, ShoppingCart, Clock, Leaf, Award, Share2 } from 'lucide-react';
import { Product } from '../lib/products';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';
import { useAuth } from '../contexts/AuthContext';
import { useOverlay } from '../contexts/OverlayContext';
import { PRODUCTS } from '../lib/products';
import { toast } from '@/components/ui/sonner';
import { getImageUrl } from '../utils/imageUtils';

const SaladDetailMobilePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { addToCart, cart, updateQuantity: updateCartQuantity, removeFromCart } = useCart();
  const { isLiked, toggleLike } = useLikes();
  const { isLoggedIn } = useAuth();
  const { setIsCartBarHidden } = useOverlay();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ensure cart bar is visible when component mounts
  useEffect(() => {
    setIsCartBarHidden(false);
  }, [setIsCartBarHidden]);

  // ... (keep useEffect for product loading)

  // ... (keep helper checks like existingItem, isItemInCart)

  // Modified handle logic to support the new UI
  const handleInitialAdd = () => {
    const productForCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge
    };
    addToCart(productForCart);
    // Remove toast
  };

  const handleIncrement = () => {
    updateCartQuantity(product.id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      updateCartQuantity(product.id, cartQuantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  // ... (Render loop)



  // Get product from location state, URL params, or find by ID
  useEffect(() => {
    console.log('SaladDetailMobilePage mounted');

    const productData = location.state?.product;
    const productId = params.id || new URLSearchParams(location.search).get('id');

    console.log('productId:', productId);

    if (productData) {
      console.log('Using product from state');
      setProduct(productData);
    } else if (productId) {
      console.log('Looking for product with ID:', productId);
      const foundProduct = PRODUCTS.find(p => p.id === productId);
      console.log('Found product:', foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        toast.error('Salad not found');
        navigate('/menu');
      }
    } else {
      navigate('/menu');
    }
  }, [location, params, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading delicious salad...</p>
        </div>
      </div>
    );
  }

  // Check if item is already in cart
  const existingItem = cart.items.find(item => item.id === product.id);
  const isItemInCart = !!existingItem;
  const cartQuantity = existingItem ? existingItem.quantity : 0;

  const totalPrice = product.price;
  const isProductLiked = isLiked(product.id);

  const handleAddToCart = () => {
    if (isItemInCart) {
      updateCartQuantity(product.id, cartQuantity + 1);
    } else {
      // Add new item - addToCart adds 1 quantity
      const productForCart = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        rating: product.rating,
        reviews: product.reviews,
        badge: product.badge
      };
      addToCart(productForCart);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleLikeToggle = () => {
    if (!isLoggedIn) {
      toast.error('Please login to save favorites');
      return;
    }
    toggleLike(product.id);
    toast.success(isProductLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this delicious ${product.name} on SaladKaro!`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        toast.error('Could not copy link');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="font-semibold text-lg text-gray-900 truncate mx-4 flex-1">
            {product.name}
          </h1>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleLikeToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isProductLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3E🥗 Image Not Available%3C/text%3E%3C/svg%3E';
              setImageLoaded(true);
            }}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 w-full h-full"></div>
            </div>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white px-3 py-2 rounded-full shadow-lg border border-gray-100">
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
          </div>
        </div>

        {/* Category & Rating */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          {product.badge && (
            <div className="bg-white px-3 py-1 rounded-full shadow-md border border-gray-100">
              <span className="text-sm font-medium text-gray-700">{product.badge}</span>
            </div>
          )}
          <div className="bg-white px-2 py-1 rounded-full shadow-md border border-gray-100 flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6">
        {/* Title & Quick Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">10-15 min</span>
            </div>

            <div className="flex items-center space-x-1 text-gray-600">
              <Award className="w-4 h-4" />
              <span className="text-sm">Serves 1-2</span>
            </div>

            <div className="flex items-center space-x-1 text-green-600">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Fresh</span>
            </div>
          </div>

          {/* Full Description */}
          <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>

          {/* Rating and Reviews Summary */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['Fresh', 'Organic', 'Vegan', 'Gluten-Free', 'Low-Calorie', 'High-Protein'].map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Action Section (Amazon Style) */}
        <div className="bg-white border-t border-b border-gray-100 py-4 mb-6">
          <div className="flex items-center justify-start"> {/* Left Aligned */}
            {!isItemInCart ? (
              /* State 1: Small Add to Cart Button */
              <button
                onClick={handleInitialAdd}
                className="bg-green-600 text-white text-base font-bold py-3 px-8 rounded-full shadow-md hover:bg-green-700 active:scale-95 transition-all flex items-center gap-2"
              >
                Add to cart
              </button>
            ) : (
              /* State 2: Quantity Controls (Replaces Add Button - Swiggy/Zepto Style) */
              <div className="flex items-center bg-green-50 rounded-full border border-green-200 shadow-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                <button
                  onClick={handleDecrement}
                  className="p-4 text-green-700 hover:bg-green-100 transition-colors active:bg-green-200"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-green-800 text-lg">
                  {cartQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-4 text-green-700 hover:bg-green-100 transition-colors active:bg-green-200"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Description Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              {/* Benefits */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Health Benefits:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Rich in vitamins and minerals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">High in dietary fiber</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Supports healthy digestion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Low in calories, high in nutrients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Fresh Ingredients:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Fresh Lettuce',
                    'Cherry Tomatoes',
                    'Cucumber',
                    'Red Onion',
                    'Bell Peppers',
                    'Carrots',
                    'Olive Oil',
                    'Lemon Juice',
                    'Herbs & Spices',
                    'Sea Salt'
                  ].map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Note:</strong> All ingredients are fresh, organic when possible, and sourced from trusted suppliers.
                </p>
              </div>
            </div>
          </div>

          {/* Nutrition Section */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutrition Facts</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Calories', value: '120', unit: 'kcal' },
                  { label: 'Protein', value: '8', unit: 'g' },
                  { label: 'Carbs', value: '15', unit: 'g' },
                  { label: 'Fiber', value: '6', unit: 'g' },
                  { label: 'Fat', value: '2', unit: 'g' },
                  { label: 'Sodium', value: '150', unit: 'mg' }
                ].map((fact, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <div className="text-lg font-bold text-green-600">{fact.value}</div>
                    <div className="text-xs text-gray-500">{fact.unit}</div>
                    <div className="text-xs font-medium text-gray-700">{fact.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Rich in Vitamins:</h4>
                <div className="flex flex-wrap gap-1">
                  {['Vitamin A', 'Vitamin C', 'Vitamin K', 'Folate', 'Iron', 'Potassium'].map((vitamin, index) => (
                    <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                      {vitamin}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Reviews</h3>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: 'Priya Sharma',
                  rating: 5,
                  comment: 'Absolutely delicious! Fresh ingredients and perfect portion size.',
                  date: '2 days ago'
                },
                {
                  id: 2,
                  name: 'Raj Patel',
                  rating: 4,
                  comment: 'Great taste and healthy option. Will definitely order again.',
                  date: '1 week ago'
                },
                {
                  id: 3,
                  name: 'Anjali Singh',
                  rating: 5,
                  comment: 'Best salad I have ever had! Fresh and flavorful.',
                  date: '2 weeks ago'
                }
              ].map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{review.name}</div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}

              <div className="text-center pt-2">
                <span className="text-sm text-gray-500">Showing latest 3 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SaladDetailMobilePage;