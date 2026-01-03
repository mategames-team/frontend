import type { GameDto } from '@/types/Game';
import { api } from './auth';

export const addUserGame = async (
  apiId: number,
  status: string
): Promise<GameDto> => {
  const response = await api.post<GameDto>(`/api/user-games?status=${status}`, {
    apiId,
    status,
  });

  console.log('/api/addUserGame.ts response:', response);
  return response.data;
};
