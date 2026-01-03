import type { Game, GameDto } from '@/types/Game';
import { request } from './http';
import { api } from './auth';

export interface GetGamesRequest {
  search?: string;
  page?: number;
  limit?: number;
  genres?: string;
  platforms?: string;
  sort?: string;
  year?: number;
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
  if (params.genres) query.set('genres', params.genres);
  if (params.platforms) query.set('platforms', params.platforms);
  if (params.year) query.set('year', String(params.year));

  const queryString = query.toString();
  const endpoint = queryString
    ? `/games/local/search?${queryString}`
    : '/games/local';

  return request<GetGamesResponse>(endpoint);
};

export const getGameById = (apiId: string | number) => {
  return request<Game>(`/games/${apiId}`);
};
