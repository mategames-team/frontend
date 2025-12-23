import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GameCard } from '@/components/GameCard/GameCard';
import { Filters } from '@/components/Filters/Filters';
import { mockGames } from '@/mock/mockGames';
import { getGames } from '@/api/games';
import type { Game } from '@/types/Game';

import styles from './CatalogPage.module.scss';
import { Loader } from '@/components/Loader/Loader';

export const CatalogPage = () => {
  // const RAWG_API_KEY = import.meta.env.RAWG_API_KEY;
  const [searchParams, setSearchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const platforms = searchParams.get('platforms') || '';
  const genres = searchParams.get('genres') || '';
  const year = searchParams.get('year') || '';

  const handleFilterChange = (filters: Record<string, string>) => {
    setSearchParams((prev) => {
      // Створюємо нову копію на основі поточних параметрів
      const newParams = new URLSearchParams(prev);

      Object.entries(filters).forEach(([category, value]) => {
        if (value) {
          newParams.set(category, value);
        } else {
          newParams.delete(category);
        }
      });

      newParams.set('page', '1'); // Завжди скидаємо на першу сторінку
      return newParams;
    });
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);

        const res = await getGames({
          search,
          platforms,
          genres,
          year: year ? Number(year) : undefined,
        });

        setGames(res.content);
      } catch (error) {
        console.error('Error fetching games from database:', error);
        setGames(mockGames);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [search, platforms, genres, year]);

  if (isLoading) {
    return <Loader progress={99} />;
  }

  return (
    <section className={styles.catalog}>
      <div className='container'>
        <div className={styles.catalog__content}>
          {games.length > 0 ? (
            <ul className={styles.gameList}>
              {games.map((game) => (
                <li key={game.apiId} className={styles.gameList_item}>
                  <GameCard game={game} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No games found</p>
          )}

          <Filters handleFilterChange={handleFilterChange} />
        </div>
      </div>
    </section>
  );
};
