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
  activeStatus?: GameStatus;
};

type Variant = 'compact' | 'full';

const STATUS_BUTTONS = [
  {
    status: 'BACKLOG',
    label: 'Save',
    Icon: SaveIcon,
  },
  {
    status: 'IN_PROGRESS',
    label: 'Playing',
    Icon: PlayingIcon,
  },
  {
    status: 'COMPLETED',
    label: 'Completed',
    Icon: CompletedIcon,
  },
];

export const StatusButtons: React.FC<Props> = ({
  variant = 'compact',
  onAction,
  className,
  activeStatus,
}) => {
  return (
    <div
      className={clsx(styles.status, styles[`status--${variant}`], className)}
    >
      {STATUS_BUTTONS.map(({ status, label, Icon }) => (
        <div key={status} className={styles.status__item}>
          <button
            type='button'
            className={clsx(
              styles.status__button,
              activeStatus === status && styles['status__button--active'],
            )}
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
