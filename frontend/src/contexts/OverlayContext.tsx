import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OverlayContextType {
  isSaladDetailOpen: boolean;
  setIsSaladDetailOpen: (isOpen: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSaladDetailOpen, setIsSaladDetailOpen] = useState(false);

  return (
    <OverlayContext.Provider value={{ isSaladDetailOpen, setIsSaladDetailOpen }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};