import { useMemo, useState } from 'react';
import styles from './GameReviews.module.scss';
import { Button } from '@/components/common/Button/Button';
import { Review } from '@/components/Review/Review';
import { Pagination } from '@/components/Pagination/Pagination';
import type { UserComment } from '@/types/Comment';

type Props = {
  gameApiId?: string;
  comments: UserComment[];
};

const REVIEW_TABS = [
  { label: 'All', value: '' },
  { label: 'less than 4', value: 'low' },
  { label: '4-6', value: 'medium' },
  { label: '6-8', value: 'high' },
  { label: '8+', value: 'best' },
];

export const GameReviews: React.FC<Props> = ({ comments }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const processedComments = useMemo(() => {
    let filtered = [...comments];

    if (activeTab) {
      filtered = filtered.filter((comment) => {
        const r = comment.rating;
        if (activeTab === 'low') return r < 4;
        if (activeTab === 'medium') return r >= 4 && r <= 6;
        if (activeTab === 'high') return r >= 6 && r <= 8;
        if (activeTab === 'best') return r >= 8;
        return true;
      });
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.localDateTime).getTime() -
        new Date(a.localDateTime).getTime(),
    );
  }, [comments, activeTab]);

  const totalPages = Math.ceil(processedComments.length / itemsPerPage);
  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = processedComments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById('reviews-list');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.reviews}>
      <h4 className={styles.reviews__title}>Comments ({comments.length})</h4>
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
    </section>
  );
};
