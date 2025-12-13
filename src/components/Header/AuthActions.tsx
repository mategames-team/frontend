import styles from './AuthActions.module.scss';
import ArrowRight from '../../assets/icons/arrow-right.svg?react';

export const AuthActions = () => {
  return (
    <div className={styles.auth}>
      <button className={styles.auth__login}>
        <span className={styles.auth__loginText}>Log in</span>
        <ArrowRight className={styles.icon} />
      </button>
      <button className={styles.auth__register}>Create account</button>
    </div>
  );
};
