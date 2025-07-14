import { 
  Box, 
  Typography, 
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { LocalCafe } from '@mui/icons-material';
import '../styles/loadingAnimations.css';

interface LoadingProgressProps {
  coffeeName: string;
}

const LoadingProgress = ({ coffeeName }: LoadingProgressProps) => {
  return (
    <Box textAlign="center">
      <div className="coffee-icon-animation">
        <LocalCafe sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
      </div>
      
      <Typography variant="h4" gutterBottom>
        {coffeeName} hazırlanıyor...
      </Typography>
      
      <Typography variant="body1" color="text.secondary" mb={4}>
        Lütfen sabırla bekleyin, lezzetli kahveniz yolda!
      </Typography>
      
      <Box sx={{ width: '100%', mb: 4 }}>
        <LinearProgress 
          variant="determinate" 
          value={0} 
          sx={{ 
            height: 10,
            borderRadius: 5,
            backgroundColor: 'secondary.light',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundColor: 'primary.main',
              animation: 'progressAnimation 10s linear forwards'
            }
          }}
        />
      </Box>
      
      <CircularProgress 
        size={60} 
        thickness={5}
        sx={{ 
          color: 'primary.main',
          animation: 'spin 2s linear infinite'
        }}
      />
    </Box>
  );
};

export default LoadingProgress;