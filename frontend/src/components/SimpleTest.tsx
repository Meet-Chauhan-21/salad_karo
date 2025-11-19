import React from 'react';

const SimpleTest = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'green' }}>🥗 Salad Karo - App is Working!</h1>
      <p>If you see this, your React app is successfully deployed!</p>
      
      <div style={{ background: '#f0f0f0', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
        <h3>Environment Check:</h3>
        <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
        <p><strong>Production:</strong> {import.meta.env.PROD ? 'Yes' : 'No'}</p>
        <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'Not set'}</p>
      </div>

      <div style={{ background: '#e8f4f8', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
        <h3>Backend Test:</h3>
        <button 
          onClick={async () => {
            try {
              const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://salad-karo.vercel.app';
              const response = await fetch(`${apiUrl}/auth/users`);
              const data = await response.json();
              alert(`✅ Backend is working! Found ${data.users?.length || 0} users`);
            } catch (error) {
              alert(`❌ Backend connection failed: ${error}`);
            }
          }}
          style={{ 
            padding: '10px 20px', 
            background: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Backend Connection
        </button>
      </div>

      <div style={{ background: '#fff3cd', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
        <h3>Next Steps:</h3>
        <p>✅ If backend test passes, your full app should work</p>
        <p>🔄 You can navigate to <a href="/menu" style={{ color: '#007cba' }}>/menu</a> to test routing</p>
        <p>🏠 Go to <a href="/" style={{ color: '#007cba' }}>home page</a> for full app</p>
      </div>
    </div>
  );
};

export default SimpleTest;