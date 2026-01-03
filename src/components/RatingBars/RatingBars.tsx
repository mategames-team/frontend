import { useState } from 'react';
import styles from './RatingBars.module.scss';

type RatingBarsProps = {
  value?: number;
  onChange?: (value: number) => void;
};

const MAX = 10;

export const RatingBars = ({ value = 0, onChange }: RatingBarsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeValue = hovered ?? value;

  return (
    <div className={styles.rating} onMouseLeave={() => setHovered(null)}>
      {Array.from({ length: MAX }, (_, i) => {
        const ratingValue = i + 1;
        const isActive = ratingValue <= activeValue;
        const isSelected = ratingValue === value;

        return (
          <button
            key={ratingValue}
            type='button'
            className={`${styles.rating__item} ${
              isActive ? styles.active : ''
            } ${isSelected ? styles.isSelected : ''}`}
            onClick={() => onChange?.(ratingValue)}
            onMouseEnter={() => setHovered(ratingValue)}
            aria-label={`Rate ${ratingValue}`}
          >
            <span className={styles.rating__bar} />
            <span className={styles.rating__label}>{ratingValue}</span>
          </button>
        );
      })}
    </div>
  );
};
