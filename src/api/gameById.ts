import type { Game } from '@/types/Game';
import { request } from './http';

export const getGameById = (apiId: string | number) => {
  return request<Game>(`/games/${apiId}`);
};
