import type { Game } from '@/types/Game';
import { request } from './http';

export interface GetGamesRequest {
  search?: string;
  page?: number;
  limit?: number;
  genre?: string;
  platform?: string;
  sort?: string;
}

export interface GetGamesResponse {
  content: Game[];
  total: number;
  page: number;
  totalPages: number;
}

export const getGames = (params: GetGamesRequest = {}) => {
  const query = new URLSearchParams();

  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.genre) query.set('genres', params.genre);
  if (params.platform) query.set('platforms', params.platform);

  const queryString = query.toString();
  const endpoint = queryString
    ? `/api/games?${queryString}`
    : '/api/games/local';

  return request<GetGamesResponse>(endpoint);
};
