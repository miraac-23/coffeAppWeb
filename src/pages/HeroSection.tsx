import {
  LocalCafe as CoffeeIcon
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import '../styles/heroAnimations.css';

interface HeroSectionProps {
  onCoffeeDetailClick: () => void;
  onOrderClick: () => void;
}

const HeroSection = ({ onCoffeeDetailClick, onOrderClick }: HeroSectionProps) => {
  return (
    <Box sx={{
      maxWidth: 1200,
      mx: 'auto',
      px: 4,
      py: 8,
      textAlign: 'center'
    }}>
      <div className="hero-title-animation">
        <Typography variant="h1" color="text.primary" gutterBottom>
         Ha-Mi Kahve Dünyasına Hoşgeldiniz
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={6}>
          Özel lezzetlerimizi keşfedin
        </Typography>
      </div>

      <Grid container spacing={4} justifyContent="center">
        
        <Grid item xs={12} md={6}>
          <div className="card-hover-animation">
            <Card
              onClick={onCoffeeDetailClick}
              sx={{
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <CardContent sx={{ py: 4 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'secondary.light',
                    color: 'primary.main',
                    mb: 3,
                    mx: 'auto'
                  }}
                >
                  <CoffeeIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h4" color="primary" gutterBottom>
                  Kahve Çeşitlerimiz
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Özel kahvelerimizi keşfedin ve detaylı bilgi alın
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onCoffeeDetailClick}
                >
                  Keşfet
                </Button>
              </CardContent>
            </Card>
          </div>
        </Grid>



      </Grid>
    </Box>
  );
};

export default HeroSection;