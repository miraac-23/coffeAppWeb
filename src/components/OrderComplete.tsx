import { ArrowBack, CheckCircle, LocalCafe } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/orderAnimations.css';
import { CoffeOrderResponse } from '../types/coffeeTypes';

interface OrderCompleteProps {
  coffee: CoffeOrderResponse;
}

const OrderComplete = ({ coffee }: OrderCompleteProps) => {
  const navigate = useNavigate();

  return (
    <div className="order-complete-animation">
      <Box textAlign="center" mb={6}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Siparişiniz Hazır!
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Afiyet olsun!
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  src="https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg"
                  alt={coffee.coffeeName!}
                  sx={{
                    width: 150,
                    height: 150,
                    boxShadow: 3,
                    borderRadius: 2
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {coffee.coffeeName}
              </Typography>

              <Box display="flex" gap={2} mb={2}>
                <Chip
                  icon={<LocalCafe />}
                  label={`${coffee.price}₺`}
                  color="primary"
                />
                <Chip
                  label={`${coffee.calorie} kalori`}
                  variant="outlined"
                />
              </Box>

              <Typography variant="body1" paragraph>
                {coffee.coffeeName}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                İçindekiler:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>

                {coffee.items.map((ingredient: { productName: string | null; amount: string | null }, index: number) => (
                  <Chip
                    key={index}
                    label={`${ingredient.productName ?? 'Ürün Yok'} - ${ingredient.amount ?? 'Miktar Yok'}`}
                    size="small"
                    variant="outlined"
                  />
                ))}

              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Ana Sayfaya Dön
        </Button>
      </Box>
    </div>
  );
};

export default OrderComplete;