import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GameCard } from '@/components/GameCard/GameCard';
import { mockGames } from '@/mock/mockGames';
import { getGames } from '@/api/games';
import type { Game } from '@/types/Game';

export const CatalogPage = () => {
  const [searchParams] = useSearchParams();

  const [games, setGames] = useState<Game[]>(mockGames);
  const [, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [helloMessage, setHelloMessage] = useState<string>('');
  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const page = Number(searchParams.get('page')) || 1;

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search)
  );

  const fetchGames = async () => {
    setLoading(true);

    try {
      const res = await getGames({
        search,
        page,
        limit: 10,
      });

      setGames(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.warn('Backend not ready, using mock data.', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHello = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/hello');

      setHelloMessage(await response.text());
      console.log(response);
    } catch (error) {
      console.error('Error fetching /hello endpoint:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [search, page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{helloMessage}</p>
      <button
        onClick={fetchHello}
        style={{ border: '1px solid black', padding: '12px' }}
      >
        Say hello from backend
      </button>
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
