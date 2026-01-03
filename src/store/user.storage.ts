import type { UserState } from './slices/userSlice';

const USER_KEY = 'user';

export const loadUserState = (): UserState | undefined => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const saveUserState = (state: UserState) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(state));
  } catch {
    console.error('Error saving user state');
  }
};

export const clearUserState = () => {
  localStorage.removeItem(USER_KEY);
};
