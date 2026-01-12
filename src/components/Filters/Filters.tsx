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

const SECTIONS = [
  {
    title: 'Platforms',
    key: 'platforms',
    data: [
      { name: 'PC', value: '1' },
      { name: 'PlayStation', value: '2' },
      { name: 'Xbox', value: '3' },
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
  {
    title: 'Year',
    key: 'year',
    data: Array.from({ length: 11 }, (_, i) => ({
      name: String(2025 - i),
      value: String(2025 - i),
    })),
  },
] as const;

export const Filters: React.FC<Props> = ({
  handleFilterChange,
  isFiltersOpen,
  setIsFiltersOpen,
}) => {
  const [searchParams] = useSearchParams();

  const [localFilters, setLocalFilters] = useState<Filters>(() => ({
    platforms: searchParams.get('platforms')?.split(',').filter(Boolean) || [],
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
    year: searchParams.get('year')?.split(',').filter(Boolean) || [],
  }));

  const toggleFilter = (category: keyof Filters, value: string) => {
    const val = value.toLowerCase();

    setLocalFilters((prev) => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      };
    });
  };

  const handleAction = (clear = false) => {
    const filters = clear
      ? { platforms: [], genres: [], year: [] }
      : localFilters;

    if (clear) setLocalFilters(filters);

    handleFilterChange(filters);

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
              const isActive = localFilters[section.key].includes(
                item.value.toLowerCase()
              );
              return (
                <li
                  key={item.value}
                  className={styles.filters__listItem}
                  onClick={() => toggleFilter(section.key, item.value)}
                >
                  <div
                    className={clsx(
                      styles.checkbox,
                      isActive && styles.checkbox__active
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

      <Button variant='primary' fullWidth={true} onClick={() => handleAction()}>
        Apply filters
      </Button>
    </aside>
  );
};
