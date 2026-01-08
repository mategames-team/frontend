import type { UserData } from '@/types/User';
import { api, BASE_URL } from './http';

export const getUserData = async (): Promise<UserData> => {
  const response = await api.get(`${BASE_URL}/users/info`);

  console.log('fetchMe response:', response);
  return response.data;
};

export const patchUserData = async (data: UserData) => {
  const response = await api.patch(`${BASE_URL}/users/me`, data);

  return response.data;
};
