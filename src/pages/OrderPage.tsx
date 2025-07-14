import { ArrowBack } from '@mui/icons-material';
import {
  Button,
  Container,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingProgress from '../components/LoadingProgress';
import OrderComplete from '../components/OrderComplete';
import { coffeOrder } from '../services/coffeService';
import { CoffeOrderResponse } from '../types/coffeeTypes';



const OrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);
  const [coffee, setCoffee] = useState<CoffeOrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const coffeeId = Number(id);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const data = await coffeOrder(coffeeId);
        setCoffee(data);
        setTimeout(() => {
          setLoading(false);
          setOrderComplete(true);
        }, 10000);
      } catch {
        setError('Kahve sipariş bilgisi alınamadı.');
        setLoading(false);
      }
    };

    fetchCoffee();
  }, [coffeeId]);

  if (error || !coffee) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {error ?? 'Kahve bulunamadı'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Ana Sayfaya Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {loading ? (
        <LoadingProgress coffeeName={coffee.coffeeName!} />
      ) : orderComplete ? (
        <OrderComplete coffee={coffee} />
      ) : (
        <Typography textAlign="center">Sipariş hazırlanıyor...</Typography>
      )}
    </Container>
  );
};

export default OrderPage;
