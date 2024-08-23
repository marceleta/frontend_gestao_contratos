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
    localStorage.setItem('username', username);

    // Configurando o token no cabeçalho de autorização
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

    return response.data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token'); // Remove o token do localStorage
  localStorage.removeItem('username'); // Remove o nome de usuário
  delete axios.defaults.headers.common['Authorization']; // Remove o cabeçalho de autorização
  window.location.href = '/login'; // Redireciona para a página de login
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getUsername = () => {
  return localStorage.getItem('username');
};

// Configura o interceptor para adicionar o token a todas as requisições
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// eslint-disable-next-line
export default {
  login,
  logout,
  getToken,
  getUsername,
};
