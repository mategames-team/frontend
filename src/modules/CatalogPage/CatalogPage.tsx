import { useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { GameCard } from '@/components/GameCard/GameCard';
import { Filters } from '@/components/Filters/Filters';
import { Pagination } from '@/components/Pagination/Pagination';
import { GameCardSkeleton } from '@/components/GameCardSkeleton/GameCardSkeleton';
import { getGames } from '@/api/games';
import FiltersIcon from '@/assets/icons/filter.svg?react';
import type { Game } from '@/types/Game';

const SKELETON_COUNT = 8;

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const platforms = searchParams.get('platforms') || '';
  const genres = searchParams.get('genres') || '';
  const yearFrom = searchParams.get('yearFrom') || '';
  const yearTo = searchParams.get('yearTo') || '';

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      return next;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters: Filters) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      Object.entries(filters).forEach(([category, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            newParams.set(category, value.join(','));
          } else {
            newParams.delete(category);
          }
        } else {
          if (value) {
            newParams.set(category, value);
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
      let formattedDates = '';

      if (yearFrom || yearTo) {
        const start = yearFrom ? `${yearFrom}-01-01` : '1995-01-01';
        const end = yearTo ? `${yearTo}-12-31` : '2026-12-31';

        formattedDates = `${start},${end}`;
      }

      try {
        setIsLoading(true);
        const res = await getGames({
          search,
          platforms,
          genres,
          dates: formattedDates,
          page: currentPage - 1,
        });

        setGames(res.content);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error('Error fetching games from database:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [search, platforms, genres, yearFrom, yearTo, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className={styles.catalog}>
      <div className='container'>
        <div className={styles.catalog__header}>
          <p className={`${styles.catalog__title} text-secondary`}>Catalogue</p>
          <button
            className={`${styles.catalog__filtersButton} btn-text-large`}
            onClick={() => setIsFiltersOpen((prev) => !prev)}
          >
            <span>Filters</span>
            <FiltersIcon />
          </button>
        </div>

        <div className={styles.catalog__content}>
          <div className={styles.catalog__gameListWrapper}>
            {isLoading ? (
              <ul className={styles.gameList}>
                {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <li key={index} className={styles.gameList_item}>
                    <GameCardSkeleton />
                  </li>
                ))}
              </ul>
            ) : (
              <>
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
              </>
            )}

            {!isLoading && totalPages > 1 && (
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

export default CatalogPage;
