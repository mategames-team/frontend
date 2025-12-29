import styles from './Header.module.scss';
import { NavLinks } from '../common/NavLinks/NavLinks';
import { AuthActions } from './AuthActions';
import { SearchBar } from './SearchBar';
import { RegistrationModal } from '@/components/RegistrationModal/RegistrationModal';
import { useState } from 'react';
import { LoginModal } from '../LoginModal/LoginModal';
import { Logo } from '../common/Logo/Logo';
import MenuIcon from '@/assets/icons/menu.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import { BurgerMenu } from '../common/BurgerMenu/BurgerMenu';

export const Header = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const openRegistrationModal = () => setIsRegistrationModalOpen(true);
  const closeRegistrationModal = () => setIsRegistrationModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const switchToLogin = () => {
    closeRegistrationModal();
    openLoginModal();
  };

  const switchToRegistration = () => {
    closeLoginModal();
    openRegistrationModal();
  };

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.header__content}>
          {!isSearchbarOpen && (
            <div className={styles.header__logo}>
              <Logo />
            </div>
          )}

          <div className={styles.header__search}>
            <SearchBar />
          </div>

          <div className={styles.header__navlinks}>
            <NavLinks links={['catalogue']} />
          </div>

          <div className={styles.header__auth}>
            <AuthActions
              openRegistrationModal={openRegistrationModal}
              openLoginModal={openLoginModal}
            />
          </div>

          {/* Mobile searchbar */}
          {isSearchbarOpen ? (
            <div className={styles.header__searchbarMobile}>
              <SearchBar />
              <CloseIcon
                className={styles.header__closeIcon}
                onClick={() => setIsSearchbarOpen(false)}
              />
            </div>
          ) : (
            <SearchIcon
              className={styles.header__searchIcon}
              onClick={() => setIsSearchbarOpen(!isSearchbarOpen)}
            />
          )}

          {!isSearchbarOpen && (
            <button
              className={`${styles.burger} ${
                isMenuOpen ? styles.burgerActive : ''
              }`}
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon className={styles.burger__icon} />
            </button>
          )}
        </div>

        <BurgerMenu
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          openRegistrationModal={openRegistrationModal}
          openLoginModal={openLoginModal}
        />
      </div>

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
        onSwitchToLogin={switchToLogin}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToRegistration={switchToRegistration}
      />
    </header>
  );
};
