import styles from './Filters.module.scss';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../common/Button/Button';
import CloseIcon from '@/assets/icons/close.svg?react';

interface Props {
  handleFilterChange: (filters: Record<string, string>) => void;
  isFiltersOpen?: boolean;
  setIsFiltersOpen: (value: boolean) => void;
}

export const Filters: React.FC<Props> = ({
  handleFilterChange,
  isFiltersOpen,
  setIsFiltersOpen,
}) => {
  const [searchParams] = useSearchParams();

  const [localFilters, setLocalFilters] = useState({
    platforms: searchParams.get('platforms') || '',
    genres: searchParams.get('genres') || '',
    year: searchParams.get('year') || '',
  });

  const toggleLocalFilter = (category: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [category]:
        prev[category as keyof typeof prev] === value.toLowerCase()
          ? ''
          : value.toLowerCase(),
    }));
  };

  const onApply = () => {
    handleFilterChange(localFilters);

    if (isFiltersOpen) {
      setIsFiltersOpen(false);
    }
  };

  const renderFilterItem = (category: string, value: string) => {
    const val = value.toLowerCase();
    const isActive =
      localFilters[category as keyof typeof localFilters] === val;

    return (
      <li
        key={value}
        className={`${styles.filters__listItem} ${
          isActive ? styles['filters__listItem--active'] : ''
        }`}
        onClick={() => toggleLocalFilter(category, value)}
      >
        <div className={styles.radio}>
          <div className={styles.radio__circle}></div>
        </div>
        <span className='text-secondary'>
          {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
        </span>
      </li>
    );
  };

  return (
    <aside
      className={`${styles.filters} ${
        isFiltersOpen ? styles.filters__open : ''
      }`}
    >
      <div className={styles.filters__header}>
        <h2 className={styles.filters__title}>Filters</h2>
        {isFiltersOpen && (
          <CloseIcon
            className={styles.filters__close}
            onClick={() => setIsFiltersOpen(false)}
          />
        )}
      </div>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Platforms</h4>
        <ul className={styles.filters__list}>
          {['Pc', 'Playstation', 'Xbox'].map((platform) =>
            renderFilterItem('platforms', platform)
          )}
        </ul>
      </div>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Genre</h4>
        <ul className={styles.filters__list}>
          {['Action', 'Adventure', 'RPG'].map((genre) =>
            renderFilterItem('genres', genre)
          )}
        </ul>
      </div>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Year</h4>
        <ul className={styles.filters__list}>
          {['2023', '2022', '2021', '2020', '2019', '2018', '2017'].map(
            (year) => renderFilterItem('year', year)
          )}
        </ul>
      </div>

      <Button variant='primary' fullWidth={true} onClick={onApply}>
        Apply filters
      </Button>
    </aside>
  );
};
