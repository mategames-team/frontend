import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: '',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function request<T>(endpoint: string): Promise<T> {
  const response = await axios.get<T>(`${BASE_URL}${endpoint}`);

  return response.data;
}
