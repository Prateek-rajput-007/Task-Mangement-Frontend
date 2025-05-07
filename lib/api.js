import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-management-backend-2ifw.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [(data, headers) => {
    // Clean headers if needed
    const cleanHeaders = {...headers};
    // Remove any task-related fields that might have leaked
    delete cleanHeaders.priority;
    delete cleanHeaders.dueDate;
    delete cleanHeaders.status;
    return JSON.stringify(data);
  }]
});

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
