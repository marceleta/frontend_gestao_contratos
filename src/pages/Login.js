import React, { useState } from 'react';
import logo from '../assets/images/logo.png'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from '@mui/material';

import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      await authService.login(username, password); // Usa o serviço de autenticação para login
      window.location.href = '/home';
    } catch (error) {
      setError('Falha no login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, width: 100, height: 100 }}>
            <img src={logo} alt="PropertyHub Logo" style={{ width: 120, marginBottom: 20 }} />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              color="primary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="primary"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

