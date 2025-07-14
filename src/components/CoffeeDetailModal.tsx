import { AccessTime, LocalCafe, LocalFireDepartment } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coffeLogo from '../images/coffeLogo.png';
import { AvailableProduct, getAvailableProduct } from '../services/availableProductService';
import { Coffe } from '../types/coffeeTypes';

interface CoffeeDetailModalProps {
  open: boolean;
  onClose: () => void;
  coffee: Coffe | null;
}

const CoffeeDetailModal = ({ open, onClose, coffee }: CoffeeDetailModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [products, setProducts] = useState<AvailableProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAvailableProduct();
        setProducts(data);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);


  if (!coffee) return null;

  const handleOrderClick = () => {
    onClose();
    navigate(`/order/${coffee.id}`);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: theme.shadows[10]
        }
      }}
    >
      <DialogTitle variant="h4" sx={{ textAlign: 'center', pt: 4 }}>
        {coffee.coffeeName}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>

            <Box
              component="img"
              src={coffeLogo}
              alt={coffee.coffeeName ?? 'Kahve görseli'}
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: theme.shadows[4],
                objectFit: 'cover',
                maxHeight: 300
              }}
            />

          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              {coffee.coffeeName}
            </Typography>

            <Box display="flex" gap={2} mb={3}>
              <Chip
                icon={<AccessTime />}
                label={`${coffee.preparationTime} dakika`}
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
              <Chip
                icon={<LocalFireDepartment />}
                label={`${coffee.calorie} kalori`}
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
              <Chip
                icon={<LocalCafe />}
                label={`${coffee.price}₺`}
                color="primary"
                sx={{ borderRadius: 1 }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              İçindekiler:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>

              {coffee.ingredients.map(
                (ingredient: { productId: number | null; amount: string | null }, index: number) => {
                  const matchedProduct = products.find(p => p.id === ingredient.productId);
                  const productLabel = matchedProduct?.productName ?? `ID: ${ingredient.productId ?? '-'}`;
                  return (
                    <Chip
                      key={index}
                      label={`Ürün: ${productLabel} - Miktar: ${ingredient.amount ?? '-'}`}
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  );
                }
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
          size="large"
          sx={{
            px: 3,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: theme.palette.grey[200]
            }
          }}
        >
          Kapat
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleOrderClick}
          sx={{
            px: 3,
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: theme.palette.primary.dark
            }
          }}
          startIcon={<LocalCafe />}
        >
          Sipariş Ver
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoffeeDetailModal;