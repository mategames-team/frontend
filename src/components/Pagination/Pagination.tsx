import clsx from 'clsx';
import styles from './Pagination.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ current, total, onChange }) => {
  // const pages = Array.from({ length: total }, (_, i) => i + 1);

  const getPaginationRange = (current: number, total: number) => {
    const delta = 4;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const paginationRange = getPaginationRange(current, total);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        <ArrowLeft className={styles.icon} />
      </button>

      {paginationRange.map((page, index) => (
        <button
          key={index}
          className={clsx(
            styles.page,
            current === page && styles.active,
            page === '...' && styles.dots
          )}
          onClick={() => typeof page === 'number' && onChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrow}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        <ArrowRight className={styles.icon} />
      </button>
    </div>
  );
};
