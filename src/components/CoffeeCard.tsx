import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography
} from '@mui/material';
import coffeLogo from '../images/coffeLogo.png';
import '../styles/cardAnimations.css';
import { Coffe } from '../types/coffeeTypes';

interface CoffeeCardProps {
  coffee: Coffe;
  onClick: () => void;
}

const CoffeeCard = ({ coffee, onClick }: CoffeeCardProps) => {
  return (
    <div className="card-animation">
      <Card
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
      >

        <CardMedia
          component="img"
          height="200"
          image={coffeLogo}
          alt={coffee?.coffeeName ?? 'Kahve görseli'}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h5" component="div">
              {coffee.coffeeName}
            </Typography>
            <Chip
              label={`${coffee.price}₺`}
              color="primary"
              size="small"
            />
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Chip
              label={`${coffee.preparationTime} dk`}
              variant="outlined"
              size="small"
            />
            <Chip
              label={`${coffee.calorie} kcal`}
              variant="outlined"
              size="small"
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoffeeCard;