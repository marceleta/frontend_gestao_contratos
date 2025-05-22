import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const SidebarMenu = ({ isMenuOpen, handleMouseEnter, handleMouseLeave }) => {
  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: isMenuOpen ? `${drawerWidth}px` : '20px',
        backgroundColor: 'primary.dark',
        cursor: 'pointer',
        transition: 'width 0.3s',
        position: 'absolute',
        height: '95%',
        paddingTop: '20px',
      }}
    >
      {/* Ícone de seta no topo da barra lateral */}
      <Box
        sx={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: '#fff',
          fontSize: '25px',
        }}
      >
        <ChevronRightIcon fontSize="large" />
      </Box>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isMenuOpen}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#fff',
            width: `${drawerWidth}px`,
            boxSizing: 'border-box',
            position: 'absolute',
            height: '100%',
            borderRadius: '0 10px 10px 0',
          },
        }}
      >
        <List>
          {[
            { text: 'Dashboard', to: '/dashboard' },
            { text: 'Propriedades', to: '/propriedades' },
            { text: 'Clientes', to: 'clientes' },
            { text: 'Configurações', to: '/config' },
          ].map((item) => (
            <ListItem
              button
              component={NavLink}
              to={item.to}
              key={item.text}
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#1976d2' : 'transparent',
                borderRadius: isActive ? '5px' : 'none',
              })}
              sx={{
                pointerEvents: 'auto',
                marginBottom: '8px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <ListItemText
                primary={item.text}
                sx={{
                  color: 'primary.main',
                  fontWeight: ({ isActive }) => (isActive ? 'bold' : 'normal'),
                  color: ({ isActive }) => (isActive ? '#fff' : 'primary.main'),
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SidebarMenu;
