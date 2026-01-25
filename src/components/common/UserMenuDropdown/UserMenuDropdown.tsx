import styles from './UserMenuDropdown.module.scss';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import ExitIcon from '@/assets/icons/exit.svg?react';
import userAvatar from '@/assets/avatars-female/female-2.png';
import type { UserData } from '@/types/User';

type Props = {
  userData: UserData | null;
  onItemClick?: () => void;
};

export const UserMenuContent: React.FC<Props> = ({ userData, onItemClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    onItemClick?.();
    navigate('/');
  };

  return (
    <div className={styles.userMobileMenu}>
      <div className={styles.userInfo}>
        <div className={styles.userHeader}>
          <img src={userAvatar} alt='Avatar' className={styles.avatar} />
          <h3 className={styles.username}>{userData?.profileName}</h3>
        </div>

        <div className={styles.divider} />

        <div className={styles.userLinks}>
          <Link to='/profile' className={styles.item} onClick={onItemClick}>
            Profile
          </Link>
          <Link
            to='/profile/settings'
            className={styles.item}
            onClick={onItemClick}
          >
            Settings
          </Link>
          <button
            className={clsx(styles.item, styles.exit)}
            onClick={handleLogout}
          >
            <ExitIcon className={styles.icon} />
            Exit from account
          </button>
        </div>
      </div>

      <div className={styles.navigationLinks}>
        <Link to='/' className={styles.item} onClick={onItemClick}>
          Main
        </Link>
        <Link to='/catalogue' className={styles.item} onClick={onItemClick}>
          Catalogue
        </Link>
      </div>
    </div>
  );
};
