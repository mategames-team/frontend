import styles from './Header.module.scss';
import { NavLinks } from './NavLinks';
import { AuthActions } from './AuthActions';
import { SearchBar } from './SearchBar';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Gamer’s Diary</div>

      <SearchBar />

      <NavLinks />

      <AuthActions />
    </header>
  );
};
