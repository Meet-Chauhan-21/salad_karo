import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DesktopSaladDetail from '../components/DesktopSaladDetail';
import { PRODUCTS } from '../lib/products';

const SaladDetailDesktop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Get product from location state or URL params
    const productData = location.state?.product;
    const productId = new URLSearchParams(location.search).get('id');
    
    if (productData) {
      setProduct(productData);
    } else if (productId) {
      // Find product by ID
      const foundProduct = PRODUCTS.find(p => p.id === parseInt(productId));
      setProduct(foundProduct);
    } else {
      // No product found, redirect to home
      navigate('/');
    }
  }, [location, navigate]);

  const handleClose = () => {
    setIsOpen(false);
    // Go back to previous page or home
    navigate(-1);
  };

  if (!product) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading salad details...</p>
        </div>
      </div>
    );
  }

  return (
    <DesktopSaladDetail
      product={product}
      isOpen={isOpen}
      onClose={handleClose}
      initialQuantity={location.state?.initialQuantity || 1}
    />
  );
};

export default SaladDetailDesktop;