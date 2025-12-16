import styles from './Header.module.scss';
import { NavLinks } from './NavLinks';
import { AuthActions } from './AuthActions';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';
import LogoBook from '@/assets/logo_book.svg';
import { RegistrationModal } from '@/components/RegistrationModal/RegistrationModal';
import { useState } from 'react';
import { LoginModal } from '../LoginModal/LoginModal';

export const Header = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
          <Link to='/' className={styles.logo}>
            <img src={LogoBook} alt='logo' className={styles.logo__image} />
            <div className={styles.logoText}>
              <span className={styles.logoName}>Gamer's</span>
              <span className={styles.logoDiary}>Diary</span>
            </div>
          </Link>

          <SearchBar />

          <NavLinks />

          <AuthActions
            openRegistrationModal={openRegistrationModal}
            openLoginModal={openLoginModal}
          />
        </div>
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
