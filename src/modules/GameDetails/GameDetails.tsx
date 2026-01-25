import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameDetails.module.scss';
import { StatusButtons } from '@/components/common/StatusButtons/StatusButtons';
import { GameRatingForm } from './GameRatingForm/GameRatingForm';
import { GameReviews } from './GameReviews/GameReviews';
import { getGameById } from '@/api/games';
import { useUpdateGameStatus } from '@/hooks/useUpdateGameStatus';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import { getGameComments } from '@/api/comments';
import type { Game } from '@/types/Game';
import type { UserComment } from '@/types/Comment';
import { setActiveModal } from '@/store/slices/uiSlice';
import { Breadcrumbs } from '@/components/common/Breadcrumps/Breadcrumps';

const processDescription = (htmlDescription: string | undefined) => {
  if (!htmlDescription) return [];

  const cleanHtml = htmlDescription.replace(/^<p>/, '').replace(/<\/p>$/, '');

  const normalized = cleanHtml
    .replace(/<\/p>\s*<p>/g, '|')
    .replace(/<br\s*\/?>/g, '|')
    .replace(/\n/g, '|');

  return normalized
    .split('|')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
};

const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const currentStatus = data?.userGames?.find(
    (g) => g.apiId === Number(gameId),
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

  // Fetch comments
  const fetchGameReviews = useCallback(async () => {
    if (!gameId) return;

    setIsCommentsLoading(true);

    try {
      const response = await getGameComments(gameId);
      setComments(response);
    } catch (error) {
      console.error('Error fetching game reviews:', error);
    } finally {
      setIsCommentsLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGameReviews();
  }, [fetchGameReviews]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const paragraphs = useMemo(
    () => processDescription(game?.description),
    [game?.description],
  );

  const shortDescription = paragraphs
    .slice(0, 2)
    .map((p) => `<p>${p}</p>`)
    .join('');

  const getDisplayDescription = () => {
    if (isExpanded) {
      return paragraphs.map((p) => `<p>${p}</p>`).join('');
    }
    return shortDescription;
  };

  if (isLoading || !game) return <PageLoader />;

  return (
    <div className='container'>
      <Breadcrumbs gameName={game?.name} />
      <section className={styles.gameDetails}>
        <div className={styles.gameDetails__сontent}>
          <div className={styles.gameDetails__imageBlock}>
            <img
              src={`${game.backgroundImage}`}
              alt={game.name}
              className={styles.gameDetails__image}
            />
          </div>

          <div className={styles.statusBtn__onMobile}>
            <StatusButtons
              variant='full'
              onAction={(status) => {
                if (!isAuthenticated) {
                  dispatch(setActiveModal('authPrompt'));
                  return;
                }
                updateStatus(status, currentStatus);
              }}
              activeStatus={currentStatus}
            />
          </div>

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
                    __html: getDisplayDescription(),
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

              <div className={styles.statusBtn__onDesktop}>
                <StatusButtons
                  variant='full'
                  onAction={(status) => {
                    if (!isAuthenticated) {
                      dispatch(setActiveModal('authPrompt'));
                      return;
                    }
                    updateStatus(status, currentStatus);
                  }}
                  activeStatus={currentStatus}
                />
              </div>
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
                  {game.genres
                    ?.map((g) => g.name[0] + g.name.slice(1).toLowerCase())
                    .join(', ') ?? 'N/A'}
                </p>
              </div>

              <div className={styles.gameDetails__detailGroup}>
                <h4 className={styles.gameDetails__detailTitle}>Creator</h4>
                <p className={`text-main ${styles.gameDetails__detailValue}`}>
                  {game.developers?.[0]?.name ?? 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.gameDetails__rateAction}>
          <h4 className={styles.gameDetails__rateActionTitle}>Your rate</h4>
          <GameRatingForm gameApiId={game.apiId} onSuccess={fetchGameReviews} />
        </div>

        {isCommentsLoading ? (
          <PageLoader />
        ) : (
          <GameReviews comments={comments} />
        )}
      </section>
    </div>
  );
};

export default GameDetails;
