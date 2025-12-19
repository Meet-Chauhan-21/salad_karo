import { useLocation, useNavigate } from 'react-router-dom';

export const useOrderNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOrderNow = () => {
    // On home page - scroll to the salad menu section
    if (location.pathname === '/') {
      const freshMenuSection = document.getElementById('fresh-menu') || 
                               document.getElementById('menu') || 
                               document.getElementById('shop');
      
      if (freshMenuSection) {
        freshMenuSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
    // On other pages - navigate to menu page
    else {
      navigate('/menu');
    }
  };

  return { handleOrderNow };
};