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
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Routes, Route } from 'react-router-dom';
import TenantsPage from './TenantsPage';
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Container>
          <Routes>
            <Route path="tenants/*" element={<TenantsPage />} />
            {/* Outras rotas podem ser adicionadas aqui */}
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

