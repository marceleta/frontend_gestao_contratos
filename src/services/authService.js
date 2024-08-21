import axios from 'axios';

const API_URL = 'http://localhost:8000/api/token/';

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    // Salvando o token JWT no localStorage
    localStorage.setItem('token', response.data.access);

    return response.data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token'); // Remove o token do localStorage
  window.location.href = '/login'; // Redireciona para a página de login
};

const getToken = () => {
  return localStorage.getItem('token');
};

export default {
  login,
  logout,
  getToken,
};