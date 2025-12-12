import React, { useState } from 'react';
import { X, MapPin, Phone, Building } from 'lucide-react';
import { toast } from 'sonner';

interface GoogleInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { phone: string; city: string; address: string }) => Promise<void>;
    initialData?: {
        phone?: string;
        city?: string;
        address?: string;
    };
}

const GoogleInfoModal: React.FC<GoogleInfoModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ phone?: string; city?: string; address?: string }>({});
    const [formData, setFormData] = useState({
        phone: initialData?.phone || '',
        city: initialData?.city || '',
        address: initialData?.address || ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous errors
        const newErrors: { phone?: string; city?: string; address?: string } = {};

        // Validation
        if (!formData.phone || formData.phone.length < 10) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (!formData.city || formData.city.trim() === '') {
            newErrors.city = 'City is required';
        }
        if (!formData.address || formData.address.trim() === '') {
            newErrors.address = 'Address is required';
        }

        setErrors(newErrors);

        // If there are errors, don't submit
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);
            await onSubmit(formData);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="relative px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Complete Your Profile</h3>
                        <p className="text-sm text-gray-500 mt-0.5">We need a few more details to deliver your salads.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                                    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                                }}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-green-500 focus:ring-green-100'} focus:ring-2 outline-none transition-all placeholder:text-gray-400`}
                                placeholder="Enter your mobile number"
                            />
                            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Building className="w-4 h-4 text-gray-400" />
                                City
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, city: e.target.value }));
                                    if (errors.city) setErrors(prev => ({ ...prev, city: undefined }));
                                }}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-green-500 focus:ring-green-100'} focus:ring-2 outline-none transition-all placeholder:text-gray-400`}
                                placeholder="Enter your city"
                            />
                            {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                Address
                            </label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, address: e.target.value }));
                                    if (errors.address) setErrors(prev => ({ ...prev, address: undefined }));
                                }}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-green-500 focus:ring-green-100'} focus:ring-2 outline-none transition-all min-h-[100px] resize-none placeholder:text-gray-400`}
                                placeholder="Enter your complete delivery address"
                            />
                            {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-green-600/20"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Complete Registration'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoogleInfoModal;
