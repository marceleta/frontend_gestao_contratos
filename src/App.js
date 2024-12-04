import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'; // Importando o SnackbarProvider
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import authService from './services/authService';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Simples verificação de autenticação
  const userName = authService.getUsername();

  return (
    <SnackbarProvider
      maxSnack={3} // Define o número máximo de notificações simultâneas
      anchorOrigin={{
        vertical: 'top', // Posição no topo
        horizontal: 'right', // Posição à direita
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home/*"
            element={isAuthenticated ? <HomePage userName={userName} /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
          />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;


