import type { Game } from '@/types/Game';
import styles from './GameCard.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface Props {
  game: Game;
  onClick?: () => void;
  size?: Size;
}

type Size = 'small' | 'large';

export const GameCard: React.FC<Props> = ({ game, size = 'small' }) => {
  const classes = clsx(styles.card, styles[size]);

  return (
    <Link to={`/games/${game.apiId}`} className={styles.gameCardLink}>
      <article className={classes}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={game.backgroundImage}
            alt={game.name}
            loading='lazy'
          />

          {/* Hover overlay content */}
          <div className={styles.hoverContent}>
            <button
              className={`${styles.iconButton} ${styles.iconButton_backlog}`}
              aria-label='Add to wishlist'
            ></button>
            <button
              className={`${styles.iconButton} ${styles.iconButton_play}`}
              aria-label='Mark as played'
            ></button>
            <button
              className={`${styles.iconButton} ${styles.iconButton_completed}`}
              aria-label='Add to profile'
            ></button>
          </div>
        </div>

        {/* Card Content */}
        <div className={styles.info}>
          <div className={styles.meta}>
            <span className={`${styles.year} text-secondary-semibold`}>
              {game.year}
            </span>
            <span className={`${styles.rating} text-secondary-semibold`}>
              {game.apiRating}
            </span>
          </div>

          <h4 className={styles.title}>{game.name}</h4>
        </div>
      </article>
    </Link>
  );
};
