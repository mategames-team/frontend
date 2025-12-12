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

  // const filteredGames = games.filter((game) =>
  //   game.name.toLowerCase().includes(search)
  // ); // search filter

  const handleFilterChange = async (category: string, value: string) => {
    searchParams.set(category, value); // for trigger useEffect

    try {
      const response = await fetch(
        `http://localhost:8080/api/games/local/${category}/${value}`
      );
      const data = await response.json();
      setGames(data.content);
      console.log(games);

      return response;
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      // const params = {
      //   search: searchParams.get('search')?.toLowerCase().trim() || '',
      //   page: Number(searchParams.get('page')) || '',
      //   platform: searchParams.get('platform') || '',
      //   genre: searchParams.get('genre') || '',
      // };

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
