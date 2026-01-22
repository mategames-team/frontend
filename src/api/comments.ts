import type { UserComment } from '@/types/Comment';
import { api, BASE_URL } from './http';
import type { AxiosRequestConfig } from 'node_modules/axios/index.d.cts';

export const createComment = async (
  gameApiId: number,
  text: string,
  rating: number,
) => {
  const response = await api.post<Comment>(
    `${BASE_URL}/comments/games/${gameApiId}`,
    { text, rating },
  );

  return response.data;
};

export const deleteComment = async (commentId: number) => {
  await api.delete(`${BASE_URL}/comments/${commentId}`);
};

export const updateComment = async (
  commentId: number,
  text: string,
  rating: number,
) => {
  const response = await api.patch(`${BASE_URL}/comments/${commentId}`, {
    text,
    rating: Number(rating),
  });
  console.log(response.data);

  return response.data;
};

export const getGameComments = async (gameApiId: string) => {
  const response = await api.get<{ content: UserComment[] }>(
    `${BASE_URL}/games/${gameApiId}/comments`,
    {
      skipAuth: true,
    } as AxiosRequestConfig<{ content: UserComment[] }>,
  );
  console.log(response);
  return response.data.content;
};

export const getUserComments = async (userId?: string) => {
  const response = await api.get(`${BASE_URL}/comments`, {
    params: {
      id: userId,
    },
  });
  console.log(response);
  return response.data.content;
};
