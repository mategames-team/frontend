import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.scss';

export const NavLinks = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to='/catalog'
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Catalogue
      </NavLink>
    </nav>
  );
};
