import styles from './BurgerMenu.module.scss';
import { NavLinks } from '../NavLinks/NavLinks';
import { Logo } from '../Logo/Logo';
import CloseIcon from '@/assets/icons/close.svg?react';
import { Button } from '../Button/Button';
import { useAppSelector } from '@/store/hooks';
import { UserMenuContent } from '../UserMenuDropdown/UserMenuDropdown';

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

  return (
    <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
      <div className='container'>
        <div className={styles.menu__top}>
          <Logo />
          <button onClick={closeMenu} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </div>

        {isAuthenticated ? (
          <UserMenuContent userData={data} onItemClick={closeMenu} />
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
    </div>
  );
};
