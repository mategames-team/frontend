import { Button } from '@/components/common/Button/Button';
import styles from './GameReviews.module.scss';
import { useState } from 'react';
import { Review } from '@/components/common/Review/Review';

const REVIEW_TABS = [
  { label: 'less than 4', value: 'low' },
  { label: '4-6', value: 'medium' },
  { label: '6-8', value: 'high' },
  { label: '8+', value: 'best' },
];

export const GameReviews = () => {
  const [activeTab, setActiveTab] = useState<string>('');

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

      <div className={styles.reviews__list}>
        <Review />
        <Review />
        <Review />
      </div>
    </section>
  );
};
