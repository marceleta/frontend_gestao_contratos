import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CssBaseline,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Routes, Route } from 'react-router-dom';
import TenantsPage from './TenantsPage';
import KanbanPage from './KanbanPage';
import logo from '../assets/images/logo.png';
import authService from '../services/authService';

const drawerWidth = 240;

const HomePage = ({ userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      {/* AppBar permanece no topo */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'primary.main',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar src={logo} alt="PropertyHub Logo" sx={{ width: 50, height: 50 }} />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
            PropertyHub
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {userName}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Espaço reservado para o AppBar */}
      <Toolbar />

      {/* Drawer posicionado abaixo da AppBar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px', // Deslocar o Drawer para baixo do AppBar (altura padrão do AppBar)
          },
        }}
      >
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="kanban">
            <ListItemText primary="Kanban" />
          </ListItem>
          <ListItem button component={Link} to="/properties">
            <ListItemText primary="Propriedades" />
          </ListItem>
          <ListItem button component={Link} to="tenants">
            <ListItemText primary="Locatários" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
            <ListItemText primary="Configurações" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginLeft: isSidebarOpen ? `${drawerWidth}px` : '15px',
          marginTop: '20px', // Margem no topo, ajustável conforme necessário
          marginRight: isSidebarOpen ? '0' : '30px',
          width: isSidebarOpen ? `calc(100% - ${drawerWidth}px)` : '98%', // Ajustar largura do conteúdo
          textAlign: isSidebarOpen ? 'left' : 'center', // Centralizar quando o menu está retraído
        }}
      >
        <Routes>
          <Route path="tenants/*" element={<TenantsPage />} />
          <Route path="kanban/*" element={<KanbanPage />} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </Box>
    </Box>
  );
};

export default HomePage;



