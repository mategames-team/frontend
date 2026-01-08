import styles from './AuthActions.module.scss';
import { Button } from '../common/Button/Button';
import { useAppSelector } from '@/store/hooks';
import { UserDropdown } from '../common/UserDropdown/UserDropdown';
import { useEffect, useRef, useState } from 'react';

type Props = {
  openRegistrationModal: () => void;
  openLoginModal: () => void;
};

export const AuthActions: React.FC<Props> = ({
  openRegistrationModal,
  openLoginModal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.auth} ref={dropdownRef}>
      {isAuthenticated ? (
        <>
          <span
            className={styles.auth__username}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {data?.profileName}
          </span>
          {isDropdownOpen && (
            <UserDropdown onClose={() => setIsDropdownOpen(false)} />
          )}
        </>
      ) : (
        <>
          <button className={styles.auth__login} onClick={openLoginModal}>
            <span className={styles.auth__loginText}>Log in</span>
          </button>
          <Button variant='secondary' onClick={openRegistrationModal}>
            Create account
          </Button>
        </>
      )}
    </div>
  );
};
