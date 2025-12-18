import type { User } from '@/types/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export const loginUser = createAsyncThunk<User, LoginPayload>(
  'user/login',
  async (payload) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        id: '1',
        email: payload.email,
        username: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
      };
    } catch (error) {
      throw new Error('Login failed', error as ErrorOptions | undefined);
    }
  }
);

export const registerUser = createAsyncThunk<User, RegisterPayload>(
  'user/register',
  async (payload) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        id: '1',
        email: payload.email,
        username: payload.username,
        avatarUrl: 'https://example.com/avatar.jpg',
      };
    } catch (error) {
      throw new Error('Registration failed', error as ErrorOptions | undefined);
    }
  }
);
