import { useLocation, useNavigate } from 'react-router-dom';

export const useOrderNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToElement = (element: HTMLElement) => {
    // Add smooth scroll class
    element.classList.add('smooth-scroll-target');
    
    // Smooth scroll to element
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Just focus without visual animation
    setTimeout(() => {
      element.focus();
    }, 500);
  };

  const handleOrderNow = () => {
    // Case 1: User is on home page (/) - scroll to Fresh Menu section
    if (location.pathname === '/') {
      const freshMenuSection = document.getElementById('fresh-menu') || 
                               document.getElementById('menu') || 
                               document.getElementById('shop');
      
      if (freshMenuSection) {
        scrollToElement(freshMenuSection);
      }
    }
    // Case 2: User is on salad menu page (/menu) - scroll to all salads grid
    else if (location.pathname === '/menu') {
      const saladGrid = document.getElementById('shop') || 
                        document.querySelector('[class*="grid"][id]') ||
                        document.querySelector('.salad-grid');
      
      if (saladGrid instanceof HTMLElement) {
        scrollToElement(saladGrid);
      }
    }
    // Case 3: User is on any other page - navigate to salad menu page and scroll to salads
    else {
      navigate('/menu');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const saladGrid = document.getElementById('shop') || 
                          document.querySelector('[class*="grid"][id]') ||
                          document.querySelector('.salad-grid');
        
        if (saladGrid instanceof HTMLElement) {
          scrollToElement(saladGrid);
        }
      }, 300); // Increased delay for navigation completion
    }
  };

  return { handleOrderNow };
};