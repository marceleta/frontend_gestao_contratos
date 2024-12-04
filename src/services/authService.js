import axios from 'axios';

const API_URL = 'http://localhost:8000/api/token/';
const PROFILE_URL = 'http://localhost:8000/api/v1/perfil/me/';

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });


    // Salvar o token JWT no localStorage
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('username', username);

    // Configurar o cabeçalho de autorização para requisições subsequentes
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

    // Buscar informações do perfil do usuário autenticado
    const userProfile = await getUserProfile();
    localStorage.setItem('userId', userProfile.id);
    localStorage.setItem('email', userProfile.email);
    localStorage.setItem('permissions', JSON.stringify(userProfile.permissoes));

    return response.data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

const logout = () => {
  // Remover todos os dados do localStorage relacionados ao usuário
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  localStorage.removeItem('permissions');

  // Remover o cabeçalho de autorização
  delete axios.defaults.headers.common['Authorization'];

  // Redirecionar para a página de login
  window.location.href = '/login';
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getUsername = () => {
  return localStorage.getItem('username');
};

const getUserId = () => {
  return localStorage.getItem('userId');
};

const getEmail = () => {
  return localStorage.getItem('email');
};

const getPermissions = () => {
  const permissions = localStorage.getItem('permissions');
  return permissions ? JSON.parse(permissions) : [];
};

const getUserProfile = async () => {
  try {
    const response = await axios.get(PROFILE_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    throw error;
  }
};

// Configurar o interceptor para adicionar o token a todas as requisições
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

// Exportar todas as funções
export default {
  login,
  logout,
  getToken,
  getUsername,
  getUserId,
  getEmail,
  getPermissions,
  getUserProfile,
};
