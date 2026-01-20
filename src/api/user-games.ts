import type { GameDto, GameStatus } from '@/types/Game';
import { api, BASE_URL } from './http';

export const addUserGame = async (
  apiId: number,
  status: string,
): Promise<GameDto> => {
  const response = await api.post<GameDto>(
    `${BASE_URL}/user-games?status=${status}`,
    {
      apiId,
      status,
    },
  );

  console.log('/api/addUserGame.ts response:', response);
  return response.data;
};

export const getUserGames = async (status: GameStatus, userId?: string) => {
  const response = await api.get(`${BASE_URL}/user-games`, {
    params: {
      status: status,
      userId: userId,
    },
  });
  return response.data.content;
};

export const deleteUserGame = async (gameId: number) => {
  await api.delete(`${BASE_URL}/user-games/${gameId}`);
};
