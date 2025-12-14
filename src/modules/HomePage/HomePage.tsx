import styles from './HomePage.module.scss';
import Carousel from './Carousel/Carousel';
import { Button } from '@/components/common/Button/Button';
import { newGames, popularGames } from '@/mock/mockGames';

export const HomePage = () => {
  return (
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
        <Carousel title='Popular games' games={popularGames} />
        <Carousel title='New' games={newGames} />
      </main>
    </div>
  );
};
