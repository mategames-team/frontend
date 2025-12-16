import { useSearchParams } from 'react-router-dom';
import styles from './Filters.module.scss';
import { Button } from '../common/Button/Button';

interface Props {
  handleFilterChange: (category: string, value: string) => void;
}

export const Filters: React.FC<Props> = ({ handleFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterClick = (category: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(category, value.toLowerCase());
    setSearchParams(newParams);

    handleFilterChange(category, value);
  };

  return (
    <aside className={styles.filters}>
      <h2 className={styles.filters__title}>Resort filters</h2>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Platforms</h4>
        <ul className={styles.filters__list}>
          {['PC', 'PLAYSTATION', 'XBOX'].map((platform) => (
            <li
              key={platform}
              className={styles.filters__listItem}
              onClick={() => handleFilterClick('platform', platform)}
            >
              <span className='text-secondary'>
                {platform[0] + platform.slice(1).toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Genre</h4>
        <ul className={styles.filters__list}>
          {['Action', 'Adventure', 'RPG'].map((genre) => (
            <li
              key={genre}
              className={styles.filters__listItem}
              onClick={() => handleFilterClick('genre', genre)}
            >
              <span className='text-secondary'>{genre}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Year</h4>
        <ul className={styles.filters__list}>
          {['2023', '2022', '2021', '2020', '2019', '2018', '2017'].map(
            (year) => (
              <li
                key={year}
                className={styles.filters__listItem}
                onClick={() => handleFilterClick('year', year)}
              >
                <span className='text-secondary'>{year}</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* <button className={styles.filters__btn} disabled>
        <span className='btn-text-small'>Apply filters</span>
      </button> */}
      <Button variant='primary' fullWidth={true}>
        Apply filters
      </Button>
    </aside>
  );
};
