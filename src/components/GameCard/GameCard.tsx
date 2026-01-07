import type { Game } from '@/types/Game';
import styles from './GameCard.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { StatusButtons } from '../common/StatusButtons/StatusButtons';
import { useUpdateGameStatus } from '@/hooks/useUpdateGameStatus';
import { useAppSelector } from '@/store/hooks';

interface Props {
  game: Game;
  onStatusUpdated?: () => void;
  size?: Size;
  currentTabStatus?: string;
}

type Size = 'small' | 'large';

export const GameCard: React.FC<Props> = ({
  game,
  size = 'small',
  onStatusUpdated,
}) => {
  const classes = clsx(styles.card, styles[size]);

  const { updateStatus } = useUpdateGameStatus(game.apiId, onStatusUpdated);

  const { data } = useAppSelector((state) => state.user);

  const currentStatus = data?.userGames?.find(
    (g) => g.apiId === Number(game.apiId)
  )?.status;

  return (
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

        {/* Hover overlay content */}
        <div className={styles.hoverContent}>
          <StatusButtons
            onAction={(status) => updateStatus(status, currentStatus)}
            activeStatus={currentStatus}
          />
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
          <h4 className={styles.title}>{game.name}</h4>
        </Link>
      </div>
    </article>
  );
};
