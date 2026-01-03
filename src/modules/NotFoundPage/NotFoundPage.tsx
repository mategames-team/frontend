import { Button } from '@/components/common/Button/Button';
import styles from './NotFoundPage.module.scss';
import { useEffect, useMemo, useState } from 'react';

const JOKES = [
  "The boss beat the page, but we're already working on revenge!",
  "The boss beat the page, but we're already working on revenge!",
  "The boss beat the page, but we're already working on revenge!",
  "The boss beat the page, but we're already working on revenge!",
];

export const NotFoundPage = () => {
  const [joke, setJoke] = useState('');

  const getRandomJoke = useMemo(
    () => () => JOKES[Math.floor(Math.random() * JOKES.length)],
    []
  );

  useEffect(() => {
    setJoke(getRandomJoke());
  }, [getRandomJoke]);

  return (
    <div className={styles.notFound}>
      <div className='container'>
        <div className={styles.notFound__content}>
          <p className={styles.notFound__subtitle}>Page not found.</p>
          <h1 className={styles.notFound__title}>404</h1>

          <h4 className={styles.notFound__text}>{joke}</h4>
        </div>
        <Button variant='primary' to='/' className={styles.notFound__returnBtn}>
          Return home
        </Button>
      </div>
    </div>
  );
};
