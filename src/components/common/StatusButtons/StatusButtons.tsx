import styles from './StatusButtons.module.scss';
import SaveIcon from '@/assets/icons/games-status/save.svg?react';
import PlayingIcon from '@/assets/icons/games-status/game-controller.svg?react';
import CompletedIcon from '@/assets/icons/games-status/checkmark.svg?react';
import clsx from 'clsx';

type Props = {
  variant?: Variant;
  onAction?: (type: StatusType) => void;
  className?: string;
};

type Variant = 'compact' | 'full';

type StatusType = 'BACKLOG' | 'IN_PROGRESS' | 'COMPLETED';

const STATUS_BUTTONS = [
  {
    type: 'BACKLOG',
    label: 'Save',
    ariaLabel: 'Add to wishlist',
    Icon: SaveIcon,
  },
  {
    type: 'IN_PROGRESS',
    label: 'Playing',
    ariaLabel: 'Mark as played',
    Icon: PlayingIcon,
  },
  {
    type: 'COMPLETED',
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
      {STATUS_BUTTONS.map(({ type, label, ariaLabel, Icon }) => (
        <div key={type} className={styles.status__item}>
          <button
            type='button'
            className={styles.status__button}
            aria-label={ariaLabel}
            onClick={() => onClick?.(type as StatusType)}
            onClick={() => onClick?.(type as StatusType)}
          >
            <Icon className={styles.icon} />
          </button>

          <span className={styles.status__label}>{label}</span>
        </div>
      ))}
    </div>
  );
};
