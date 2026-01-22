import styles from './GamesSection.module.scss';
import { useEffect, useState } from 'react';
import { getUserGames } from '@/api/user-games';
import { getUserComments } from '@/api/comments';
import type { GameDto, GameStatus } from '@/types/Game';
import type { UserComment } from '@/types/Comment';
import { Review } from '@/components/Review/Review';
import { GameCard } from '@/components/GameCard/GameCard';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';

type Props = {
  status: GameStatus;
  userId?: string;
  onCommentsLoaded: () => void;
  randomAvatar: string;
};

export const GamesSection: React.FC<Props> = ({
  status,
  userId,
  onCommentsLoaded,
  randomAvatar,
}) => {
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
    setIsExpanded(false);
  }, [status, userId]);

  const visibleGames = isExpanded ? games : games.slice(0, 4);

  const handleRemoveFromLocalState = (id: number): void => {
    setGames((prev) => {
      const newList = prev.filter((g: GameDto) => g.id !== id);
      return newList;
    });
  };

  if (isLoading) return <PageLoader />;

  return (
    <>
      {status ? (
        <div className={styles.sectionContainer}>
          {games.length > 5 && (
            <div className={styles.headerActions}>
              <button
                className={styles.viewAllBtn}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'View all'}
                <ArrowRight className={styles.arrowIcon} />
              </button>
            </div>
          )}

          <ul className={styles.games}>
            {visibleGames.map((game: GameDto) => (
              <GameCard
                key={game.id}
                game={game.gameDto}
                size='large'
                currentTabStatus={status}
                onStatusUpdated={() => handleRemoveFromLocalState(game.id)}
              />
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
                randomAvatar={randomAvatar}
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
