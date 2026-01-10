import styles from './Review.module.scss';
import userAvatar from '@/assets/avatars-female/female-4.png';
// import Like from '@/assets/icons/like.svg?react';
// import Dislike from '@/assets/icons/dislike.svg?react';
// import { useState } from 'react';
import clsx from 'clsx';
import type { UserComment } from '@/types/Comment';
import { Link } from 'react-router-dom';

type Variant = 'default' | 'profile';

interface Props {
  variant?: Variant;
  review: UserComment;
}

export const Review: React.FC<Props> = ({ variant = 'default', review }) => {
  // const [likeCount, setLikeCount] = useState(4);
  // const [dislikeCount, setDislikeCount] = useState(2);
  return (
    <section className={styles.review}>
      <div
        className={clsx(
          styles.review__userInfo,
          variant === 'profile' && styles['review__userInfo--profile']
        )}
      >
        <img
          src={userAvatar}
          alt='User Avatar'
          className={styles.review__avatar}
        />
        <h4 className={styles.review__username}>{review?.profileName}</h4>
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
      <p className={clsx(styles.review__content, 'text-main')}>
        {review?.text || 'No text'}
      </p>
      {/* <div className={styles.review__vote}>
        <button
          className={styles.review__voteBtn}
          onClick={() => setLikeCount((prev) => prev + 1)}
        >
          <Like className={styles.review__voteIcon} />
          <span className={styles.review__voteCount}>{likeCount}</span>
        </button>
        <button
          className={styles.review__voteBtn}
          onClick={() => setDislikeCount((prev) => prev + 1)}
        >
          <Dislike className={styles.review__voteIcon} />
          <span className={styles.review__voteCount}>{dislikeCount}</span>
        </button>
      </div> */}
    </section>
  );
};
