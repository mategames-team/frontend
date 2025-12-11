import type { Game } from '@/types/Game';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameDetails.module.scss';

const mockGameData: Game = {
  apiId: 1,
  name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
  year: 2024,
  apiRating: 7.9,
  backgroundImage: 'path/to/stalker_image.png',
  description:
    'The Chernobyl Exclusion Zone changed significantly after the second explosion in 2006. Violent mutants, deadly anomalies, and warring factions made the Zone a place where survival was extremely difficult. Nevertheless, artefacts of incredible value attracted many people, known as stalkers. They ventured into the Zone at their own risk, seeking to get rich or even find the Truth hidden somewhere in the Heart of Chernobyl.',
  platforms: ['PS5', 'PC', 'Xbox XS'],
  creator: 'GSC Game World',
  genres: ['Adventure', 'Shooter', 'RPG'],
};

export const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(mockGameData);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(
        `http://localhost:8080/api/games/local/id/${gameId}`
      );
      const data = await response.json();
      setGame(data.content);
    };

    fetchGameDetails();
  }, [gameId]);

  return (
    <div className='container'>
      <section className={styles['game-details']}>
        <div className={styles['game-details__content']}>
          <div className={styles['game-details__image-block']}>
            <img
              src={game.backgroundImage}
              alt={game.name}
              className={styles['game-details__image']}
            />
          </div>

          {/* 3. Інформаційна панель */}
          <div className={styles['game-details__info']}>
            {/* Заголовок та Рейтинг */}
            <header className={styles['game-details__header']}>
              <div className={styles['game-details__title-wrapper']}>
                <h2 className={styles['game-details__title']}>{game.name}</h2>
                <p className={styles['game-details__year']}>{game.year}</p>
              </div>
              <div className={styles['game-details__rating']}>
                {game.apiRating}
              </div>
            </header>

            {/* Description */}
            <div className={styles['game-details__description-wrapper']}>
              <div>
                <h4 className={styles['game-details__description-title']}>
                  Description
                </h4>
                <p className={styles['game-details__description-text']}>
                  {game.description}
                </p>
              </div>

              {/* Status (Save, In process, Passed) */}
              <div className={styles.hoverContent}>
                <button
                  className={`${styles.iconButton} ${styles.backlogIcon}`}
                  aria-label='Add to wishlist'
                ></button>
                <button
                  className={`${styles.iconButton} ${styles.playIcon}`}
                  aria-label='Mark as played'
                ></button>
                <button
                  className={`${styles.iconButton} ${styles.completedIcon}`}
                  aria-label='Add to profile'
                ></button>
              </div>
            </div>

            {/* Details */}
            <div className={styles['game-details__details-grid']}>
              {/* Platforms */}
              <div className={styles['game-details__detail-group']}>
                <h4 className={styles['game-details__detail-title']}>
                  Platforms
                </h4>
                <p
                  className={`text-main ${styles['game-details__detail-value']}`}
                >
                  {game.platforms ? game.platforms.join(', ') : 'N/A'}
                </p>
              </div>

              {/* Creator */}
              <div className={styles['game-details__detail-group']}>
                <h4 className={styles['game-details__detail-title']}>
                  Creator
                </h4>
                <p
                  className={`text-main ${styles['game-details__detail-value']}`}
                >
                  {game.creator}
                </p>
              </div>

              {/* Genres */}
              <div className={styles['game-details__detail-group']}>
                <h4 className={styles['game-details__detail-title']}>Genre</h4>
                <p
                  className={`text-main ${styles['game-details__detail-value']}`}
                >
                  {game.genres ? game.genres.join(', ') : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
