export interface RawgGame {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  released: string;
}

export const mapRawgToMyFormat = (rawgData: RawgGame[]) => {
  return rawgData.map((game: RawgGame) => {
    console.log('released:', game.released);
    return {
      apiId: game.id,
      name: game.name,
      apiRating: game.rating,
      backgroundImage: game.background_image,
      year: Number(game.released.slice(0, 4)) || 0,
    };
  });
};
