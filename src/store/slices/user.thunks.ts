import {
  register,
  login,
  fetchMe,
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
} from '@/api/auth';
import type { User } from '@/types/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type BackendError = string[];

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: BackendError }
>('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await register(userData);

    if (!response) {
      return rejectWithValue(['Server returned empty response']);
    }

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverErrors = err.response?.data?.errors as BackendError;
      return rejectWithValue(serverErrors || [err.message]);
    }

    return rejectWithValue([
      err instanceof Error ? err.message : 'Unknown error',
    ]);
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string[] }
>('user/login', async (payload, { rejectWithValue }) => {
  try {
    const data = await login(payload);

    if (!data) {
      return rejectWithValue(['Server returned no data']);
    }
    if (data && data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverErrors = err.response?.data?.errors;
      const message = err.response?.data?.message || 'Login failed';

      return rejectWithValue(
        Array.isArray(serverErrors) ? serverErrors : [message]
      );
    }

    return rejectWithValue(['An unexpected error occurred']);
  }
});

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string[] }
>('user/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchMe();

    return data;
  } catch (err) {
    console.error(err);

    return rejectWithValue(['Failed to fetch profile']);
  }
});
