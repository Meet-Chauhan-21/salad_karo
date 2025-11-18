import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import SaladDetailOverlay from '../components/SaladDetailOverlay';
import { useLikes } from '../contexts/LikesContext';
import { useAuth } from '../contexts/AuthContext';
import { useSalads } from '../hooks/useSalads';
import { Leaf, Heart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Likes: React.FC = () => {
  const { likedProductIds, clearAllLikes } = useLikes();
  const { isLoggedIn } = useAuth();
  const { cart } = useCart();
  const { products, loading, error } = useSalads();
  const likedList = products.filter(p => likedProductIds.has(p.id));
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  // Get quantity of a product in cart
  const getProductQuantity = (productId: string): number => {
    const cartItem = cart.items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // allow animation to finish
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Likes</h1>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-3xl font-bold mb-2">Loading your liked salads...</div>
            <p className="text-muted-foreground">Please wait while we fetch your favorites.</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-3xl font-bold mb-2 text-red-500">Error loading salads</div>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : !isLoggedIn ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="w-12 h-12 text-accent mb-6 animate-float" />
            <div className="text-3xl font-bold mb-2">Please log in to see your liked salads</div>
            <p className="text-muted-foreground mb-6">Sign in to save and view your favorite salads.</p>
            <a
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button)]/70 transition-[var(--transition-smooth)] hover:scale-[1.02]"
            >
              Login
            </a>
          </div>
        ) : likedList.length === 0 ? (
          <div className="relative flex flex-col items-center justify-center py-24 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute top-8 left-10 animate-float opacity-20">
                <Leaf className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute top-20 right-16 animate-float-delayed opacity-20">
                <Heart className="w-10 h-10 text-accent" />
              </div>
              <div className="absolute bottom-12 left-24 animate-float opacity-20">
                <Star className="w-10 h-10 text-primary-glow" />
              </div>
            </div>
            <div className="relative z-10 text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-gradient">No liked salads yet</span>
            </div>
            <p className="relative z-10 mt-4 text-lg md:text-xl text-muted-foreground">Discover our menu and like your favorites.</p>
            <a
              href="/#shop"
              className="relative z-10 mt-8 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button)]/70 transition-[var(--transition-smooth)] hover:scale-[1.02]"
            >
              Browse Salads
            </a>
          </div>
        ) : ( 
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={clearAllLikes}
                className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-all duration-200"
                disabled={likedList.length === 0}
              >
                Clear All Likes
              </button>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {likedList.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden animate-fade-in-up border border-gray-100 hover:border-green-200 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={e => {
                  // Prevent overlay open if any like or add to cart button is clicked
                  const target = e.target as HTMLElement;
                  if (
                    target.closest('button[aria-label="Toggle like"]') ||
                    target.closest('button[aria-label="Add to cart"]') ||
                    target.closest('button[aria-label^="Add "]') ||
                    target.closest('.qty-control') ||
                    target.closest('button')?.textContent?.includes('Add to Cart')
                  ) {
                    return;
                  }
                  handleProductClick(product);
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
            </>
        )}
      </main>
      {/* Salad Detail Overlay */}
      <SaladDetailOverlay
        product={selectedProduct}
        isOpen={isDetailOpen && !!selectedProduct}
        onClose={handleCloseDetail}
        initialQuantity={selectedProduct ? (getProductQuantity(selectedProduct.id) || 1) : 1}
      />
      <Footer />
    </div>
  );
};

export default Likes;


