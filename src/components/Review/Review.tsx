import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Review.module.scss';
import clsx from 'clsx';
import Edit from '@/assets/icons/edit.svg?react';
import Trash from '@/assets/icons/trash.svg?react';
import type { UserComment } from '@/types/Comment';
import { GameRatingForm } from '@/modules/GameDetails/GameRatingForm/GameRatingForm';
import { deleteComment } from '@/api/comments';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getRandomAvatar } from '@/utils/avatars';
import { setActiveModal } from '@/store/slices/uiSlice';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';

interface Props {
  variant?: 'default' | 'profile';
  review: UserComment;
  onUpdate?: () => void;
  randomAvatar?: string;
}

export const Review: React.FC<Props> = ({
  variant = 'default',
  review,
  onUpdate,
  randomAvatar,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [reviewAvatar] = useState(randomAvatar || getRandomAvatar());
  const { data: currentUser } = useAppSelector((state) => state.user);
  const activeModal = useAppSelector((state) => state.ui.activeModal);
  const dispatch = useAppDispatch();

  const isOwnReview = Number(currentUser?.id) === review.userId;

  const handleSuccess = () => {
    setIsEditing(false);
    onUpdate?.();
    dispatch(setActiveModal('success'));
  };

  const confirmDelete = async () => {
    try {
      await deleteComment(review.id);
      onUpdate?.();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <section className={styles.review}>
      <div
        className={clsx(
          styles.review__userInfo,
          variant === 'profile' && styles['review__userInfo--profile'],
        )}
      >
        <img
          src={reviewAvatar}
          alt='User Avatar'
          className={styles.review__avatar}
        />
        <Link
          to={`/profile/${review?.userId}`}
          className={styles.review__usernameLink}
        >
          <h4 className={styles.review__username}>{review?.profileName}</h4>
        </Link>
        <span className={styles.review__date}>
          {review?.localDateTime.slice(0, 10)}
        </span>
        {variant === 'profile' && (
          <span className={styles.review__game}>
            rated the game{' '}
            <span className={styles.gameName}>
              <Link to={`/games/${review?.gameApiId}`}>{review?.gameName}</Link>
            </span>
          </span>
        )}
        <span className={styles.review__rating}>{review?.rating || 0}</span>
      </div>

      {isEditing ? (
        <GameRatingForm
          gameApiId={review?.gameApiId}
          reviewId={review?.id}
          initialText={review?.text}
          initialRating={review?.rating}
          onSuccess={handleSuccess}
        />
      ) : (
        <p className={clsx(styles.review__content, 'text-main')}>
          {review?.text || ''}
        </p>
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      {variant === 'profile' && !isEditing && isOwnReview && (
        <div className={styles.review__actions}>
          <button
            className={styles.review__actionBtn}
            onClick={() => setIsEditing(true)}
          >
            <Edit className={styles.review__actionIcon} />
          </button>
          <button
            className={styles.review__actionBtn}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash className={styles.review__actionIcon} />
          </button>
        </div>
      )}

      {activeModal === 'success' && (
        <SuccessModal
          message='Your review has been successfully changed.'
          buttonText='OK'
          onButtonClick={() => dispatch(setActiveModal(null))}
          onClose={() => dispatch(setActiveModal(null))}
        />
      )}
    </section>
  );
};
