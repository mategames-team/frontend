import styles from './Header.module.scss';
import { NavLinks } from './NavLinks';
import { AuthActions } from './AuthActions';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';
import LogoBook from '@/assets/logo_book.svg';
import { RegistrationModal } from '@/components/RegistrationModal/RegistrationModal';
import { useState } from 'react';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

          <AuthActions openModal={openModal} />
        </div>
      </div>
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};
