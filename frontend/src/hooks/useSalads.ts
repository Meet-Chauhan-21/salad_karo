import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import { getImageUrl } from '../utils/imageUtils';

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
  const { data: products = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: ['salads'],
    queryFn: async () => {
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.GET_ALL_SALADS));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.success) {
          // Transform the database salads to match the Product interface
          return data.salads
            .filter((salad: any) => salad.isActive) // Only show active salads
            .map((salad: any) => ({
              id: salad._id, // Use MongoDB _id instead of generating sequential IDs
              name: salad.name,
              description: salad.description,
              price: salad.price,
              originalPrice: salad.originalPrice,
              image: getImageUrl(salad.image),
              rating: salad.rating || 5,
              reviews: salad.reviews || 0,
              badge: salad.badge,
              category: salad.category,
              isActive: salad.isActive
            }));
        } else {
          throw new Error('Failed to fetch salads');
        }
      } catch (err) {
        console.error('Error fetching salads:', err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return { products, loading, error, refetch };
};