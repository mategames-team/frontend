import styles from './NotFoundPage.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JOKES = [
  'Вибачте, але здається, ця сторінка втекла на каву ☕️',
  'Мережа каже "ні". Браузер каже "ні". Ми кажемо "ой" 🙈',
  'Ця сторінка – як шкарпетка з пральної машини: загадково зникла 🧦',
  'Хм… URL виглядає добре, але сторінка – як кіт: гуляє сама по собі 🐈',
];

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const [joke, setJoke] = useState('');

  const getRandomJoke = useMemo(
    () => () => JOKES[Math.floor(Math.random() * JOKES.length)],
    [],
  );

  useEffect(() => {
    setJoke(getRandomJoke());
  }, [getRandomJoke]);

  return (
    <div className={styles.notFound} aria-labelledby="nf-title">
      <div className={`${styles.card} ${styles.fadeIn}`}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Сторінку не знайдено</p>

        <p className={styles.text}>{joke}</p>

        <div className={styles.actions}>
          <button className={styles.btnGhost} onClick={() => navigate(-1)}>
            ← Назад
          </button>

          <button className={styles.btnPrimary} onClick={() => navigate('/')}>
            На головну
          </button>
        </div>
      </div>
    </div>
  );
};
