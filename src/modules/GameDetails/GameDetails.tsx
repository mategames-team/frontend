import type { Game } from '@/types/Game';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameDetails.module.scss';
import { StatusButtons } from '@/components/common/StatusButtons/StatusButtons';
import { GameRatingForm } from './GameRatingForm/GameRatingForm';
import { GameReviews } from './GameReviews/GameReviews';
import { Loader } from '@/components/Loader/Loader';
import { getGameById } from '@/api/games';

const mockGameData: Game = {
  apiId: 1,
  name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
  year: 2024,
  apiRating: 7.9,
  backgroundImage:
    'https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg',
  description:
    'The Chernobyl Exclusion Zone changed significantly after the second explosion in 2006. Violent mutants, deadly anomalies, and warring factions made the Zone a place where survival was extremely difficult. Nevertheless, artefacts of incredible value attracted many people, known as stalkers. They ventured into the Zone at their own risk, seeking to get rich or even find the Truth hidden somewhere in the Heart of Chernobyl.',
  platforms: [{ generalName: 'PC' }, { generalName: 'Xbox Series X' }],
  creator: 'GSC Game World',
  genres: [{ name: 'Action' }, { name: 'Shooter' }, { name: 'Horror' }],
};

export const GameDetails = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const { gameId } = useParams<{ gameId: string }>();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);

        const response = await getGameById(gameId!);

        setGame(response);
      } catch (error) {
        setGame(mockGameData);
        console.error('Error fetching game details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const paragraphs = game?.description?.split('</p>') ?? [];
  const shortDescription = paragraphs.slice(0, 1).join('</p>') + '</p>';

  const isDescExpanded = () =>
    isExpanded ? game?.description : shortDescription;

  if (isLoading || !game) {
    return <Loader progress={70} />;
  }

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

          <StatusButtons
            variant='full'
            className={styles.statusBtn__onMobile}
          />

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
                <div
                  className={`${styles.gameDetails__descriptionText} text-main`}
                  dangerouslySetInnerHTML={{
                    __html: isDescExpanded() || '',
                  }}
                />

                {paragraphs.length > 2 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={styles.readMoreBtn}
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>

              <StatusButtons
                variant='full'
                className={styles.statusBtn__onDesktop}
              />
            </div>

            <div className={styles.gameDetails__detailsGrid}>
              {/* Platforms */}
              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Platforms</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.platforms
                    ?.map((platform) => platform.generalName)
                    .join(', ') ?? 'N/A'}
                </p>
              </div>

              {/* Genres */}
              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Genre</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.genres?.map((genre) => genre.name).join(', ') ?? 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.gameDetails__rateAction}>
          <GameRatingForm gameId={game.apiId} onSubmissionSuccess={() => {}} />
        </div>

        <GameReviews />
      </section>
    </div>
  );
};
