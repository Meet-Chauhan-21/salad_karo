import { API_BASE_URL } from '../config/api';

const DebugInfo = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔍 Debug Information</h1>
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Environment Variables:</h3>
        <p><strong>VITE_API_BASE_URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'Not set'}</p>
        <p><strong>VITE_NODE_ENV:</strong> {import.meta.env.VITE_NODE_ENV || 'Not set'}</p>
        <p><strong>MODE:</strong> {import.meta.env.MODE || 'Not set'}</p>
        <p><strong>PROD:</strong> {import.meta.env.PROD ? 'true' : 'false'}</p>
        <p><strong>DEV:</strong> {import.meta.env.DEV ? 'true' : 'false'}</p>
      </div>
      <div style={{ background: '#e8f4f8', padding: '10px', margin: '10px 0' }}>
        <h3>API Configuration:</h3>
        <p><strong>Current API Base URL:</strong> {API_BASE_URL}</p>
      </div>
      <div style={{ background: '#f8e8e8', padding: '10px', margin: '10px 0' }}>
        <h3>Test API Call:</h3>
        <button 
          onClick={async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/auth/users`);
              const data = await response.json();
              alert(`API Test: ${data.success ? 'SUCCESS' : 'FAILED'}`);
            } catch (error) {
              alert(`API Test FAILED: ${error}`);
            }
          }}
          style={{ padding: '10px', background: '#007cba', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Backend Connection
        </button>
      </div>
    </div>
  );
};

export default DebugInfo;