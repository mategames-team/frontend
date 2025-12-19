import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.scss';

export const NavLinks = ({ links }: { links: string[] }) => {
  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <NavLink
          key={link}
          to={`/${link}`}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </NavLink>
      ))}
    </nav>
  );
};
