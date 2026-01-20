import { useState } from 'react';
import styles from './GameRatingForm.module.scss';
import clsx from 'clsx';
import { Button } from '@/components/common/Button/Button';
import { RatingBars } from '@/components/RatingBars/RatingBars';
import { createComment, updateComment } from '@/api/comments';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthPromptModal } from '@/components/AuthPromptModal/AuthPromptModal';
import { closeAllModals, setActiveModal } from '@/store/slices/uiSlice';
import { RegistrationModal } from '@/components/RegistrationModal/RegistrationModal';
import { LoginModal } from '@/components/LoginModal/LoginModal';

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

  const { isAuthenticated } = useAppSelector((state) => state.user);
  const activeModal = useAppSelector((state) => state.ui.activeModal);
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeAllModals());

  const handleRatingSubmit = async () => {
    if (!isAuthenticated) {
      dispatch(setActiveModal('authPrompt'));
      return;
    }

    setIsLoading(true);
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

      {activeModal === 'authPrompt' && <AuthPromptModal />}
      {activeModal === 'login' && (
        <LoginModal
          isOpen={true}
          onClose={close}
          onSwitchToRegistration={() =>
            dispatch(setActiveModal('registration'))
          }
        />
      )}
      {activeModal === 'registration' && (
        <RegistrationModal
          isOpen={true}
          onClose={close}
          onSwitchToLogin={() => dispatch(setActiveModal('login'))}
        />
      )}
    </>
  );
};
