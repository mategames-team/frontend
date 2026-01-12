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
import { setActiveModal } from '@/store/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const Header = () => {
  const { activeModal } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

  const closeModals = () => dispatch(setActiveModal(null));
  const openLogin = () => dispatch(setActiveModal('login'));
  const openRegister = () => dispatch(setActiveModal('registration'));

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.header__content}>
          {!isSearchbarOpen && (
            <div className={styles.header__logo}>
              <Logo />
            </div>
          )}

          <div className={styles.header__nav}>
            <SearchBar />
            <NavLinks links={['catalogue']} />
          </div>

          <div className={styles.header__auth}>
            <AuthActions
              openRegistrationModal={openRegister}
              openLoginModal={openLogin}
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
          openRegistrationModal={openRegister}
          openLoginModal={openLogin}
        />
      </div>

      {activeModal === 'registration' && (
        <RegistrationModal
          isOpen={true}
          onClose={closeModals}
          onSwitchToLogin={openLogin}
        />
      )}

      {activeModal === 'login' && (
        <LoginModal
          isOpen={true}
          onClose={closeModals}
          onSwitchToRegistration={openRegister}
        />
      )}
    </header>
  );
};
