import styles from './BurgerMenu.module.scss';
import { NavLinks } from '../NavLinks/NavLinks';
import { Logo } from '../Logo/Logo';
import CloseIcon from '@/assets/icons/close.svg?react';
import { Button } from '../Button/Button';
import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';

type Props = {
  isMenuOpen: boolean;
  closeMenu: () => void;
  openRegistrationModal: () => void;
  openLoginModal: () => void;
};

export const BurgerMenu: React.FC<Props> = ({
  isMenuOpen,
  closeMenu,
  openRegistrationModal,
  openLoginModal,
}) => {
  const { data, isAuthenticated } = useAppSelector((state) => state.user);
  console.log(isAuthenticated, data);

  return (
    <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
      <div className={styles.menu__top}>
        <Logo />
        <button onClick={closeMenu} className={styles.closeButton}>
          <CloseIcon />
        </button>
      </div>

      {isAuthenticated ? (
        <Link to='/profile'>
          <span className={styles.auth__username}>{data?.profileName}</span>
        </Link>
      ) : (
        <nav>
          <NavLinks
            onClick={closeMenu}
            links={['home', 'catalogue', 'profile']}
            className={styles.menu__links}
          />

          <Button
            variant='secondary'
            onClick={openLoginModal}
            className={styles.menu__button}
            fullWidth={true}
          >
            Log in
          </Button>
          <div className={styles.menu__register}>
            Do you not have an account?&nbsp;
            <button
              type='button'
              onClick={openRegistrationModal}
              className={styles.menu__registerLink}
            >
              Create account
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};
