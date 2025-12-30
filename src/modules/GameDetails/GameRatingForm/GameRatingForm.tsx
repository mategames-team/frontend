import React, { useState } from 'react';
import styles from './GameRatingForm.module.scss';
import { Button } from '@/components/common/Button/Button';
import { RatingBars } from '@/components/RatingBars/RatingBars';
import clsx from 'clsx';

interface GameRatingFormProps {
  gameId: number;
  onSubmissionSuccess: () => void;
}

export const GameRatingForm: React.FC<GameRatingFormProps> = ({
  // gameId,
  onSubmissionSuccess,
}) => {
  const [reviewText, setReviewText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);

  const handleRatingSubmit = async () => {
    setIsLoading(true);

    try {
      // await sendRatingToBackend(gameId, rating, reviewText);

      onSubmissionSuccess();
      setReviewText('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h4 className={styles.title}>Your rate</h4>
      <section className={styles.diary}>
        <RatingBars onChange={setRating} value={rating} />

        <div className={styles.reviewSection}>
          <textarea
            className={clsx(styles.textArea, 'text-main')}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder='Share your mind'
          />

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
