import styles from './Filters.module.scss';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../common/Button/Button';
import CloseIcon from '@/assets/icons/close.svg?react';
import Checkbox from '@/assets/icons/checkbox-default.svg?react';
import ArrowDown from '@/assets/icons/arrow-up.svg?react';
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
      { name: 'PlayStation 5', value: '187' },
      { name: 'Xbox Series S/X', value: '186' },
      { name: 'PlayStation 4', value: '18' },
      { name: 'Xbox One', value: '1' },
      { name: 'Nintendo Switch', value: '7' },
      { name: 'iOS', value: '3' },
      { name: 'Android', value: '21' },
      { name: 'macOS', value: '5' },
      { name: 'Linux', value: '6' },
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
      { name: 'Casual', value: 'casual' },
      { name: 'Simulation', value: 'simulation' },
      { name: 'Puzzle', value: 'puzzle' },
      { name: 'Arcade', value: 'arcade' },
      { name: 'Platformer', value: 'platformer' },
      { name: 'Racing', value: 'racing' },
      { name: 'Sports', value: 'sports' },
      { name: 'Fighting', value: 'fighting' },
    ],
  },
] as const;

export const Filters: React.FC<Props> = ({
  handleFilterChange,
  isFiltersOpen,
  setIsFiltersOpen,
}) => {
  const [searchParams] = useSearchParams();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    platforms: true,
    genres: true,
    year: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
        platforms: [],
        genres: [],
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
          <button
            className={styles.filters__dropdownHeader}
            onClick={() => toggleSection(section.key)}
          >
            <h4 className={styles.filters__sectionTitle}>{section.title}</h4>
            <ArrowDown
              className={clsx(
                styles.dropdownArrow,
                openSections[section.key] && styles.dropdownArrow__active,
              )}
            />
          </button>

          <div
            className={clsx(
              styles.dropdownContainer,
              openSections[section.key] && styles.dropdownContainer__open,
            )}
          >
            <div className={styles.dropdownInner}>
              <ul className={styles.filters__list}>
                {section.data.map((item) => {
                  const currentCategory =
                    localFilters[section.key as keyof typeof localFilters] ||
                    [];
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
          </div>
        </div>
      ))}

      <div className={styles.filters__section}>
        <button
          className={styles.filters__dropdownHeader}
          onClick={() => toggleSection('year')}
        >
          <h4 className={styles.filters__sectionTitle}>Year</h4>
          <ArrowDown
            className={clsx(
              styles.dropdownArrow,
              openSections.year && styles.dropdownArrow__active,
            )}
          />
        </button>

        <div
          className={clsx(
            styles.dropdownContainer,
            openSections.year && styles.dropdownContainer__open,
          )}
        >
          <div className={styles.dropdownInner}>
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
        </div>
      </div>

      <Button variant='primary' fullWidth={true} onClick={() => handleAction()}>
        Apply filters
      </Button>
    </aside>
  );
};
