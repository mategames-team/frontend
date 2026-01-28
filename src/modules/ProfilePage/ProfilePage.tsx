import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './ProfilePage.module.scss';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { ProfileTabs } from './ProfileTabs/ProfileTabs';
import { GamesSection } from './GamesSection/GamesSection';
import { useAppSelector } from '@/store/hooks';
import { PageLoader } from '@/components/PageLoader/PageLoader';
import type { UserData } from '@/types/User';
import type { ProfileTab } from '@/types/profileTabs';
import type { GameStatus } from '@/types/Game';
import { getUserData } from '@/api/user-data';
import { getUserComments } from '@/api/comments';
import { AVATARS, getDefaultAvatar } from '@/utils/avatars';

const STATUS_MAP: Record<string, string> = {
  backlog: 'BACKLOG',
  in_progress: 'IN_PROGRESS',
  completed: 'COMPLETED',
};

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [seatchParams, setSearchParams] = useSearchParams();
  const [commentsCount, setCommentsCount] = useState(0);

  const {
    data: currentUser,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAppSelector((state) => state.user);

  const fetchCount = async () => {
    try {
      const response = await getUserComments(userId);
      setCommentsCount(response.length || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCommentsCount(0);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [userId]);

  const avatarSrc =
    currentUser?.avatarUrl && AVATARS[currentUser.avatarUrl]
      ? AVATARS[currentUser.avatarUrl]
      : getDefaultAvatar();

  const [displayedUser, setDisplayedUser] = useState<UserData | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        setIsDataLoading(true);
        try {
          const response = await getUserData(userId);

          setDisplayedUser(response);
        } catch (error) {
          console.error('User not found', error);
          setDisplayedUser(null);
        } finally {
          setIsDataLoading(false);
        }
      } else {
        setDisplayedUser(currentUser);
      }
    };

    fetchUserInfo();
  }, [userId, currentUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const activeTab = (seatchParams.get('tab') as ProfileTab) ?? 'backlog';

  if (isAuthLoading || isDataLoading) return <PageLoader />;

  if (!userId && !isAuthenticated) {
    return <div className='container'>Please log in to see your profile</div>;
  }

  return (
    <div className={styles.profile}>
      <div className='container'>
        <div className={styles.profile__content}>
          <ProfileHeader
            userData={displayedUser || ({} as UserData)}
            isOwnProfile={!userId}
            commentsCount={commentsCount}
            userAvatar={avatarSrc}
          />

          <ProfileTabs
            activeTab={activeTab}
            onChange={(tab: ProfileTab) => setSearchParams({ tab })}
          />

          <GamesSection
            status={STATUS_MAP[activeTab] as GameStatus}
            userId={userId}
            onCommentsLoaded={fetchCount}
            avatarUrl={avatarSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
