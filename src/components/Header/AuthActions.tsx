import styles from './AuthActions.module.scss';
import ArrowRight from '../../assets/icons/arrow-right.svg?react';
import { Button } from '../common/Button/Button';

type Props = {
  openModal: () => void;
};

export const AuthActions: React.FC<Props> = ({ openModal }) => {
  return (
    <div className={styles.auth}>
      <button className={styles.auth__login}>
        <span className={styles.auth__loginText}>Log in</span>
        <ArrowRight className={styles.auth__icon} />
      </button>
      <Button variant='secondary' onClick={openModal}>
        Create account
      </Button>
    </div>
  );
};
