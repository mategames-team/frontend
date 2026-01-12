import styles from './HomePage.module.scss';
import { Carousel } from './Carousel/Carousel';
import { Button } from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import type { Game } from '@/types/Game';
import { getGames } from '@/api/games';
import axios from 'axios';
import { mapRawgToMyFormat } from '@/utils/mapRawgToMyFormat';

export const HomePage = () => {
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [newGames, setNewGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGamesFromApi = async () => {
    const baseUrl =
      'https://api.rawg.io/api/games?key=6c89e34d9d5f41f8bffa498ddb3717d4&page_size=20&exclude_additions=true';

    try {
      setIsLoading(true);
      const [res2025, res2020] = await Promise.all([
        axios.get(`${baseUrl}&ordering=-added&metacritic=80,100&`),
        axios.get(`${baseUrl}&ordering=-rating&dates=2025-01-01,2025-11-30`),
      ]);

      setPopularGames(mapRawgToMyFormat(res2025.data.results));
      setNewGames(mapRawgToMyFormat(res2020.data.results));
    } catch (error) {
      console.error('Error fetching games from RAWG API', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const [allGamesRes, games2020Res] = await Promise.all([
          getGames(),
          getGames({ dates: '2025-04-01,2025-12-31' }),
        ]);
        setPopularGames(allGamesRes.content);
        setNewGames(games2020Res.content);
      } catch (error) {
        console.error('Error fetching games from database:', error);

        fetchGamesFromApi();
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (isLoading) return null;

  return (
    <div className={styles.home}>
      <div className='container'>
        <section className={styles.hero}>
          <h1 className={styles.hero__title}>
            Your library awaits — what will you play next?
          </h1>
          <div className={styles.hero__btn}>
            <Button variant='primary' fullWidth={true} to='/catalogue'>
              Choose your game
            </Button>
          </div>
        </section>

        <main className={styles.main__content}>
          <Carousel title='Popular games' games={popularGames} />
          <Carousel title='New' games={newGames} />
        </main>
      </div>
    </div>
  );
};
