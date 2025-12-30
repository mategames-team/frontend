import styles from './Review.module.scss';
import userAvatar from '@/assets/user-avatar-1.png';
import Like from '@/assets/icons/like.svg?react';
import Dislike from '@/assets/icons/dislike.svg?react';
import { useState } from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'profile';

export const Review: React.FC<{ variant?: Variant }> = ({
  variant = 'default',
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  return (
    <section className={styles.review}>
      <div className={styles.review__userInfo}>
        <img
          src={userAvatar}
          alt='User Avatar'
          className={styles.review__avatar}
        />
        <h4 className={styles.review__username}>Username</h4>
        <span className={styles.review__date}>2 days ago</span>
        {variant === 'profile' && (
          <span className={styles.review__game}>
            rated the game{' '}
            <span className={styles.gameName}>S.T.A.L.K.E.R</span>
          </span>
        )}
        <span className={styles.review__rating}>7.5</span>
      </div>
      <p className={clsx(styles.review__content, 'text-main')}>
        This game is a masterpiece! I loved every minute of it. The storyline
        was captivating, the characters were well-developed, and the gameplay
        was smooth and enjoyable. Highly recommended!
      </p>
      <div className={styles.review__vote}>
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
      </div>
    </section>
  );
};
