import styles from './GamesSection.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { getUserGames } from '@/api/user-games';
import { getUserComments } from '@/api/comments';
import type { GameDto, GameStatus } from '@/types/Game';
import type { UserComment } from '@/types/Comment';
import { Review } from '@/components/Review/Review';
import { GameCard } from '@/components/GameCard/GameCard';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import { clsx } from 'clsx';

type Props = {
  status: GameStatus;
  userId?: string;
  onCommentsLoaded: () => void;
  avatarUrl: string;
};

const VISIBLE_COUNT = 4;

export const GamesSection: React.FC<Props> = ({
  status,
  userId,
  onCommentsLoaded,
  avatarUrl,
}) => {
  const [games, setGames] = useState<GameDto[]>([]);
  const [reviews, setReviews] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (status) {
        const response = await getUserGames(status, userId);
        setGames(response);
      } else {
        const response = await getUserComments(userId);
        setReviews(response);
        setGames([]);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [status, userId]);

  useEffect(() => {
    fetchData();
    setIsExpanded(false);
  }, [fetchData]);

  const visibleGames = isExpanded ? games : games.slice(0, VISIBLE_COUNT);

  const handleRemoveFromLocalState = (id: number): void => {
    setGames((prev) => {
      const newList = prev.filter((g) => g.id !== id);
      return newList;
    });
  };

  if (isLoading) return <PageLoader />;

  return (
    <>
      {status ? (
        <div className={styles.sectionContainer}>
          {games.length > VISIBLE_COUNT && (
            <div className={styles.headerActions}>
              <button
                className={styles.viewAllBtn}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'View all'}
                <ArrowRight
                  className={clsx(
                    styles.arrowIcon,
                    isExpanded && styles.arrowIcon__expanded,
                  )}
                />
              </button>
            </div>
          )}

          <ul className={styles.games}>
            {visibleGames.map((game, index) => (
              <li
                key={game.id}
                className={styles.gameItem}
                style={{ animationDelay: `${(index % VISIBLE_COUNT) * 0.05}s` }}
              >
                <GameCard
                  key={game.id}
                  game={game.gameDto}
                  size='large'
                  currentTabStatus={status}
                  onStatusUpdated={() => handleRemoveFromLocalState(game.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.reviewsList}>
          {reviews.length > 0 ? (
            reviews.map((review: UserComment) => (
              <Review
                key={review.id}
                review={review}
                variant='profile'
                onUpdate={() => {
                  fetchData();
                  onCommentsLoaded();
                }}
                avatarUrl={avatarUrl}
              />
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      )}
    </>
  );
};
