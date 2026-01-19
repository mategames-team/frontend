import styles from './PageLoader.module.scss';
import Logo from '@/assets/logo_book.svg';

export const PageLoader = () => (
  <div className={styles.wrapper}>
    <img src={Logo} className={styles.pulseLogo} alt='Loading...' />
  </div>
);
