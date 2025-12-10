import { useSearchParams } from 'react-router-dom';
import styles from './Filters.module.scss';

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterClick = (category: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(category, value.toLowerCase());
    setSearchParams(newParams);
  };

  return (
    <aside className={styles.filters}>
      <h2 className={styles.filters__title}>Resort filters</h2>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Platforms</h4>
        <ul className={styles.filters__list}>
          {['PC', 'PS5', 'Xbox'].map((platform) => (
            <li
              key={platform}
              className={styles.filters__listItem}
              onClick={() => handleFilterClick('platform', platform)}
            >
              <span className='text-secondary'>{platform}</span>
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
        <h4 className={styles.filters__sectionTitle}>Developer</h4>
        <ul className={styles.filters__list}>
          {['Ubisoft', 'EA', 'Bethesda'].map((developer) => (
            <li
              key={developer}
              className={styles.filters__listItem}
              onClick={() => handleFilterClick('developer', developer)}
            >
              <span className='text-secondary'>{developer}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.filters__section}>
        <h4 className={styles.filters__sectionTitle}>Year</h4>
        <ul className={styles.filters__list}>
          {['2023', '2022', '2021'].map((year) => (
            <li
              key={year}
              className={styles.filters__listItem}
              onClick={() => handleFilterClick('year', year)}
            >
              <span className='text-secondary'>{year}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className={styles.filters__btn}>
        <span className='btn-text-small'>Apply filters</span>
      </button>
    </aside>
  );
};
