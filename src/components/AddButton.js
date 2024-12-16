// AddButton.js
import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick, isLoading, children = 'Adicionar', size = 'medium', ...props }) => {
  // Estilos baseados no tamanho
  const sizeStyles = {
    small: {
      px: 1,
      py: 0.5,
      fontSize: '0.8rem',
    },
    medium: {
      px: 2,
      py: 1,
      fontSize: '1rem',
    },
    large: {
      px: 3,
      py: 1.5,
      fontSize: '1.2rem',
    },
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'success.main',
        mr: 'auto',
        borderRadius: 8,
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: 'success.dark',
        },
        '&:active': {
          transform: 'scale(0.95)',
          transition: 'transform 0.1s ease-in-out',
        },
        ...sizeStyles[size], // Aplica estilos baseados no tamanho
      }}
      onClick={onClick}
      startIcon={!isLoading ? <AddIcon /> : null}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default AddButton;

