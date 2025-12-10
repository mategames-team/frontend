import styles from './Filters.module.scss';

export const Filters = () => {
  return (
    // Блок: filters
    <aside className={styles.filters}>
      <h2 className={styles.filters__title}>Resort filters</h2>

      <div className={styles.filters__section}>
        <h3 className={styles['filters__section-title']}>Platforms</h3>
        <ul className={styles['filters__list']}>
          <li className={styles['filters__list-item']}>PC</li>
          <li className={styles['filters__list-item']}>PS5</li>
          <li className={styles['filters__list-item']}>Xbox</li>
        </ul>
      </div>

      <div className={styles['filters__section']}>
        <h3 className={styles['filters__section-title']}>Genre</h3>
        <ul className={styles['filters__list']}>
          <li className={styles['filters__list-item']}>Action</li>
          <li className={styles['filters__list-item']}>Adventure</li>
          <li className={styles['filters__list-item']}>RPG</li>
        </ul>
      </div>

      <div className={styles['filters__section']}>
        <h3 className={styles['filters__section-title']}>Developer</h3>
        <ul className={styles['filters__list']}>
          <li className={styles['filters__list-item']}>Activision</li>
          <li className={styles['filters__list-item']}>EA</li>
          <li className={styles['filters__list-item']}>Ubisoft</li>
        </ul>
      </div>

      <div className={styles['filters__section']}>
        <h3 className={styles['filters__section-title']}>Year</h3>
        <ul className={styles['filters__list']}>
          <li className={styles['filters__list-item']}>2023</li>
          <li className={styles['filters__list-item']}>2022</li>
          <li className={styles['filters__list-item']}>2021</li>
        </ul>
      </div>
    </aside>
  );
};
