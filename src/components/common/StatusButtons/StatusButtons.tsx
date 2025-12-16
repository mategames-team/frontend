import styles from './StatusButtons.module.scss';
import SaveIcon from '@/assets/icons/games-status/save.svg?react';
import PlayingIcon from '@/assets/icons/games-status/game-controller.svg?react';
import CompletedIcon from '@/assets/icons/games-status/checkmark.svg?react';
import clsx from 'clsx';

type Variant = 'compact' | 'full';

type StatusType = 'saved' | 'playing' | 'completed';

const STATUS_BUTTONS = [
  {
    type: 'saved',
    label: 'Save',
    ariaLabel: 'Add to wishlist',
    Icon: SaveIcon,
  },
  {
    type: 'playing',
    label: 'Playing',
    ariaLabel: 'Mark as played',
    Icon: PlayingIcon,
  },
  {
    type: 'completed',
    label: 'Completed',
    ariaLabel: 'Add to profile',
    Icon: CompletedIcon,
  },
];

export const StatusButtons: React.FC<{
  variant?: Variant;
  onAction?: (type: StatusType) => void;
}> = ({ variant = 'compact', onAction }) => {
  return (
    <div className={clsx(styles.status, styles[`status--${variant}`])}>
      {STATUS_BUTTONS.map(({ type, label, ariaLabel, Icon }) => (
        <div key={type} className={styles.status__item}>
          <button
            type='button'
            className={styles.status__button}
            aria-label={ariaLabel}
            onClick={() => onAction?.(type as StatusType)}
          >
            <Icon className={styles.icon} />
          </button>

          <span className={styles.status__label}>{label}</span>
        </div>
      ))}
    </div>
  );
};
