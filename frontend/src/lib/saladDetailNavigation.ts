import { NavigateFunction } from 'react-router-dom';

/**
 * Navigate to appropriate salad detail page based on screen size
 * @param navigate - React Router navigate function
 * @param product - Product object to display
 * @param initialQuantity - Initial quantity (optional)
 */
export const navigateToSaladDetail = (
  navigate: NavigateFunction,
  product: any,
  initialQuantity: number = 1
) => {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    navigate('/salad-detail-mobile', {
      state: { product, initialQuantity }
    });
  } else {
    navigate('/salad-detail-desktop', {
      state: { product, initialQuantity }
    });
  }
};

/**
 * Get the appropriate salad detail route based on screen size
 * @param product - Product object
 * @param initialQuantity - Initial quantity (optional)
 * @returns Route path with state
 */
export const getSaladDetailRoute = (product: any, initialQuantity: number = 1) => {
  const isMobile = window.innerWidth <= 768;
  
  return {
    pathname: isMobile ? '/salad-detail-mobile' : '/salad-detail-desktop',
    state: { product, initialQuantity }
  };
};

/**
 * Navigate to salad detail by ID (useful for URL-based navigation)
 * @param navigate - React Router navigate function
 * @param productId - Product ID
 * @param initialQuantity - Initial quantity (optional)
 */
export const navigateToSaladDetailById = (
  navigate: NavigateFunction,
  productId: number,
  initialQuantity: number = 1
) => {
  const isMobile = window.innerWidth <= 768;
  const route = isMobile ? '/salad-detail-mobile' : '/salad-detail-desktop';
  
  navigate(`${route}?id=${productId}`, {
    state: { initialQuantity }
  });
};