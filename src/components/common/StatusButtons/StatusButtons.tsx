import styles from './StatusButtons.module.scss';
import SaveIcon from '@/assets/icons/games-status/save.svg?react';
import PlayingIcon from '@/assets/icons/games-status/game-controller.svg?react';
import CompletedIcon from '@/assets/icons/games-status/checkmark.svg?react';
import clsx from 'clsx';
import type { GameStatus } from '@/types/Game';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
    label: 'In progress',
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
  const [clickedStatus, setClickedStatus] = useState<string | null>(null);

  const handlePress = (status: string) => {
    setClickedStatus(status);
    onAction?.(status as GameStatus);
    setTimeout(() => setClickedStatus(null), 500);
  };
  return (
    <div
      className={clsx(styles.status, styles[`status--${variant}`], className)}
    >
      {STATUS_BUTTONS.map(({ status, label, Icon }) => {
        const isActive = activeStatus === status;

        return (
          <div key={status} className={styles.status__item}>
            <motion.button
              type='button'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={clsx(
                styles.status__button,
                isActive && styles['status__button--active'],
              )}
              onClick={() => handlePress(status)}
            >
              <Icon className={styles.icon} />

              <AnimatePresence>
                {clickedStatus === status && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.status__ripple}
                  />
                )}
              </AnimatePresence>
            </motion.button>

            <span className={styles.status__label}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};
