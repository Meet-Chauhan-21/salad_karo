import React from 'react';

const DebugPage: React.FC = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  const adminUser = localStorage.getItem('adminUser');
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">LocalStorage State:</h3>
            <div className="bg-gray-100 p-3 rounded mt-2">
              <p><strong>isAdmin:</strong> {isAdmin || 'null'}</p>
              <p><strong>adminUser:</strong> {adminUser || 'null'}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold">Actions:</h3>
            <div className="space-x-2 mt-2">
              <button 
                onClick={() => {
                  localStorage.setItem('isAdmin', 'true');
                  localStorage.setItem('adminUser', JSON.stringify({
                    email: 'admin@123',
                    name: 'Admin',
                    role: 'admin'
                  }));
                  window.location.reload();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Set Admin Auth
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('isAdmin');
                  localStorage.removeItem('adminUser');
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Auth
              </button>
              <a 
                href="/admin"
                className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Go to Admin
              </a>
              <a 
                href="/login"
                className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Go to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;