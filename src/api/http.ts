import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: '',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && !config.headers.noAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const isJwtError =
        error.response?.data?.message?.toLowerCase().includes('jwt') ||
        error.response?.data?.error?.includes('Internal Server Error');

      if (isJwtError) {
        console.warn('Token expired or invalid. Logging out...');
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
  },
);

export async function request<T>(endpoint: string): Promise<T> {
  const response = await axios.get<T>(`${BASE_URL}${endpoint}`);

  return response.data;
}
