import React from 'react';
import SaladDetailOverlay from './SaladDetailOverlay';

interface DesktopSaladDetailProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
}

const DesktopSaladDetail: React.FC<DesktopSaladDetailProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  initialQuantity = 1 
}) => {
  // Simply render the existing SaladDetailOverlay component
  // This maintains all existing desktop functionality exactly as it is
  return (
    <SaladDetailOverlay
      product={product}
      isOpen={isOpen}
      onClose={onClose}
      initialQuantity={initialQuantity}
    />
  );
};

export default DesktopSaladDetail;