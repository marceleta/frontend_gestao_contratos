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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Routes, Route } from 'react-router-dom';
import TenantsPage from './TenantsPage';
import KanbanPage from './KanbanPage';
import logo from '../assets/images/logo.png';
import authService from '../services/authService';

const drawerWidth = 240;

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <CssBaseline />
      {/* AppBar permanece no topo */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'primary.main',
          height: '30px', // Altura reduzida do AppBar
        }}
      >
        <Toolbar

          sx={{
            px: 1,
            height: '30px',
            display: 'flex', // Certifica que os elementos são flexíveis
            alignItems: 'center', // Alinha os itens verticalmente no centro
            justifyContent: 'space-between', // Distribui os itens uniformemente
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ marginRight: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar src={logo} alt="PropertyHub Logo" sx={{ width: 28, height: 28 }} />
          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginLeft: 1 }}
          >
            PropertyHub
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" sx={{ fontSize: 20 }}>
              <AccountCircleIcon fontSize="inherit" />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

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
            marginTop: '30px', // Deslocar o Drawer para baixo do AppBar ajustado
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
          marginLeft: isSidebarOpen ? `${drawerWidth}px` : '0px',
          marginTop: '30px',
          marginRight: isSidebarOpen ? '0' : '30px',
          width: isSidebarOpen ? `calc(100% - ${drawerWidth}px)` : '98%',
          textAlign: isSidebarOpen ? 'left' : 'center',
        }}
      >
        <Routes>
          <Route path="tenants/*" element={<TenantsPage />} />
          <Route path="kanban/*" element={<KanbanPage />} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>

        {/* Ajustes no cabeçalho */}
      </Box>
    </Box>
  );
};

export default HomePage;






