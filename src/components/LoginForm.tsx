import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { auth } from '../services/userService';

const LoginForm: React.FC = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    auth({ username, password }).then((response: any) => {

      console.log("Response", response)
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('role',response.roles[0])
      window.location.reload()
    })
    console.log('Giriş bilgileri:', { username, password });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h1" color="text.primary" sx={{fontFamily:'fantasy'}} gutterBottom>
          Ha-Mi Coffe
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Adresi"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Giriş Yap
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
