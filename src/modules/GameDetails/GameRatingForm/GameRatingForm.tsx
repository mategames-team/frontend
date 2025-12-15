import React, { useState } from 'react';
import styles from './GameRatingForm.module.scss';
import { Button } from '@/components/common/Button/Button';

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
    <section className={styles.diary}>
      <h4 className={styles.title}>Your rate</h4>

      <div className={styles.reviewSection}>
        <textarea
          className={styles.textArea}
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
  );
};
