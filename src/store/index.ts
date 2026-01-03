import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import userReducer, {
  initialState as userInitialState,
} from './slices/userSlice';

import { loadUserState, saveUserState } from './user.storage';

const preloadedState = {
  user: loadUserState() ?? userInitialState,
};

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveUserState(store.getState().user);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
