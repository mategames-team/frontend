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

  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const page = Number(searchParams.get('page')) || 1;

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search)
  );

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      try {
        const res = await getGames({ search });

        setGames(res.content);
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
        <div className={styles.catalog__content}>
          {filteredGames.length > 0 ? (
            <ul className={styles.gameList}>
              {filteredGames.map((game) => (
                <li key={game.apiId} className={styles.gameList_item}>
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
