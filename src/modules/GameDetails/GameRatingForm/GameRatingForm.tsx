import React, { useState } from 'react';
import styles from './GameRatingForm.module.scss';
import { Button } from '@/components/common/Button/Button';
import { RatingBars } from '@/components/RatingBars/RatingBars';
import clsx from 'clsx';
import { createComment, updateComment } from '@/api/comments';
import { useAppSelector } from '@/store/hooks';

interface Props {
  gameApiId: number;
  reviewId?: number;
  onSuccess?: () => void;
  initialText?: string;
  initialRating?: number;
}

export const GameRatingForm: React.FC<Props> = ({
  gameApiId,
  reviewId,
  onSuccess,
  initialText,
  initialRating,
}) => {
  const [rating, setRating] = useState<number>(initialRating || 0);
  const [reviewText, setReviewText] = useState<string>(initialText || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const handleRatingSubmit = async () => {
    setIsLoading(true);

    if (!isAuthenticated) {
      setError('You must be logged in to submit a review.');
      return;
    }

    try {
      if (reviewId) {
        await updateComment(reviewId, reviewText, rating);
      } else {
        await createComment(gameApiId, reviewText, rating);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className={styles.diary}>
        <RatingBars onChange={setRating} value={rating} />

        <div className={styles.reviewSection}>
          <textarea
            className={clsx(
              styles.textArea,
              'text-main',
              error && styles.textArea_error
            )}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder='Share your mind'
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttonWrapper}>
            <Button
              variant='primary'
              size='small'
              isLoading={isLoading}
              onClick={handleRatingSubmit}
            >
              Post
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
