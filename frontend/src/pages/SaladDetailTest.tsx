import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../lib/products';
import { navigateToSaladDetail } from '../lib/saladDetailNavigation';

const SaladDetailTest = () => {
  const navigate = useNavigate();
  
  // Get first product for testing
  const testProduct = PRODUCTS[0];

  const handleTestMobile = () => {
    navigate('/salad-detail-mobile', {
      state: { product: testProduct, initialQuantity: 1 }
    });
  };

  const handleTestDesktop = () => {
    navigate('/salad-detail-desktop', {
      state: { product: testProduct, initialQuantity: 1 }
    });
  };

  const handleTestResponsive = () => {
    navigateToSaladDetail(navigate, testProduct, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Salad Detail Pages Test</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mobile Version Test */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📱 Mobile Version</h2>
            <p className="text-gray-600 mb-4">
              Full-screen mobile-optimized layout with touch-friendly controls.
            </p>
            <button
              onClick={handleTestMobile}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Test Mobile Detail
            </button>
          </div>

          {/* Desktop Version Test */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">🖥️ Desktop Version</h2>
            <p className="text-gray-600 mb-4">
              Overlay-style desktop layout (existing design maintained).
            </p>
            <button
              onClick={handleTestDesktop}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Test Desktop Detail
            </button>
          </div>

          {/* Auto-Responsive Test */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">🔄 Auto-Responsive</h2>
            <p className="text-gray-600 mb-4">
              Automatically detects screen size and shows appropriate version.
            </p>
            <button
              onClick={handleTestResponsive}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Test Auto-Detect
            </button>
          </div>
        </div>

        {/* Test Product Info */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Test Product: {testProduct.name}</h3>
          <div className="flex items-center gap-4">
            <img 
              src={testProduct.image} 
              alt={testProduct.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <p className="font-medium">₹{testProduct.price}</p>
              <p className="text-sm text-gray-600">{testProduct.description}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">🧪 Testing Instructions</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>Mobile Test:</strong> Opens mobile-optimized full-screen detail page</li>
            <li><strong>Desktop Test:</strong> Opens existing overlay-style detail page</li>
            <li><strong>Auto-Responsive:</strong> Automatically chooses based on your current screen size</li>
            <li><strong>Screen Size Detection:</strong> Mobile ≤ 768px, Desktop &gt; 768px</li>
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaladDetailTest;