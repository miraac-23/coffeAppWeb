import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';

const HomePage = () => {
   const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #FFF8F0, #F5E6D0)',
        py: 8,
      }}
    >
      <HeroSection 
        onCoffeeDetailClick={() => navigate('/coffee-detail')}
        onOrderClick={() => navigate('/order')}
      />
    </Box>
  );
};

export default HomePage;