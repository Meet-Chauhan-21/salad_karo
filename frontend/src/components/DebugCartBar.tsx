import React from 'react';
import { useCart } from '../contexts/CartContext';

const DebugCartBar: React.FC = () => {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  console.log('DebugCartBar render:', { cart, itemCount, total: cart.total });
  
  if (itemCount === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 z-50 rounded">
      Debug: {itemCount} items, ₹{cart.total} total
    </div>
  );
};

export default DebugCartBar;