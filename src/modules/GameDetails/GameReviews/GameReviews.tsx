import styles from './GameReviews.module.scss';
import { Button } from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { Review } from '@/components/Review/Review';
import { getGameComments } from '@/api/comments';
import type { UserComment } from '@/types/Comment';
import { Pagination } from '@/components/Pagination/Pagination';

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Скрол до заголовка коментарів, щоб користувач бачив початок списку
    const section = document.getElementById('reviews-list');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

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
            onClick={() => {
              setActiveTab(tab.value);
              setCurrentPage(1);
            }}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.reviews__list}>
            {currentComments.map((comment) => (
              <Review key={comment.id} review={comment} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className={styles.reviews__pagination}>
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};
