import React, { useState, useEffect } from 'react';
import MobileSaladDetail from './MobileSaladDetail';
import DesktopSaladDetail from './DesktopSaladDetail';

interface ResponsiveSaladDetailProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
}

const ResponsiveSaladDetail: React.FC<ResponsiveSaladDetailProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  initialQuantity = 1 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Mobile if screen width is 768px or less
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for screen size changes
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Render mobile version for screens ≤ 768px
  if (isMobile) {
    return (
      <MobileSaladDetail
        product={product}
        isOpen={isOpen}
        onClose={onClose}
        initialQuantity={initialQuantity}
      />
    );
  }

  // Render desktop version for screens > 768px
  return (
    <DesktopSaladDetail
      product={product}
      isOpen={isOpen}
      onClose={onClose}
      initialQuantity={initialQuantity}
    />
  );
};

export default ResponsiveSaladDetail;