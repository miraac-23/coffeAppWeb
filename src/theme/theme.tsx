import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6F4E37',
      light: '#8B6B4D',
      dark: '#4B3621',
    },
    secondary: {
      main: '#E0C097',
      light: '#F5E6D0',
      dark: '#C9A66B',
    },
    background: {
      default: '#FFF8F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2723',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

export default theme;