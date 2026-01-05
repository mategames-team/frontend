import styles from './GameReviews.module.scss';
import { Button } from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { Review } from '@/components/Review/Review';
import { getGameComments } from '@/api/comments';
import type { UserComment } from '@/types/Comment';

const REVIEW_TABS = [
  { label: 'less than 4', value: 'low' },
  { label: '4-6', value: 'medium' },
  { label: '6-8', value: 'high' },
  { label: '8+', value: 'best' },
];

export const GameReviews: React.FC<{ gameApiId: number }> = ({ gameApiId }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGameReviews = async () => {
      setIsLoading(true);

      try {
        const response = await getGameComments(gameApiId);
        setComments(response);
      } catch (error) {
        console.error('Error fetching game reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameReviews();
  }, []);

  return (
    <section className={styles.reviews}>
      <h4 className={styles.reviews__title}>Comments (25)</h4>
      <div className={styles.reviews__filter}>
        {REVIEW_TABS.map((tab) => (
          <Button
            variant={tab.value === activeTab ? 'primary' : 'secondary-white'}
            size='small'
            key={tab.value}
            className={styles.reviews__tab}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.reviews__list}>
          {comments.map((comment) => (
            <Review key={comment.id} review={comment} />
          ))}
        </div>
      )}
    </section>
  );
};
