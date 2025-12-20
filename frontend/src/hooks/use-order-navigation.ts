import { useNavigate } from 'react-router-dom';

export const useOrderNavigation = () => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate('/menu');
  };

  return { handleOrderNow };
};