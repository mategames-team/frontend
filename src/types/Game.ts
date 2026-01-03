export type GameStatus = 'BACKLOG' | 'IN_PROGRESS' | 'COMPLETED';

export interface GamePlatform {
  generalName: string;
}

export interface GameGenre {
  name: string;
}

export interface Game {
  apiId: number;
  name: string;
  apiRating: number;
  backgroundImage: string;
  year: number;
  description?: string;
  platforms?: GamePlatform[];
  creator?: string;
  genres?: GameGenre[];
}

export interface GameDto {
  id: number;
  userId: number;
  gameDto: Game;
  status: GameStatus;
}
