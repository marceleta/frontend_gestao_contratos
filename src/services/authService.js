import axios from 'axios';

const LOGIN_API_URL = 'http://localhost:8000/api/token/';
const PROFILE_URL = 'http://localhost:8000/api/v1/perfil/me/';

const login = async (username, password) => {
  try {
    const response = await axios.post(LOGIN_API_URL, {
      username,
      password,
    });


    // Salvar o token JWT no localStorage
    sessionStorage.setItem('token', response.data.access);
    sessionStorage.setItem('username', username);


    // Buscar informações do perfil do usuário autenticado
    const userProfile = await getUserProfile();
    sessionStorage.setItem('userId', userProfile.id);
    sessionStorage.setItem('email', userProfile.email);
    sessionStorage.setItem('permissions', JSON.stringify(userProfile.permissoes));

    return response.data;
  } catch (error) {
    console.error('Erro no login:', error);
    return Promise.reject(error);
  }
};

/**
 * Faz logout do usuário, removendo dados e redirecionando para login.
 */
const logout = () => {
  try {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('permissions');

    delete axios.defaults.headers.common['Authorization']; // Remove cabeçalho (se necessário)

    window.location.href = '/login'; // Redireciona para login
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

const getToken = () => {
  return sessionStorage.getItem('token');
};

const getUsername = () => {
  return sessionStorage.getItem('username');
};

const getUserId = () => {
  return sessionStorage.getItem('userId');
};

const getEmail = () => {
  return sessionStorage.getItem('email');
};

const getPermissions = () => {
  const permissions = sessionStorage.getItem('permissions');
  return permissions ? JSON.parse(permissions) : [];
};

/**
 * Obtém os detalhes do perfil do usuário autenticado.
 * 
 * O interceptor de requisição já adiciona automaticamente o token JWT no cabeçalho,
 * então não há necessidade de passar o token manualmente nesta requisição.
 * 
 * @returns {Promise<Object>} Dados do perfil do usuário autenticado.
 * @throws {Error} Se houver erro ao buscar o perfil.
 */
const getUserProfile = async () => {
  try {
    // Faz uma requisição GET para obter os dados do perfil do usuário
    const response = await axios.get(PROFILE_URL);

    // Retorna os dados do perfil
    return response.data;
  } catch (error) {
    // Exibe um erro no console caso a requisição falhe
    console.error('Erro ao buscar perfil do usuário:', error);

    // Rejeita a Promise para permitir o tratamento do erro no chamador da função
    return Promise.reject(error);
  }
};


// Interceptor de requisição: adiciona automaticamente o token JWT em todas as requisições
axios.interceptors.request.use(
  (config) => {
    // Verifica se a requisição é para o endpoint de login
    if (config.url.includes('/api/token/')) {
      return config; // Permite a requisição de login sem adicionar o token
    }

    // Obtém o token armazenado
    const token = getToken();

    // Se não houver token, rejeita a requisição e lança um erro
    if (!token) {
      return Promise.reject(new Error('Token não encontrado.'));
    }

    // Adiciona o token no cabeçalho da requisição
    config.headers['Authorization'] = `Bearer ${token}`;

    // Retorna a configuração da requisição modificada
    return config;
  },
  (error) => {
    // Rejeita qualquer erro que ocorra na configuração da requisição
    return Promise.reject(error);
  }
);

// Interceptor de resposta: captura erros globais e realiza ações específicas
axios.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, retorna normalmente
    return response;
  },
  (error) => {
    // Verifica se a resposta contém erro 401 (token inválido ou expirado)
    if (error.response && error.response.status === 401) {
      console.warn('Token expirado! Fazendo logout...');

      // Executa logout automático para evitar acesso não autorizado
      logout();
    }

    // Rejeita o erro para que ele possa ser tratado nos `.catch()` das requisições
    return Promise.reject(error);
  }
);


const authService = {
  login,
  logout,
  getToken,
  getUsername,
  getUserId,
  getEmail,
  getPermissions,
  getUserProfile,
};

export default authService;

