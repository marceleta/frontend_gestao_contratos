import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  CssBaseline,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Routes, Route } from 'react-router-dom';
import TenantsPage from './TenantsPage';
import KanbanPage from './KanbanPage';
import logo from '../assets/images/logo.png';
import SidebarMenu from '../components/SidebarMenu';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

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
          <IconButton color="inherit">
            <AccountCircleIcon sx={{ fontSize: 16 }} />
          </IconButton>
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
            <Route path="tenants/*" element={<TenantsPage />} />
            <Route path="kanban/*" element={<KanbanPage />} />
            {/* Outras rotas podem ser adicionadas aqui */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;



















