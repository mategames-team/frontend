import { GameCard } from '@/components/GameCard/GameCard';
import styles from './Carousel.module.scss';
import type { Game } from '@/types/Game';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';

interface CarouselProps {
  title: string;
  games: Game[];
}

const Carousel: React.FC<CarouselProps> = ({ title, games }) => {
  return (
    <section className={styles.carousel}>
      <div className={styles.carousel__header}>
        <h4 className={styles.carousel__title}>{title}</h4>
        <div className={styles.carousel__navigation}>
          <button
            className={`${styles.carousel__navBtn} ${styles.carousel__navBtn_disabled}`}
          >
            <ArrowLeft className={styles.carousel__navIcon} />
          </button>
          <button className={styles.carousel__navBtn}>
            <ArrowRight className={styles.carousel__navButton} />
          </button>
        </div>
      </div>
      <div className={styles.carousel__list}>
        {games.map((game, index) => (
          <GameCard size='large' key={index} game={game} />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
