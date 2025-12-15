import type { Game } from '@/types/Game';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameDetails.module.scss';
import { StatusButtons } from '@/components/common/StatusButtons/StatusButtons';

const mockGameData: Game = {
  apiId: 1,
  name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
  year: 2024,
  apiRating: 7.9,
  backgroundImage: '../../assets/react.svg',
  description:
    'The Chernobyl Exclusion Zone changed significantly after the second explosion in 2006. Violent mutants, deadly anomalies, and warring factions made the Zone a place where survival was extremely difficult. Nevertheless, artefacts of incredible value attracted many people, known as stalkers. They ventured into the Zone at their own risk, seeking to get rich or even find the Truth hidden somewhere in the Heart of Chernobyl.',
  platforms: ['PS5', 'PC', 'Xbox XS'],
  creator: 'GSC Game World',
  genres: ['Adventure', 'Shooter', 'RPG'],
};

export const GameDetails = () => {
  const { gameId } = useParams();
  const [game] = useState(mockGameData);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/games/local/id/${2}`
        );
        const data = await response.json();
        console.log(data.content);
        // setGame(data.content);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  return (
    <div className='container'>
      <section className={styles.gameDetails}>
        <div className={styles.gameDetails__сontent}>
          <div className={styles.gameDetails__imageBlock}>
            <img
              src={`${game.backgroundImage}`}
              alt={game.name}
              className={styles.gameDetails__image}
            />
          </div>

          <div className={styles.gameDetails__info}>
            <header className={styles.gameDetails__header}>
              <div className={styles.gameDetails__titleWrapper}>
                <h2 className={styles.gameDetails__title}>{game.name}</h2>
                <p className={styles.gameDetails__year}>{game.year}</p>
              </div>
              <div className={styles.gameDetails__rating}>{game.apiRating}</div>
            </header>

            {/* Description */}
            <div className={styles.gameDetails__descriptionWrapper}>
              <div>
                <h4 className={styles.gameDetails__descriptionTitle}>
                  Description
                </h4>
                <p className={styles.gameDetails__descriptionText}>
                  {game.description}
                </p>
              </div>

              {/* Status (Save, In process, Passed) */}
              <StatusButtons variant='full' />
            </div>

            <div className={styles.gameDetails__detailsGrid}>
              {/* Platforms */}
              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Platforms</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.platforms?.join(', ') ?? 'N/A'}
                </p>
              </div>

              {/* Creator */}
              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Creator</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.creator}
                </p>
              </div>

              {/* Genres */}
              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Genre</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.genres?.join(', ') ?? 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
