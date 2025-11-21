// Image utility to handle asset paths in production
import vegetableSaladImg from '../assets/vegetable-salad.jpg';
import sprotuSaladImg from '../assets/sprout-salad.jpg';
import boiledSaladImg from '../assets/boiled-salad.jpg';
import chaatSaladImg from '../assets/chaat-salad.jpg';
import dryFruitsSaladImg from '../assets/dry-fruits-salad.jpg';
import mexicanSaladImg from '../assets/mexican-salad.jpg';
import italianSaladImg from '../assets/italian-salad.jpg';
import heroSaladImg from '../assets/hero-salad.jpg';

// Map of image names to imported assets
const imageMap: Record<string, string> = {
  'vegetable-salad.jpg': vegetableSaladImg,
  'sprout-salad.jpg': sprotuSaladImg,
  'boiled-salad.jpg': boiledSaladImg,
  'chaat-salad.jpg': chaatSaladImg,
  'dry-fruits-salad.jpg': dryFruitsSaladImg,
  'mexican-salad.jpg': mexicanSaladImg,
  'italian-salad.jpg': italianSaladImg,
  'hero-salad.jpg': heroSaladImg,
};

/**
 * Convert image path to production-ready URL
 * @param imagePath - Original image path from database
 * @returns Production-ready image URL
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return vegetableSaladImg; // Default fallback

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Extract filename from path
  const filename = imagePath.split('/').pop() || '';
  
  // Try to get from imported assets first
  if (imageMap[filename]) {
    return imageMap[filename];
  }

  // Try public images folder
  if (imagePath.startsWith('/images/')) {
    return imagePath;
  }

  // Convert old /src/assets/ paths to /images/
  if (imagePath.includes('/src/assets/')) {
    return imagePath.replace('/src/assets/', '/images/');
  }

  // Convert relative paths
  if (imagePath.includes('assets/')) {
    const fileName = imagePath.split('/').pop();
    return `/images/${fileName}`;
  }

  // Default fallback
  return vegetableSaladImg;
};

/**
 * Get all available images for selection
 */
export const getAvailableImages = () => {
  return Object.keys(imageMap).map(filename => ({
    filename,
    url: `/images/${filename}`,
    importedUrl: imageMap[filename]
  }));
};