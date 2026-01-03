import styles from './CatalogPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GameCard } from '@/components/GameCard/GameCard';
import { Filters } from '@/components/Filters/Filters';
import { Loader } from '@/components/Loader/Loader';
import { mockGames } from '@/mock/mockGames';
import { getGames } from '@/api/games';
import type { Game } from '@/types/Game';
import FiltersIcon from '@/assets/icons/filter.svg?react';

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const platforms = searchParams.get('platforms') || '';
  const genres = searchParams.get('genres') || '';
  const year = searchParams.get('year') || '';

  const handleFilterChange = (filters: Record<string, string>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      Object.entries(filters).forEach(([category, value]) => {
        if (value) {
          newParams.set(category, value);
        } else {
          newParams.delete(category);
        }
      });

      newParams.set('page', '1');
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
        <div className={styles.catalog__header}>
          <p className={`${styles.catalog__title} text-secondary`}>Catalog</p>
          <button
            className={`${styles.catalog__filtersButton} btn-text-large`}
            onClick={() => setIsFiltersOpen((prev) => !prev)}
          >
            <span>Filters</span>
            <FiltersIcon />
          </button>
        </div>

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

          <Filters
            handleFilterChange={handleFilterChange}
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>
      </div>
    </section>
  );
};
