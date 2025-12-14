import styles from './ProfilePage.module.scss';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { ProfileTabs } from './ProfileTabs/ProfileTabs';
import { GamesSection } from './GamesSection/GamesSection';
import { useSearchParams } from 'react-router-dom';
import type { ProfileTab } from '@/types/profileTabs';

export const ProfilePage = () => {
  const [seatchParams, setSearchParams] = useSearchParams();

  const activeTab = (seatchParams.get('tab') as ProfileTab) ?? 'backlog';

  return (
    <div className={styles.profile}>
      <div className='container'>
        <div className={styles.profile__content}>
          <ProfileHeader />

          <ProfileTabs
            activeTab={activeTab}
            onChange={(tab: ProfileTab) => setSearchParams({ tab })}
          />

          <GamesSection activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};
