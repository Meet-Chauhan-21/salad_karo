import React from 'react';

const TestAdminPage: React.FC = () => {
  console.log('TestAdminPage rendering');
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard Test</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg">If you can see this, the admin routing is working!</p>
          <p className="text-sm text-gray-600 mt-2">
            Admin authenticated: {localStorage.getItem('isAdmin') === 'true' ? 'Yes' : 'No'}
          </p>
          <p className="text-sm text-gray-600">
            Admin user: {localStorage.getItem('adminUser')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestAdminPage;