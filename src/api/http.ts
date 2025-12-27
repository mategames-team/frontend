import axios from 'axios';

export const BASE_URL = 'http://localhost:5173/api';

export async function request<T>(endpoint: string): Promise<T> {
  const response = await axios.get<T>(`${BASE_URL}${endpoint}`);

  return response.data;
}
