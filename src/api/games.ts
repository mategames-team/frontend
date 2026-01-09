import type { Game } from '@/types/Game';
import { BASE_URL, request } from './http';
import axios from 'axios';

export interface GetGamesRequest {
  search?: string;
  page?: number;
  limit?: number;
  genres?: string;
  platforms?: string;
  sort?: string;
  year?: string;
}

export interface GetGamesResponse {
  content: Game[];
  total: number;
  page: number;
  totalPages: number;
}

export const getGames = async (params: GetGamesRequest = {}) => {
  const query = new URLSearchParams();
  console.log(params.year);

  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.genres) query.set('genres', params.genres);
  if (params.platforms) query.set('platforms', params.platforms);
  if (params.year) query.set('year', String(params.year.split(',')[0])); // <-- fix this on backend

  const queryString = query.toString();
  const endpoint = queryString
    ? `/games/local/search?${queryString}`
    : '/games/local';

  console.log(endpoint);

  const response = await axios.get<GetGamesResponse>(`${BASE_URL}${endpoint}`);

  return response.data;
};

export const getGameById = (apiId: string | number) => {
  return request<Game>(`/games/${apiId}`);
};
