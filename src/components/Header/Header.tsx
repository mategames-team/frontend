import styles from './Header.module.scss';
import { NavLinks } from './NavLinks';
import { AuthActions } from './AuthActions';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        Gamer’s Diary
      </Link>

      <SearchBar />

      <NavLinks />

      <AuthActions />
    </header>
  );
};
