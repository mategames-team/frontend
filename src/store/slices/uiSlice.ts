import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  isMenuOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UiState = {
  isMenuOpen: false,
  isLoading: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isMenuOpen: action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setIsMenuOpen, setLoading, setError } = uiSlice.actions;
export default uiSlice.reducer;
