import type { Game } from '@/types/Game';
import styles from './HomePage.module.scss';
import Carousel from './Carousel/Carousel';

const popularGames: Game[] = [
  {
    apiId: 1,
    name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
    year: 2024,
    apiRating: 7.9,
    backgroundImage: '/images/stalker.jpg',
  },
  {
    apiId: 1,
    name: 'Shadow of the Colossus',
    year: 2006,
    apiRating: 9.2,
    backgroundImage: '/images/colossus.jpg',
  },
  {
    apiId: 1,
    name: 'Metroid Prime 4: Beyond',
    year: 2025,
    apiRating: 9.5,
    backgroundImage: '/images/metroid.jpg',
  },
  {
    apiId: 1,
    name: 'Ghost of Yotei',
    year: 2025,
    apiRating: 7.5,
    backgroundImage: '/images/ghost.jpg',
  },
];

const newGames: Game[] = [
  {
    apiId: 1,
    name: 'Anno 117: Pax Romana',
    year: 2025,
    apiRating: 8.3,
    backgroundImage: '/images/anno.jpg',
  },
  {
    apiId: 1,
    name: 'Metal Gear Solid & Snake Eater',
    year: 2025,
    apiRating: 7.4,
    backgroundImage: '/images/mgs.jpg',
  },
  {
    apiId: 1,
    name: 'Keeper',
    year: 2025,
    apiRating: 6.7,
    backgroundImage: '/images/keeper.jpg',
  },
  {
    apiId: 1,
    name: 'ARC Raiders',
    year: 2025,
    apiRating: 7.8,
    backgroundImage: '/images/arc.jpg',
  },
];

export const HomePage = () => {
  return (
    <div className='container'>
      <section className={styles.hero}>
        <h1 className={styles.hero__title}>
          Your library awaits — what will you play next?
        </h1>
        <button className={styles.hero__button}>Chose games</button>
      </section>

      <main className={styles.main__content}>
        <Carousel title='Popular games' games={popularGames} />
        <Carousel title='New' games={newGames} />
      </main>
    </div>
  );
};
