import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o usuário está autenticado
  const userName = 'Marcelo'; // Isso pode vir do backend após o login

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <HomePage userName={userName} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;

