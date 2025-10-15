import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Auth
  auth: {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    register: (userData) => apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    me: () => apiClient.get('/auth/me'),
  },

  // Projects
  projects: {
    getAll: () => apiClient.get('/projects'),
    getOne: (id) => apiClient.get(`/projects/${id}`),
    create: (data) => apiClient.post('/projects', data),
    update: (id, data) => apiClient.put(`/projects/${id}`, data),
    delete: (id) => apiClient.delete(`/projects/${id}`),
    publish: (id) => apiClient.post(`/projects/${id}/publish`),
  },

  // Templates
  templates: {
    getAll: () => apiClient.get('/templates'),
    getOne: (id) => apiClient.get(`/templates/${id}`),
    create: (data) => apiClient.post('/templates', data),
  },

  // Assets
  assets: {
    upload: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return apiClient.post('/assets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    delete: (id) => apiClient.delete(`/assets/${id}`),
  },
};

export default apiClient;