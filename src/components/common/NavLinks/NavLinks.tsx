import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.scss';

type Props = {
  links: string[];
  className?: string;
  onClick?: () => void;
};

export const NavLinks: React.FC<Props> = ({ links, className, onClick }) => {
  return (
    <nav className={`${styles.nav} ${className}`}>
      {links.map((link) => (
        <NavLink
          key={link}
          to={`/${link}`}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={onClick}
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </NavLink>
      ))}
    </nav>
  );
};
