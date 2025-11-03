import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  Save,
  X
} from 'lucide-react';

interface Salad {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isActive: boolean;
}

const AdminSalads: React.FC = () => {
  const [salads, setSalads] = useState<Salad[]>([
    {
      id: '1',
      title: 'Caesar Salad',
      description: 'Fresh romaine lettuce with caesar dressing, croutons, and parmesan cheese',
      price: 299,
      image: '/src/assets/vegetable-salad.jpg',
      category: 'Classic',
      isActive: true
    },
    {
      id: '2',
      title: 'Greek Salad',
      description: 'Mixed greens with feta cheese, olives, tomatoes, and olive oil dressing',
      price: 349,
      image: '/src/assets/italian-salad.jpg',
      category: 'Mediterranean',
      isActive: true
    },
    {
      id: '3',
      title: 'Italian Salad',
      description: 'Fresh basil, mozzarella, tomatoes with balsamic vinaigrette',
      price: 399,
      image: '/src/assets/italian-salad.jpg',
      category: 'Italian',
      isActive: true
    },
    {
      id: '4',
      title: 'Mexican Salad',
      description: 'Spicy mixed greens with corn, beans, and zesty lime dressing',
      price: 379,
      image: '/src/assets/mexican-salad.jpg',
      category: 'Mexican',
      isActive: true
    },
    {
      id: '5',
      title: 'Sprout Salad',
      description: 'Healthy mix of fresh sprouts with light seasoning',
      price: 199,
      image: '/src/assets/sprout-salad.jpg',
      category: 'Healthy',
      isActive: true
    },
    {
      id: '6',
      title: 'Chaat Salad',
      description: 'Indian style salad with tangy chaat masala and chutneys',
      price: 249,
      image: '/src/assets/chaat-salad.jpg',
      category: 'Indian',
      isActive: true
    },
    {
      id: '7',
      title: 'Dry Fruits Salad',
      description: 'Premium mix of nuts and dried fruits with honey dressing',
      price: 449,
      image: '/src/assets/dry-fruits-salad.jpg',
      category: 'Premium',
      isActive: true
    },
    {
      id: '8',
      title: 'Boiled Salad',
      description: 'Nutritious boiled vegetables with light olive oil dressing',
      price: 229,
      image: '/src/assets/boiled-salad.jpg',
      category: 'Diet',
      isActive: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedSalad, setSelectedSalad] = useState<Salad | null>(null);
  const [formData, setFormData] = useState<Partial<Salad>>({});

  const categories = ['Classic', 'Mediterranean', 'Italian', 'Mexican', 'Healthy', 'Indian', 'Premium', 'Diet'];

  const filteredSalads = salads.filter(salad => {
    const matchesSearch = salad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || salad.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (type: 'add' | 'edit', salad?: Salad) => {
    setModalType(type);
    if (type === 'edit' && salad) {
      setSelectedSalad(salad);
      setFormData(salad);
    } else {
      setSelectedSalad(null);
      setFormData({
        title: '',
        description: '',
        price: 0,
        image: '',
        category: categories[0],
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSalad(null);
    setFormData({});
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newSalad: Salad = {
        id: String(salads.length + 1),
        title: formData.title || '',
        description: formData.description || '',
        price: formData.price || 0,
        image: formData.image || '/src/assets/vegetable-salad.jpg',
        category: formData.category || categories[0],
        isActive: formData.isActive !== false
      };
      setSalads([...salads, newSalad]);
    } else if (modalType === 'edit' && selectedSalad) {
      setSalads(salads.map(salad => 
        salad.id === selectedSalad.id ? { ...salad, ...formData } : salad
      ));
    }
    closeModal();
  };

  const deleteSalad = (id: string) => {
    if (window.confirm('Are you sure you want to delete this salad?')) {
      setSalads(salads.filter(salad => salad.id !== id));
    }
  };

  const toggleSaladStatus = (id: string) => {
    setSalads(salads.map(salad => 
      salad.id === id ? { ...salad, isActive: !salad.isActive } : salad
    ));
  };

  return (
    <AdminLayout currentPage="salads">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Salad Management</h1>
            <p className="text-gray-600">Manage your salad menu items</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="w-6 h-6 bg-green-600 rounded"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Salads</p>
                  <p className="text-2xl font-bold text-gray-900">{salads.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Salads</p>
                  <p className="text-2xl font-bold text-gray-900">{salads.filter(s => s.isActive).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <div className="w-6 h-6 bg-yellow-600 rounded"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <div className="w-6 h-6 bg-purple-600 rounded"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Price</p>
                  <p className="text-2xl font-bold text-gray-900">₹{Math.round(salads.reduce((sum, s) => sum + s.price, 0) / salads.length)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search salads by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => openModal('add')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Salad
                </button>
              </div>
            </div>
          </div>

          {/* Salads Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSalads.map((salad) => (
              <div key={salad.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <img
                    src={salad.image}
                    alt={salad.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/src/assets/hero-salad.jpg';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      salad.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {salad.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{salad.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{salad.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-green-600">₹{salad.price}</span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {salad.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal('edit', salad)}
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleSaladStatus(salad.id)}
                      className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        salad.isActive
                          ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {salad.isActive ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => deleteSalad(salad.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSalads.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <Search className="h-8 w-8" />
                </div>
              </div>
              <p className="text-lg text-gray-500">No salads found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Salad */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {modalType === 'add' ? 'Add New Salad' : 'Edit Salad'}
                  </h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salad Name</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter salad name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="/src/assets/salad-image.jpg"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive !== false}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active (visible to customers)</label>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {modalType === 'add' ? 'Add Salad' : 'Save Changes'}
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSalads;