import axios from 'axios';

export const BASE_URL = 'http://localhost:8080/api';

export async function request<T>(endpoint: string): Promise<T> {
  const response = await axios.get<T>(`${BASE_URL}${endpoint}`);

  return response.data;
}
