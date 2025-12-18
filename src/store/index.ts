import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  initialState as userInitialState,
} from './slices/userSlice';
import { loadUserState, saveUserState } from './user.storage';

const preloadedState = {
  user: loadUserState() ?? userInitialState,
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveUserState(store.getState().user);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
