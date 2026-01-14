import styles from './GamesSection.module.scss';
import { useEffect, useState } from 'react';
import { getUserGames } from '@/api/user-games';
import { getUserComments } from '@/api/comments';
import type { GameDto, GameStatus } from '@/types/Game';
import type { UserComment } from '@/types/Comment';
import { Review } from '@/components/Review/Review';
import { GameCard } from '@/components/GameCard/GameCard';
import { PageLoader } from '@/components/PageLoader/PageLoader';

type Props = {
  status: GameStatus;
  userId?: string;
  onCommentsLoaded: () => void;
};

export const GamesSection: React.FC<Props> = ({
  status,
  userId,
  onCommentsLoaded,
}) => {
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (status) {
        const response = await getUserGames(status, userId);
        setGames(response);
        console.log(response);
      } else {
        const response = await getUserComments(userId);
        setReviews(response);
        setGames([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, userId]);

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
        <ul className={styles.games}>
          {games.map((game: GameDto) => (
            <GameCard
              key={game.id}
              game={game.gameDto}
              currentTabStatus={status}
              onStatusUpdated={() => handleRemoveFromLocalState(game.id)}
            />
          ))}
        </ul>
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
