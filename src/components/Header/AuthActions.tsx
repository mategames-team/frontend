import styles from './AuthActions.module.scss';
import ArrowRight from '../../assets/icons/arrow-right.svg?react';
import { Button } from '../common/Button/Button';

export const AuthActions = () => {
  return (
    <div className={styles.auth}>
      <button className={styles.auth__login}>
        <span className={styles.auth__loginText}>Log in</span>
        <ArrowRight className={styles.auth__icon} />
      </button>
      <Button variant='secondary'>Create account</Button>
    </div>
  );
};
