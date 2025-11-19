import React from 'react';

const FallbackHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🥗 Salad Karo</h1>
        <p className="text-xl text-gray-600 mb-8">Fresh & Healthy Salads</p>
        
        <div className="space-y-4">
          <a 
            href="/menu" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            View Menu
          </a>
          <br />
          <a 
            href="/test" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Page
          </a>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Backend: {import.meta.env.VITE_API_BASE_URL || 'https://salad-karo.vercel.app'}</p>
          <p>Environment: {import.meta.env.MODE}</p>
        </div>
      </div>
    </div>
  );
};

export default FallbackHome;