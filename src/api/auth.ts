import type { User } from '@/types/User';
import axios from 'axios';
import { BASE_URL } from './http';

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

export interface RegisterRequest {
  profileName: string;
  email: string;
  password: string;
  repeatPassword: string;
  about?: string;
  location?: string;
}
export interface RegisterResponse {
  id: string;
  profileName: string;
  email: string;
  about?: string;
  location?: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  userId: number;
}

export const register = async (data: RegisterRequest) => {
  const response = await axios.post<RegisterResponse>(
    `${BASE_URL}/auth/registration`,
    data
  );

  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await axios.post<LoginResponse>(
    `${BASE_URL}/auth/login`,
    data
  );

  return response.data;
};

export const fetchMe = async (): Promise<User> => {
  const response = await api.get('/api/users/info');

  console.log('fetchMe response:', response);
  return response.data;
};
