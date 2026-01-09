import styles from './Filters.module.scss';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../common/Button/Button';
import CloseIcon from '@/assets/icons/close.svg?react';
import Checkbox from '@/assets/icons/checkbox-default.svg?react';
import clsx from 'clsx';

interface Props {
  handleFilterChange: (filters: Filters) => void;
  isFiltersOpen?: boolean;
  setIsFiltersOpen: (value: boolean) => void;
}

type Filters = {
  platforms: string[];
  genres: string[];
  year: string[];
};

const genres = [
  'Action',
  'Adventure',
  'RPG',
  'Platformer',
  'Shooter',
  'Indie',
  'Sports',
];

export const Filters: React.FC<Props> = ({
  handleFilterChange,
  isFiltersOpen,
  setIsFiltersOpen,
}) => {
  const [searchParams] = useSearchParams();

  const [localFilters, setLocalFilters] = useState<Filters>({
    platforms: searchParams.get('platforms')?.split(',').filter(Boolean) || [],
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
    year: searchParams.get('year')?.split(',').filter(Boolean) || [],
  });

  const toggleLocalFilter = (
    category: 'platforms' | 'genres' | 'year',
    value: string
  ) => {
    const val = value.toLowerCase();
    setLocalFilters((prev) => {
      const currentValues = prev[category];
      const isExist = currentValues.includes(val);

      return {
        ...prev,
        [category]: isExist
          ? currentValues.filter((v) => v !== val)
          : [...currentValues, val],
      };
    });
  };

  const onApply = () => {
    handleFilterChange(localFilters);

    if (isFiltersOpen) {
      setIsFiltersOpen(false);
    }
  };

  const handleReset = () => {
    const clearedFilters = {
      platforms: [],
      genres: [],
      year: [],
    };

    setLocalFilters(clearedFilters);
    handleFilterChange(clearedFilters);

    if (isFiltersOpen) {
      setIsFiltersOpen(false);
    }
  };

  const renderFilterItem = (
    category: 'platforms' | 'genres' | 'year',
    value: string
  ) => {
    const val = value.toLowerCase();
    const isActive = localFilters[category].includes(val);

    return (
      <li
        key={value}
        className={styles.filters__listItem}
        onClick={() => toggleLocalFilter(category, value)}
      >
        <div
          className={clsx(styles.checkbox, isActive && styles.checkbox__active)}
        >
          {isActive && <Checkbox />}
        </div>
        <span className='text-secondary'>{value}</span>
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
        <button
          type='button'
          className={styles.filters__resetBtn}
          onClick={handleReset}
        >
          Reset all
        </button>
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
          {['PC', 'PlayStation', 'Xbox'].map((platform) =>
            renderFilterItem('platforms', platform)
          )}
        </ul>
      </div>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Genre</h4>
        <ul className={styles.filters__list}>
          {genres.map((genre) => renderFilterItem('genres', genre))}
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
