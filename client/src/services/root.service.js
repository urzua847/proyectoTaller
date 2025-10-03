import axios from 'axios';
import cookies from 'js-cookie';

const API_URL = '/api'; // Usamos la ruta base del proxy

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('jwt-auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;