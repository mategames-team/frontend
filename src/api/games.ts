import axios from 'axios';
import type { Game } from '@/types/Game';
import { BASE_URL } from './http';

export interface GetGamesRequest {
  name?: string;
  page?: number;
  limit?: number;
  size?: number;
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

  if (params.name) query.set('name', params.name);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.size) query.set('size', String(params.size));
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

export const getGameById = async (apiId: string | number) => {
  const response = await axios.get<Game>(`${BASE_URL}/games/${apiId}`);

  return response.data;
};
