import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import CoffeeDetailModal from '../components/CoffeeDetailModal';
import CoffeeList from '../components/CoffeeList';
import { getCoffe } from '../services/coffeService';
import { Coffe } from '../types/coffeeTypes';

const CoffeeDetailPage = () => {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffe | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [coffees, setCoffees] = useState<Coffe[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const data = await getCoffe();
        setCoffees(data);
      } catch (err) {
        setError('Kahveler yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  const handleCardClick = (coffee: Coffe) => {
    setSelectedCoffee(coffee);
    setOpenModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" gutterBottom>
          Kahve Menümüz
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Özel lezzetlerimizi keşfedin
        </Typography>
      </Box>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          <CoffeeList coffees={coffees} onCardClick={handleCardClick} />
        </Grid>
      )}

      <CoffeeDetailModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        coffee={selectedCoffee}
      />
    </Container>
  );
};

export default CoffeeDetailPage;
