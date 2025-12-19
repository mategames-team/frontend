import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import LogoBook from '@/assets/logo_book.svg';

export const Logo = () => {
  return (
    <Link to='/' className={styles.logo}>
      <img src={LogoBook} alt='logo' className={styles.logo__image} />
      <div className={styles.logoText}>
        <span className={styles.logoName}>Gamer's</span>
        <span className={styles.logoDiary}>Diary</span>
      </div>
    </Link>
  );
};
