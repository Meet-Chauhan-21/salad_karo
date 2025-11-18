import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Product {
  id: string; // Changed to string to accommodate MongoDB _id
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category?: string;
  isActive?: boolean;
}

export const useSalads = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSalads = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3030/salads/all');
      if (response.data.success) {
        // Transform the database salads to match the Product interface
        const transformedProducts = response.data.salads
          .filter((salad: any) => salad.isActive) // Only show active salads
          .map((salad: any) => ({
            id: salad._id, // Use MongoDB _id instead of generating sequential IDs
            name: salad.name,
            description: salad.description,
            price: salad.price,
            originalPrice: salad.originalPrice,
            image: salad.image,
            rating: salad.rating || 5,
            reviews: salad.reviews || 0,
            badge: salad.badge,
            category: salad.category,
            isActive: salad.isActive
          }));
        setProducts(transformedProducts);
        setError(null);
      } else {
        setError('Failed to fetch salads');
      }
    } catch (err) {
      console.error('Error fetching salads:', err);
      setError('Failed to fetch salads');
      // Fallback to empty array
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalads();
  }, []);

  return { products, loading, error, refetch: fetchSalads };
};