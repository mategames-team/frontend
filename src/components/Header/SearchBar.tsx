import styles from './SearchBar.module.scss';

export const SearchBar = () => {
  return (
    <div className={styles.search}>
      <input className={styles.input} type='text' placeholder='Search' />
    </div>
  );
};
