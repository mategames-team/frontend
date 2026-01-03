import styles from './Loader.module.scss';

interface LoaderProps {
  progress?: number;
}

export const Loader: React.FC<LoaderProps> = ({ progress = 30 }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <p className={styles.phrase}>We are going into orbit with games...</p>
        <p className={styles.progress}>{progress}% / 100</p>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Loading</h1>
      </div>
    </div>
  );
};
