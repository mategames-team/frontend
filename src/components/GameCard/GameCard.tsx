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
        <div className={styles.year}>Year</div>

        <h3 className={styles.title}>{game.name}</h3>

        <span className={styles.rating}>{game.rating.toFixed(1)}</span>
      </div>
    </article>
  );
};
