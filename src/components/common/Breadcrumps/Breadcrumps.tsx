import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumps.module.scss';
import clsx from 'clsx';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';

interface Props {
  className?: string;
  gameName?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ className, gameName }) => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbs = [
    ...pathnames.map((value, index) => ({
      name: value,
      path: `/${pathnames.slice(0, index + 1).join('/')}`,
    })),
  ];

  if (gameName && breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].name = gameName;
  }

  const uniqueBreadcrumbs = breadcrumbs.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i,
  );

  return (
    <nav
      aria-label='Breadcrumb'
      className={clsx(styles.breadcrumbs, className)}
    >
      <ul className={styles.breadcrumbs__list}>
        {uniqueBreadcrumbs.map((value, index) => {
          const isLast = index === uniqueBreadcrumbs.length - 1;

          const displayName =
            value.name.charAt(0).toUpperCase() + value.name.slice(1);

          return (
            <li key={value.name} className={styles.breadcrumbs__item}>
              {index > 0 && (
                <ArrowRight className={styles.breadcrumbs__separator} />
              )}
              {isLast ? (
                <span className={styles.breadcrumbs__current}>
                  {displayName}
                </span>
              ) : (
                <Link to={value.path} className={styles.breadcrumbs__link}>
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
