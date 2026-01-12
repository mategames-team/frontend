import styles from './ProfileTabs.module.scss';
import { Button } from '@/components/common/Button/Button';
import { PROFILE_TABS, type ProfileTab } from '@/types/profileTabs';

type Props = {
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
};

export const ProfileTabs: React.FC<Props> = ({ activeTab, onChange }) => {
  return (
    <nav className={styles.tabs}>
      {PROFILE_TABS.map((tab) => {
        return (
          <Button
            key={tab.value}
            variant={tab.value === activeTab ? 'primary' : 'secondary-white'}
            size='small'
            onClick={() => onChange(tab.value)}
            className={styles.tabs__item}
          >
            {tab.label}
          </Button>
        );
      })}
    </nav>
  );
};
