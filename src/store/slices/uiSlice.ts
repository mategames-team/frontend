import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ModalType =
  | 'login'
  | 'registration'
  | 'authPrompt'
  | 'success'
  | null;

export interface UiState {
  isMenuOpen: boolean;
  isLoading: boolean;
  error: string | null;
  activeModal: ModalType;
}

const initialState: UiState = {
  isMenuOpen: false,
  isLoading: false,
  error: null,
  activeModal: null,
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
    setActiveModal: (state, action: PayloadAction<ModalType>) => {
      state.activeModal = action.payload;
    },
    closeAllModals: (state) => {
      state.activeModal = null;
    },
  },
});

export const {
  setIsMenuOpen,
  setLoading,
  setError,
  setActiveModal,
  closeAllModals,
} = uiSlice.actions;
export default uiSlice.reducer;
