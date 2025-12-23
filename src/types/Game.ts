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
