export interface Game {
  apiId: number;
  name: string;
  apiRating: number;
  backgroundImage: string;
  year: number;
  description?: string;
  platforms?: string[];
  creator?: string;
  genres?: string[];
}
