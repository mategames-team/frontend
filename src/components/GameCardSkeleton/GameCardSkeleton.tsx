import styles from './GameCardSkeleton.module.scss';

export const GameCardSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.image} />
    <div className={styles.info}>
      <div className={styles.meta} />
      <div className={styles.title} />
    </div>
  </div>
);
