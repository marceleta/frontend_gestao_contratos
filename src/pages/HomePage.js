import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  CssBaseline,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ClientesPage from './ClientesPage';
import logo from '../assets/images/logo.png';
import SidebarMenu from '../components/SidebarMenu';
import authService from '../services/authService'; // Importa o serviço de autenticação

const HomePage = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Estado para verificar autenticação
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Controla a abertura do menu do usuário
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    handleMenuClose();
    navigate('/login');
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  // Verifica a autenticação antes de renderizar a página
  useEffect(() => {
    const checkAuth = () => {
      const token = authService.getToken();
      if (!token) {
        navigate('/login');
      } else {
        setIsCheckingAuth(false); // Finaliza a verificação e permite a renderização da HomePage
      }
    };

    checkAuth();
  }, [navigate]);

  // Enquanto a verificação está acontecendo, exibe uma tela de carregamento
  if (isCheckingAuth) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <CssBaseline />

      {/* Cabeçalho */}
      <AppBar
        position="fixed"
        sx={{
          height: '20px',
          backgroundColor: 'primary.main',
          display: 'flex',
          justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: '20px',
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={logo} alt="PropertyHub Logo" sx={{ width: 14, height: 14 }} />
            <Typography variant="caption" component="div" sx={{ fontSize: 12 }}>
              PropertyHub
            </Typography>
          </Box>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon sx={{ fontSize: 16 }} />
          </IconButton>

          {/* Menu suspenso do usuário */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Layout principal */}
      <Box sx={{ display: 'flex', marginTop: '20px', flexGrow: 1 }}>
        {/* Barra lateral */}
        <SidebarMenu
          isMenuOpen={isMenuOpen}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />

        {/* Conteúdo principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            overflow: 'auto',
            marginLeft: '15px',
          }}
        >
          <Routes>
            <Route path="clientes/*" element={<ClientesPage />} />
            {/* Outras rotas podem ser adicionadas aqui */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;





















