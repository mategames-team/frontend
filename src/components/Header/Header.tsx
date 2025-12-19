import styles from './Header.module.scss';
import { NavLinks } from '../common/NavLinks/NavLinks';
import { AuthActions } from './AuthActions';
import { SearchBar } from './SearchBar';
import { RegistrationModal } from '@/components/RegistrationModal/RegistrationModal';
import { useState } from 'react';
import { LoginModal } from '../LoginModal/LoginModal';
import { Logo } from '../common/Logo/Logo';

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
          <Logo />

          <SearchBar />

          <NavLinks links={['catalogue']} />

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
