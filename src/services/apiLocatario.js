import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/locatario/v1/', // URL base
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Redireciona para a página de login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getTenants = () => api.get('locatario');
export const getTenantById = (id) => api.get(`locatario/${id}`);
export const createTenant = (data) => api.post('locatario', data);
export const updateTenant = (id, data) => api.put(`locatario/${id}`, data);
export const deleteTenant = (id) => api.delete(`locatario/${id}`);