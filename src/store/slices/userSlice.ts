import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, loginUser, registerUser } from './user.thunks';
import type { GameStatus } from '@/types/Game';

export interface UserGame {
  apiId: number;
  status: GameStatus;
}

export interface UserData {
  token?: string;
  id?: string;
  email?: string;
  profileName?: string;
  about?: string;
  location?: string;
  userGames?: UserGame[];
}

export interface UserState {
  data: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string[] | null;
}

const token = localStorage.getItem('token');

export const initialState: UserState = {
  ...(token && { data: { token } }),
  data: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      console.log('Logging out');
      state.data = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    updateGame: (
      state,
      action: { payload: { apiId: number; status: GameStatus } }
    ) => {
      if (state.data) {
        if (!state.data.userGames) {
          state.data.userGames = [];
        }

        const { apiId, status } = action.payload;
        const existingGame = state.data.userGames.find(
          (g) => g.apiId === apiId
        );

        if (existingGame) {
          existingGame.status = status;
        } else {
          state.data.userGames.push({ apiId, status });
        }
      }
    },
    deleteGame: (state, action: { payload: number }) => {
      if (state.data && state.data.userGames) {
        state.data.userGames = state.data.userGames?.filter(
          (g) => g.apiId !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string[];
        localStorage.removeItem('token');
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string[];
      });
  },
});

export const { login, logout, updateGame, deleteGame } = userSlice.actions;
export default userSlice.reducer;
