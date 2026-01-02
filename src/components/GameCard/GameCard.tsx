import type { Game } from '@/types/Game';
import styles from './GameCard.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { StatusButtons } from '../common/StatusButtons/StatusButtons';
import { addUserGame } from '@/api/games';
import { addUserGame } from '@/api/games';

interface Props {
  game: Game;
  onClick?: () => void;
  size?: Size;
}

type Size = 'small' | 'large';

export const GameCard: React.FC<Props> = ({ game, size = 'small' }) => {
  const classes = clsx(styles.card, styles[size]);

  const addGameToStatus = async (type: string) => {
    console.log('Adding game to status:', type);
    try {
      await addUserGame(game.apiId, type);
    } catch (error) {
      console.error('Error adding game to status:', error);
    }
  };

  const addGameToStatus = async (type: string) => {
    console.log('Adding game to status:', type);
    try {
      await addUserGame(game.apiId, type);
    } catch (error) {
      console.error('Error adding game to status:', error);
    }
  };

  return (
    <article className={classes}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <Link to={`/games/${game.apiId}`} className={styles.gameCardLink}>
    <article className={classes}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <Link to={`/games/${game.apiId}`} className={styles.gameCardLink}>
          <img
            className={styles.image}
            src={game.backgroundImage}
            alt={game.name}
            loading='lazy'
          />
        </Link>
        </Link>

        {/* Hover overlay content */}
        <div className={styles.hoverContent}>
          <StatusButtons onClick={addGameToStatus} />
        </div>
      </div>
        {/* Hover overlay content */}
        <div className={styles.hoverContent}>
          <StatusButtons onClick={addGameToStatus} />
        </div>
      </div>

      {/* Card Content */}
      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={`${styles.year} text-secondary-semibold`}>
            {game.year}
          </span>
          <span className={`${styles.rating} text-secondary-semibold`}>
            {game.apiRating.toFixed(1)}
          </span>
        </div>

        <Link to={`/games/${game.apiId}`}>
        <Link to={`/games/${game.apiId}`}>
          <h4 className={styles.title}>{game.name}</h4>
        </Link>
      </div>
    </article>
        </Link>
      </div>
    </article>
  );
};
