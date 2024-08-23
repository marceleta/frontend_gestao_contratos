import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import authService from './services/authService';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Simples verificação de autenticação
  const userName = authService.getUsername()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={isAuthenticated ? <HomePage userName={userName} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;

