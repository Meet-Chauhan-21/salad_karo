import React from 'react';
import { useCart } from '../contexts/CartContext';
import { PRODUCTS } from '../lib/products';

const CartDebugPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const testProduct = PRODUCTS[0]; // Vegetable Salad

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cart Debug Page</h1>
        
        {/* Test Controls */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => addToCart(testProduct)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add {testProduct.name}
            </button>
            <button
              onClick={() => addToCart(PRODUCTS[1])}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add {PRODUCTS[1].name}
            </button>
            <button
              onClick={() => clearCart()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Cart State Display */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow">
          <h2 className="text-xl font-semibold mb-4">Current Cart State</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Items ({cart.items.length})</h3>
              {cart.items.length === 0 ? (
                <p className="text-gray-500">No items in cart</p>
              ) : (
                <div className="space-y-2">
                  {cart.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">ID: {item.id}</div>
                        <div className="text-sm text-gray-600">₹{item.price} each</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">Qty: {item.quantity}</div>
                        <div className="text-sm">₹{item.price * item.quantity}</div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">Summary</h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between mb-2">
                  <span>Total Items:</span>
                  <span className="font-bold">
                    {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Unique Products:</span>
                  <span className="font-bold">{cart.items.length}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>₹{cart.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-green-700">✅ Test 1: Duplicate Prevention</h3>
              <p className="text-sm text-gray-600">
                Click "Add Vegetable Salad" multiple times. Each click should increment the quantity instead of creating duplicate entries.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-blue-700">✅ Test 2: Multiple Products</h3>
              <p className="text-sm text-gray-600">
                Add different salads. Each should be a separate entry with its own quantity.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-medium text-orange-700">✅ Test 3: Total Calculation</h3>
              <p className="text-sm text-gray-600">
                Verify that the total price updates correctly: (price × quantity) for each item.
              </p>
            </div>
          </div>
        </div>

        {/* Raw Cart Data */}
        <div className="bg-white rounded-lg p-6 shadow mt-8">
          <h2 className="text-xl font-semibold mb-4">Raw Cart Data (JSON)</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(cart, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CartDebugPage;