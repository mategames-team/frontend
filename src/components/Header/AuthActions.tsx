import styles from './AuthActions.module.scss';
import ArrowRight from '../../assets/icons/arrow-right.svg?react';
import { Button } from '../common/Button/Button';

type Props = {
  onOpenRegistration: () => void;
  onOpenLogin: () => void;
};

export const AuthActions: React.FC<Props> = ({
  onOpenRegistration,
  onOpenLogin,
}) => {
  return (
    <div className={styles.auth}>
      <button className={styles.auth__login} onClick={onOpenLogin}>
        <span className={styles.auth__loginText}>Log in</span>
        <ArrowRight className={styles.auth__icon} />
      </button>
      <Button variant='secondary' onClick={onOpenRegistration}>
        Create account
      </Button>
    </div>
  );
};
