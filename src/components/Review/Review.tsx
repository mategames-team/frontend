import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Review.module.scss';
import clsx from 'clsx';
import Edit from '@/assets/icons/edit.svg?react';
import Trash from '@/assets/icons/trash.svg?react';
import type { UserComment } from '@/types/Comment';
import { GameRatingForm } from '@/modules/GameDetails/GameRatingForm/GameRatingForm';
import { deleteComment } from '@/api/comments';
import { useAppSelector } from '@/store/hooks';
import { getRandomAvatar } from '@/utils/avatars';

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
  const [reviewAvatar] = useState(randomAvatar || getRandomAvatar());

  const { data: currentUser } = useAppSelector((state) => state.user);

  const isOwnReview = Number(currentUser?.id) === review.userId;

  const handleSuccess = () => {
    setIsEditing(false);
    onUpdate?.();
  };

  const handleDelete = async () => {
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

      {variant === 'profile' && !isEditing && isOwnReview && (
        <div className={styles.review__actions}>
          <button
            className={styles.review__actionBtn}
            onClick={() => setIsEditing(true)}
          >
            <Edit className={styles.review__actionIcon} />
          </button>
          <button className={styles.review__actionBtn} onClick={handleDelete}>
            <Trash className={styles.review__actionIcon} />
          </button>
        </div>
      )}
    </section>
  );
};
