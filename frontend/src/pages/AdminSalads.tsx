import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import { getImageUrl, getAvailableImages } from '../utils/imageUtils';
import vegetableSaladImg from '../assets/vegetable-salad.jpg';
import heroSaladImg from '../assets/hero-salad.jpg';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Save,
  X,
  Power,
  PowerOff,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";

interface Salad {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  isActive: boolean;
}

const AdminSalads: React.FC = () => {
  // Use admin data context
  const { 
    salads, 
    saladsLoading: loading, 
    fetchSalads, 
    addSalad: addSaladToDb,
    updateSalad: updateSaladInDb,
    deleteSalad: deleteSaladFromDb,
    toggleSaladStatus: toggleSaladStatusInDb
  } = useAdminData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedSalad, setSelectedSalad] = useState<Salad | null>(null);
  const [formData, setFormData] = useState<Partial<Salad>>({});

  const categories = ['Classic', 'Mediterranean', 'Italian', 'Mexican', 'Healthy', 'Indian', 'Premium', 'Diet'];

  useEffect(() => {
    console.log('AdminSalads component mounted - using cached data');
    fetchSalads(); // Will use cache if already fetched
  }, [fetchSalads]);

  const filteredSalads = salads.filter(salad => {
    const matchesSearch = salad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || filterCategory === 'All Categories' || salad.category === filterCategory;
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
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        image: '/images/vegetable-salad.jpg',
        rating: 5,
        reviews: 0,
        badge: '',
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

  const handleSave = async () => {
    try {
      if (modalType === 'add') {
        await addSaladToDb(formData);
        alert('Salad added successfully!');
      } else if (modalType === 'edit' && selectedSalad) {
        await updateSaladInDb(selectedSalad._id, formData);
        alert('Salad updated successfully!');
      }
      closeModal();
    } catch (error) {
      console.error('Error saving salad:', error);
      alert('Failed to save salad');
    }
  };

  const deleteSalad = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this salad?')) {
      try {
        await deleteSaladFromDb(id);
        alert('Salad deleted successfully!');
      } catch (error) {
        console.error('Error deleting salad:', error);
        alert('Failed to delete salad');
      }
    }
  };

  const toggleSaladStatus = async (id: string) => {
    try {
      await toggleSaladStatusInDb(id);
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to toggle status');
    }
  };

  return (
    <AdminLayout currentPage="salads">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">Loading salads from database...</p>
            </div>
          )}

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
                    <Input
                      type="text"
                      placeholder="Search salads by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Categories">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => openModal('add')} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Salad
                </Button>
              </div>
            </div>
          </div>

          {/* Salads Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                Loading salads...
              </div>
            ) : filteredSalads.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No salads found
              </div>
            ) : (
              filteredSalads.map((salad) => (
                <div key={salad._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-200">
                  <div className="relative">
                    <img
                      src={getImageUrl(salad.image)}
                      alt={salad.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getImageUrl('/images/hero-salad.jpg');
                      }}
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      {salad.badge && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {salad.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{salad.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{salad.description}</p>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < salad.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({salad.reviews || 0} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-green-600">₹{salad.price}</span>
                        {salad.originalPrice && salad.originalPrice > salad.price && (
                          <span className="text-sm text-gray-500 line-through">₹{salad.originalPrice}</span>
                        )}
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {salad.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t pt-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${salad.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {salad.isActive ? 'Active' : 'Inactive'}
                      </span>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openModal('edit', salad)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleSaladStatus(salad._id)}>
                            <Power className="h-4 w-4 mr-2" /> {salad.isActive ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deleteSalad(salad._id)} className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete Salad
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && filteredSalads.length === 0 && searchTerm && (
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

      {/* Dialog for Add/Edit Salad */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">{modalType === 'add' ? 'Add New Salad' : 'Edit Salad'}</DialogTitle>
            <DialogDescription className="text-sm">
              Fill in the details below to {modalType === 'add' ? 'create a new' : 'update the'} salad.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">Salad Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter salad name"
                className="text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
                className="text-base min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-sm font-medium">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="text-base"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="originalPrice" className="text-sm font-medium">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || ''}
                  onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                  placeholder="Optional"
                  className="text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Rating</Label>
                <Select
                  value={String(formData.rating || 5)}
                  onValueChange={(val) => setFormData({ ...formData, rating: parseInt(val) })}
                >
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(num => (
                      <SelectItem key={num} value={String(num)}>{num} Stars</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reviews" className="text-sm font-medium">Reviews</Label>
                <Input
                  id="reviews"
                  type="number"
                  value={formData.reviews || ''}
                  onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="text-base"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Badge</Label>
                <Select
                  value={formData.badge || "none"}
                  onValueChange={(val) => setFormData({ ...formData, badge: val === "none" ? "" : val })}
                >
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Badge</SelectItem>
                    <SelectItem value="Popular">Popular</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Spicy">Spicy</SelectItem>
                    <SelectItem value="Healthy">Healthy</SelectItem>
                    <SelectItem value="Classic">Classic</SelectItem>
                    <SelectItem value="Tangy">Tangy</SelectItem>
                    <SelectItem value="Protein Rich">Protein Rich</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Category</Label>
              <Select
                value={formData.category || ""}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Image URL & Preview</Label>
              <div className="space-y-4">
                <Input
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/vegetable-salad.jpg"
                  className="text-base"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {getAvailableImages().map((img) => (
                    <button
                      key={img.filename}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${formData.image === img.url ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img
                        src={img.importedUrl}
                        alt={img.filename}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive !== false}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label htmlFor="isActive" className="cursor-pointer">Active (visible to customers)</Label>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeModal} className="w-full sm:w-auto">Cancel</Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              {modalType === 'add' ? 'Add Salad' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSalads;