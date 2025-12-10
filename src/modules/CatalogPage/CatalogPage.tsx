import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GameCard } from '@/components/GameCard/GameCard';
import { Filters } from '@/components/Filters/Filters';
import { mockGames } from '@/mock/mockGames';
import { getGames } from '@/api/games';
import type { Game } from '@/types/Game';

import styles from './CatalogPage.module.scss';

export const CatalogPage = () => {
  const [searchParams] = useSearchParams();

  const [games, setGames] = useState<Game[]>(mockGames);
  const [, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // const [helloMessage, setHelloMessage] = useState<string>('');
  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const page = Number(searchParams.get('page')) || 1;

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search)
  );

  // const fetchHello = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/hello');

  //     setHelloMessage(await response.text());
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error fetching /hello endpoint:', error);
  //   }
  // };

  useEffect(() => {
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
      } catch {
        setGames(mockGames);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [search, page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className={styles.catalog}>
      <div className='container'>
        {/* <p>{helloMessage}</p>
        <button
          onClick={fetchHello}
          style={{ border: '1px solid black', padding: '12px' }}
        >
          Say hello from backend
        </button> */}
        <div className={styles.catalog__content}>
          {filteredGames.length > 0 ? (
            <ul className={styles.gameList}>
              {filteredGames.map((game) => (
                <li key={game.id} className={styles.gameList_item}>
                  <GameCard game={game} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No games found</p>
          )}

          <Filters />
        </div>
      </div>
    </section>
  );
};
