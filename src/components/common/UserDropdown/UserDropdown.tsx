import styles from './UserDropdown.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import ExitIcon from '@/assets/icons/exit.svg?react';
import clsx from 'clsx';

interface Props {
  onClose: () => void;
}

export const UserDropdown: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <div className={styles.dropdown}>
      <Link to='/profile' className={styles.item} onClick={onClose}>
        Profile
      </Link>
      <Link to='/profile/settings' className={styles.item} onClick={onClose}>
        Settings
      </Link>
      <button className={clsx(styles.item, styles.exit)} onClick={handleLogout}>
        <ExitIcon className={styles.icon} />
        Exit from account
      </button>
    </div>
  );
};
