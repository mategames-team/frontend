import styles from './ProfilePage.module.scss';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { ProfileTabs } from './ProfileTabs/ProfileTabs';
import { GamesSection } from './GamesSection/GamesSection';
import { useSearchParams } from 'react-router-dom';
import type { ProfileTab } from '@/types/profileTabs';
import { useAppSelector } from '@/store/hooks';
import type { GameStatus } from '@/types/Game';

const STATUS_MAP: Record<string, string> = {
  backlog: 'BACKLOG',
  in_progress: 'IN_PROGRESS',
  completed: 'COMPLETED',
};

export const ProfilePage = () => {
  const [seatchParams, setSearchParams] = useSearchParams();
  const { data, isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    console.log('Not authenticated');
  }

  const activeTab = (seatchParams.get('tab') as ProfileTab) ?? 'backlog';

  return (
    <div className={styles.profile}>
      <div className='container'>
        <div className={styles.profile__content}>
          <ProfileHeader userData={data ?? {}} />

          <ProfileTabs
            activeTab={activeTab}
            onChange={(tab: ProfileTab) => setSearchParams({ tab })}
          />

          <GamesSection status={STATUS_MAP[activeTab] as GameStatus} />
        </div>
      </div>
    </div>
  );
};
