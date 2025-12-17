import styles from './HomePage.module.scss';
import { Carousel } from './Carousel/Carousel';
import { Button } from '@/components/common/Button/Button';
import { mockGames } from '@/mock/mockGames';
import { useEffect, useState } from 'react';
import type { Game } from '@/types/Game';
import { getGames } from '@/api/games';

export const HomePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await getGames();

        setGames(res.content);
      } catch {
        setGames(mockGames);
      }
    };
    fetchGames();
  }, []);

  console.log(games);

  return (
    <div className={styles.home}>
      <div className='container'>
        <section className={styles.hero}>
          <h1 className={styles.hero__title}>
            Your library awaits — what will you play next?
          </h1>
          <div className={styles.hero__btn}>
            <Button variant='primary' fullWidth={true}>
              Choose games
            </Button>
          </div>
        </section>

        <main className={styles.main__content}>
          <Carousel title='Popular games' games={mockGames} />
          <Carousel title='New' games={mockGames} />
        </main>
      </div>
    </div>
  );
};
