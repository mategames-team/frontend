import styles from './AuthActions.module.scss';

export const AuthActions = () => {
  return (
    <div className={styles.auth}>
      <button className={styles.link}>Log in</button>
      <button className={styles.primary}>Sign up</button>
    </div>
  );
};
