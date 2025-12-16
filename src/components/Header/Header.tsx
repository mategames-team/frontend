import styles from './Header.module.scss';
import { NavLinks } from './NavLinks';
import { AuthActions } from './AuthActions';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';
import LogoBook from '@/assets/logo_book.svg';

type Props = {
  onOpenRegistration: () => void;
  onOpenLogin: () => void;
};

export const Header: React.FC<Props> = ({
  onOpenRegistration,
  onOpenLogin,
}) => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.header__content}>
          <Link to='/' className={styles.logo}>
            <img src={LogoBook} alt='logo' className={styles.logo__image} />
            <div className={styles.logoText}>
              <span className={styles.logoName}>Gamer's</span>
              <span className={styles.logoDiary}>Diary</span>
            </div>
          </Link>

          <SearchBar />

          <NavLinks />

          <AuthActions
            onOpenRegistration={onOpenRegistration}
            onOpenLogin={onOpenLogin}
          />
        </div>
      </div>
    </header>
  );
};
