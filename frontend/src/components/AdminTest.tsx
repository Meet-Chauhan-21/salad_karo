import React, { useState } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const AdminTest = () => {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const testAPI = async (endpoint: string, name: string) => {
    setLoading(true);
    try {
      console.log(`Testing ${name} endpoint:`, buildApiUrl(endpoint));
      const response = await fetch(buildApiUrl(endpoint));
      console.log(`${name} response status:`, response.status);
      const data = await response.json();
      console.log(`${name} response data:`, data);
      
      setResults(prev => ({
        ...prev,
        [name]: {
          status: response.status,
          success: data.success,
          dataCount: data.users?.length || data.salads?.length || data.orders?.length || 0,
          data: data
        }
      }));
    } catch (error) {
      console.error(`${name} error:`, error);
      setResults(prev => ({
        ...prev,
        [name]: {
          error: error.message
        }
      }));
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔧 Admin API Test</h1>
      <p>Base URL: {buildApiUrl('')}</p>
      
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => testAPI(API_ENDPOINTS.USERS, 'Users')}
          disabled={loading}
          style={{ margin: '5px', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Users API
        </button>
        
        <button 
          onClick={() => testAPI(API_ENDPOINTS.GET_ALL_SALADS, 'Salads')}
          disabled={loading}
          style={{ margin: '5px', padding: '10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Salads API
        </button>
        
        <button 
          onClick={() => testAPI(API_ENDPOINTS.GET_ALL_ORDERS, 'Orders')}
          disabled={loading}
          style={{ margin: '5px', padding: '10px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Orders API
        </button>
      </div>

      <div style={{ background: '#f0f0f0', padding: '15px', margin: '20px 0' }}>
        <h3>Results:</h3>
        <pre style={{ background: 'white', padding: '10px', overflow: 'auto', maxHeight: '400px' }}>
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>

      {loading && <p>Testing...</p>}
    </div>
  );
};

export default AdminTest;