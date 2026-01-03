import styles from './AuthActions.module.scss';
import { Button } from '../common/Button/Button';
import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';

type Props = {
  openRegistrationModal: () => void;
  openLoginModal: () => void;
};

export const AuthActions: React.FC<Props> = ({
  openRegistrationModal,
  openLoginModal,
}) => {
  const { data, isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <div className={styles.auth}>
      {isAuthenticated ? (
        <Link to='/profile'>
          <span className={styles.auth__username}>{data?.profileName}</span>
        </Link>
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
