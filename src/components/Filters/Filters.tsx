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

export interface Filters {
  platforms: string[];
  genres: string[];
  yearFrom: string;
  yearTo: string;
}

const SECTIONS = [
  {
    title: 'Platforms',
    key: 'platforms',
    data: [
      { name: 'PC', value: '4' },
      { name: 'PlayStation', value: '187' },
      { name: 'Xbox', value: '186' },
      { name: 'Nintendo Switch', value: '7' },
    ],
  },
  {
    title: 'Genre',
    key: 'genres',
    data: [
      { name: 'Action', value: 'action' },
      { name: 'Indie', value: 'indie' },
      { name: 'Adventure', value: 'adventure' },
      { name: 'RPG', value: 'role-playing-games-rpg' },
      { name: 'Strategy', value: 'strategy' },
      { name: 'Shooter', value: 'shooter' },
    ],
  },
] as const;

export const Filters: React.FC<Props> = ({
  handleFilterChange,
  isFiltersOpen,
  setIsFiltersOpen,
}) => {
  const [searchParams] = useSearchParams();

  const [localFilters, setLocalFilters] = useState<Partial<Filters>>(() => ({
    platforms: searchParams.get('platforms')?.split(',').filter(Boolean) || [],
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
  }));

  const [yearFrom, setYearFrom] = useState(
    searchParams.get('yearFrom') || '1995',
  );
  const [yearTo, setYearTo] = useState(searchParams.get('yearTo') || '2026');

  const toggleFilter = (category: keyof Filters, value: string) => {
    setLocalFilters((prev) => {
      const current = prev[category] as string[];

      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleAction = (clear = false) => {
    if (clear) {
      setLocalFilters({ platforms: [], genres: [] });
      setYearFrom('1995');
      setYearTo('2026');
      handleFilterChange({
        platforms: localFilters.platforms || [],
        genres: localFilters.genres || [],
        yearFrom: '',
        yearTo: '',
      });
    } else {
      handleFilterChange({
        platforms: localFilters.platforms ?? [],
        genres: localFilters.genres ?? [],
        yearFrom: yearFrom || '',
        yearTo: yearTo || '',
      });
    }

    if (isFiltersOpen) setIsFiltersOpen(false);
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
          onClick={() => handleAction(true)}
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

      {SECTIONS.map((section) => (
        <div key={section.key} className={styles.filters__section}>
          <h4 className={styles.filters__sectionTitle}>{section.title}</h4>
          <ul className={styles.filters__list}>
            {section.data.map((item) => {
              const currentCategory =
                localFilters[section.key as keyof typeof localFilters] || [];
              const isActive = currentCategory.includes(item.value);
              return (
                <li
                  key={item.value}
                  className={styles.filters__listItem}
                  onClick={() => toggleFilter(section.key, item.value)}
                >
                  <div
                    className={clsx(
                      styles.checkbox,
                      isActive && styles.checkbox__active,
                    )}
                  >
                    {isActive && <Checkbox />}
                  </div>
                  <span className='text-secondary'>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Year</h4>
        <div className={styles.yearsRow}>
          <div className={styles.yearInputGroup}>
            <label className={styles.yearLabel}>From</label>
            <input
              type='number'
              className={styles.yearInput}
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              placeholder='1995'
            />
          </div>
          <div className={styles.yearInputGroup}>
            <label className={styles.yearLabel}>To</label>
            <input
              type='number'
              className={styles.yearInput}
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              placeholder='2026'
            />
          </div>
        </div>
      </div>

      <Button variant='primary' fullWidth={true} onClick={() => handleAction()}>
        Apply filters
      </Button>
    </aside>
  );
};
