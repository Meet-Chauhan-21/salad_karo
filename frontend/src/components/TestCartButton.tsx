import React from 'react';
import { useCart } from '../contexts/CartContext';

const TestCartButton: React.FC = () => {
  const { addToCart } = useCart();
  
  const testProduct = {
    id: 999,
    name: 'Test Salad',
    price: 100,
    image: '/images/test.jpg',
    description: 'Test salad for debugging',
    rating: 5,
    reviews: 1,
    badge: 'Test'
  };

  const handleAddTest = () => {
    console.log('Adding test product to cart');
    addToCart(testProduct);
  };

  return (
    <button
      onClick={handleAddTest}
      className="fixed bottom-20 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50"
    >
      Add Test Item
    </button>
  );
};

export default TestCartButton;