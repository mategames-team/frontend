// export const mapRawgToMyFormat = (rawgData: any) => {
//   return {
//     apiId: rawgData.id,
//     name: rawgData.name,
//     apiRating: rawgData.rating,
//     backgroundImage: rawgData.background_image,
//     year: rawgData.released ? new Date(rawgData.released).getFullYear() : 'N/A',
//     description: rawgData.description,
//     platforms: rawgData.platforms?.map((p: any) => p.platform.name) || [],
//     creator: rawgData.developers?.map((d: any) => d.name) || [],
//     genres: rawgData.genres?.map((g: any) => g.name) || [],
//   };
// };
