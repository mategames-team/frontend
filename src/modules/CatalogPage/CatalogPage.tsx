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
import { Pagination } from '@/components/Pagination/Pagination';

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const name = searchParams.get('name')?.toLowerCase().trim() || '';
  const platforms = searchParams.get('platforms') || '';
  const genres = searchParams.get('genres') || '';
  const year = searchParams.get('year') || '';

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      return next;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters: Record<string, string[] | string>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      Object.entries(filters).forEach(([category, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            newParams.set(category, value.join(','));
          } else {
            newParams.delete(category);
          }
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
          name,
          platforms,
          genres,
          year,
          page: currentPage - 1,
          limit: 30,
        });

        setGames(res.content);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error('Error fetching games from database:', error);
        setGames(mockGames);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [name, platforms, genres, year, currentPage]);

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
          <div>
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

            {totalPages > 1 && (
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={handlePageChange}
              />
            )}
          </div>

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
