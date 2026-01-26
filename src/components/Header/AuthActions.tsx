import styles from './AuthActions.module.scss';
import { Button } from '../common/Button/Button';
import { useAppSelector } from '@/store/hooks';
import { UserDropdown } from '../common/UserDropdown/UserDropdown';
import { useEffect, useRef, useState } from 'react';
import { AVATARS, getDefaultAvatar } from '@/utils/avatars';

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

  const avatarSrc =
    data?.avatarUrl && AVATARS[data.avatarUrl]
      ? AVATARS[data.avatarUrl]
      : getDefaultAvatar();

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
          <img
            className={styles.auth__avatar}
            src={avatarSrc}
            alt='avatar'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
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
