import styles from './StatusButtons.module.scss';
import SaveIcon from '@/assets/icons/games-status/save.svg?react';
import PlayingIcon from '@/assets/icons/games-status/game-controller.svg?react';
import CompletedIcon from '@/assets/icons/games-status/checkmark.svg?react';
import clsx from 'clsx';
import type { GameStatus } from '@/types/Game';

type Props = {
  variant?: Variant;
  onAction?: (type: GameStatus) => void;
  className?: string;
};

type Variant = 'compact' | 'full';

const STATUS_BUTTONS = [
  {
    status: 'BACKLOG',
    label: 'Save',
    ariaLabel: 'Add to wishlist',
    Icon: SaveIcon,
  },
  {
    status: 'IN_PROGRESS',
    label: 'Playing',
    ariaLabel: 'Mark as played',
    Icon: PlayingIcon,
  },
  {
    status: 'COMPLETED',
    label: 'Completed',
    ariaLabel: 'Add to profile',
    Icon: CompletedIcon,
  },
];

export const StatusButtons: React.FC<Props> = ({
  variant = 'compact',
  onAction,
  className,
}) => {
  return (
    <div
      className={clsx(styles.status, styles[`status--${variant}`], className)}
    >
      {STATUS_BUTTONS.map(({ status, label, ariaLabel, Icon }) => (
        <div key={status} className={styles.status__item}>
          <button
            type='button'
            className={styles.status__button}
            aria-label={ariaLabel}
            onClick={() => onAction?.(status as GameStatus)}
          >
            <Icon className={styles.icon} />
          </button>

          <span className={styles.status__label}>{label}</span>
        </div>
      ))}
    </div>
  );
};
