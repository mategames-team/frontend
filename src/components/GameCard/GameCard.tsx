import type { Game } from '@/types/Game';
import styles from './GameCard.module.scss';

interface Props {
  game: Game;
  onClick?: () => void;
}

export const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <article className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={game.cover}
          alt={game.name}
          loading='lazy'
        />

        {/* Hover overlay content */}
        <div className={styles.hoverContent}>
          <button
            className={`${styles.iconButton} ${styles.backlogIcon}`}
            aria-label='Add to wishlist'
          ></button>
          <button
            className={`${styles.iconButton} ${styles.playIcon}`}
            aria-label='Mark as played'
          ></button>
          <button
            className={`${styles.iconButton} ${styles.completedIcon}`}
            aria-label='Add to profile'
          ></button>
        </div>
      </div>

      {/* Card Content */}
      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={`${styles.year} text-secondary-semibold`}>Year</span>
          <span className={`${styles.rating} text-secondary-semibold`}>
            {game.rating}
          </span>
        </div>

        <h4 className={styles.title}>{game.name}</h4>
      </div>
    </article>
  );
};
