import type { UserComment } from '@/types/Comment';
import { api, BASE_URL } from './http';

export const createComment = async (
  gameApiId: number,
  text: string,
  rating: number
) => {
  const response = await api.post<Comment>(
    `${BASE_URL}/comments/games/${gameApiId}`,
    {
      text,
      rating,
    }
  );

  return response.data;
};

export const deleteComment = async (commentId: number) => {
  await api.delete(`${BASE_URL}/comments/${commentId}`);
};

export const updateComment = async (
  commentId: number,
  text: string,
  rating: number
) => {
  await api.patch(`${BASE_URL}/comments/${commentId}`, { text, rating });
};

export const getGameComments = async (gameApiId: number) => {
  const response = await api.get<{ content: UserComment[] }>(
    `${BASE_URL}/games/${gameApiId}/comments`
  );
  console.log(response);

  return response.data.content;
};

export const getUserComments = async () => {
  const response = await api.get<{ content: UserComment[] }>(
    `${BASE_URL}/comments`
  );
  console.log('api/getUserComments', response);

  return response.data.content;
};
