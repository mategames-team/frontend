import { useSearchParams } from 'react-router-dom';
import { mockGames } from '../../mock/mockGames';
import { GameCard } from '../../components/GameCard/GameCard';

export const CatalogPage = () => {
  const [searchParams] = useSearchParams();

  const search = (searchParams.get('search') || '').toLowerCase().trim();

  const filteredGames = mockGames.filter((game) =>
    game.name.toLowerCase().includes(search)
  );

  return (
    <div>
      {filteredGames.length > 0 ? (
        <ul>
          {filteredGames.map((game) => (
            <li key={game.id}>
              <GameCard game={game} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
};
