export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

import vegetableSalad from '@/assets/vegetable-salad.jpg';
import mexicanSalad from '@/assets/mexican-salad.jpg';
import dryFruitsSalad from '@/assets/dry-fruits-salad.jpg';
import boiledSalad from '@/assets/boiled-salad.jpg';
import chaatSalad from '@/assets/chaat-salad.jpg';
import sproutSalad from '@/assets/sprout-salad.jpg';
import italianSalad from '@/assets/italian-salad.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vegetable Salad",
    description: "Fresh mixed greens with seasonal vegetables, cherry tomatoes, and our signature olive oil dressing.",
    price: 199,
    originalPrice: 249,
    image: vegetableSalad,
    rating: 5,
    reviews: 124,
    badge: "Popular"
  },
  {
    id: 2,
    name: "Mexican Salad",
    description: "Spicy and flavorful with black beans, corn, avocado, bell peppers, and zesty lime dressing.",
    price: 249,
    originalPrice: 299,
    image: mexicanSalad,
    rating: 5,
    reviews: 89,
    badge: "Spicy"
  },
  {
    id: 3,
    name: "Dry Fruits Salad",
    description: "Premium mix of almonds, walnuts, dates, cranberries with fresh greens and honey dressing.",
    price: 299,
    originalPrice: 349,
    image: dryFruitsSalad,
    rating: 5,
    reviews: 67,
    badge: "Premium"
  },
  {
    id: 4,
    name: "Boiled Salad",
    description: "Healthy steamed vegetables including broccoli, carrots, and green beans with herb seasoning.",
    price: 179,
    originalPrice: 219,
    image: boiledSalad,
    rating: 4,
    reviews: 95,
    badge: "Healthy"
  },
  {
    id: 5,
    name: "Chaat Salad",
    description: "Indian street food inspired with chickpeas, onions, tomatoes, and tangy chutney dressing.",
    price: 229,
    originalPrice: 269,
    image: chaatSalad,
    rating: 5,
    reviews: 156,
    badge: "Tangy"
  },
  {
    id: 6,
    name: "Sprout Salad",
    description: "Nutritious mung bean sprouts with fresh vegetables, herbs, and lemon-mint dressing.",
    price: 189,
    originalPrice: 229,
    image: sproutSalad,
    rating: 4,
    reviews: 78,
    badge: "Protein Rich"
  },
  {
    id: 7,
    name: "Italian Salad",
    description: "Classic Caesar with romaine lettuce, parmesan cheese, croutons, and creamy Caesar dressing.",
    price: 269,
    originalPrice: 319,
    image: italianSalad,
    rating: 5,
    reviews: 112,
    badge: "Classic"
  }
];


