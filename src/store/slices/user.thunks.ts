import {
  register,
  login,
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
} from '@/api/auth';
import { getUserData, patchUserData } from '@/api/user-data';
import type { UserData } from '@/types/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type BackendError = string[];

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: BackendError }
>('user/register', async (userData, { rejectWithValue }) => {
  try {
    const data = await register(userData);

    if (!data) {
      return rejectWithValue(['Server returned empty response']);
    }
    if (data && data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
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
        Array.isArray(serverErrors) ? serverErrors : [message],
      );
    }

    return rejectWithValue(['An unexpected error occurred']);
  }
});

export const fetchCurrentUser = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string[] }
>('user/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const data = await getUserData();

    return data;
  } catch (err) {
    console.error(err);

    return rejectWithValue(['Failed to fetch profile']);
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (payload: Partial<UserData>, { rejectWithValue }) => {
    try {
      const response = await patchUserData(payload);
      console.log('Profile updated successfully:', response);

      return response;
    } catch (error) {
      console.error('Error updating profile:', error);

      return rejectWithValue(['Update failed']);
    }
  },
);
