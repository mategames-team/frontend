import styles from './AuthActions.module.scss';
import ArrowRight from '../../assets/icons/arrow-right.svg?react';
import { Button } from '../common/Button/Button';

type Props = {
  openRegistrationModal: () => void;
  openLoginModal: () => void;
};

export const AuthActions: React.FC<Props> = ({
  openRegistrationModal,
  openLoginModal,
}) => {
  return (
    <div className={styles.auth}>
      <button className={styles.auth__login} onClick={openLoginModal}>
        <span className={styles.auth__loginText}>Log in</span>
        <ArrowRight className={styles.auth__icon} />
      </button>
      <Button variant='secondary' onClick={openRegistrationModal}>
        Create account
      </Button>
    </div>
  );
};
