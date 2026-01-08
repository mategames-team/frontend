import type { GameStatus } from './Game';

export interface User {
  id: string;
  email: string;
  profileName: string;
  avatarUrl?: string;
  about?: string;
  location?: string;
}

export interface UserData {
  token?: string;
  id?: string;
  email?: string;
  profileName?: string;
  about?: string;
  location?: string;
  avatarUrl?: string;
  userGames?: UserGame[];
}

export interface UserGame {
  apiId: number;
  status: GameStatus;
}
