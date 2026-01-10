import type { Game } from '@/types/Game';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameDetails.module.scss';
import { StatusButtons } from '@/components/common/StatusButtons/StatusButtons';
import { GameRatingForm } from './GameRatingForm/GameRatingForm';
import { GameReviews } from './GameReviews/GameReviews';
import { getGameById } from '@/api/games';
import { useUpdateGameStatus } from '@/hooks/useUpdateGameStatus';
import { useAppSelector } from '@/store/hooks';

export const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data } = useAppSelector((state) => state.user);

  const currentStatus = data?.userGames?.find(
    (g) => g.apiId === Number(gameId)
  )?.status;

  const { updateStatus } = useUpdateGameStatus(Number(gameId));

  // Fetch game details
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);

        const response = await getGameById(gameId!);

        setGame(response);
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  // Shorten description
  const paragraphs = game?.description?.split('</p>') ?? [];
  const shortDescription = paragraphs.slice(0, 1).join('</p>') + '</p>';

  const isDescExpanded = () =>
    isExpanded ? game?.description : shortDescription;

  if (isLoading || !game) return null;

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
            onAction={(status) => updateStatus(status, currentStatus)}
            activeStatus={currentStatus}
          />

          <div className={styles.gameDetails__info}>
            <header className={styles.gameDetails__header}>
              <div className={styles.gameDetails__titleWrapper}>
                <h2 className={styles.gameDetails__title}>{game.name}</h2>
                <p className={styles.gameDetails__year}>{game.year}</p>
              </div>
              <div className={styles.gameDetails__rating}>
                {game.apiRating.toFixed(1)}
              </div>
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
                onAction={(status) => updateStatus(status, currentStatus)}
                activeStatus={currentStatus}
              />
            </div>

            <div className={styles.gameDetails__detailsGrid}>
              {/* Platforms */}
              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Platforms</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.platforms
                    ?.map((platform) => platform.generalName.replace('_', ' '))
                    .join(', ')}
                </p>
              </div>

              {/* Genres */}
              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Genre</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.genres?.map((g) => g.name).join(', ') ?? 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.gameDetails__rateAction}>
          <GameRatingForm
            gameApiId={game.apiId}
            onSubmissionSuccess={() => {}}
          />
        </div>

        <GameReviews gameApiId={game.apiId} />
      </section>
    </div>
  );
};
