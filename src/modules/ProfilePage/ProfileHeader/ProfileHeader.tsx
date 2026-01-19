import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileHeader.module.scss';
import type { UserData } from '@/types/User';
import Location from '@/assets/icons/location.svg?react';
import Settings from '@/assets/icons/settings.svg?react';

type Props = {
  userData: UserData;
  isOwnProfile: boolean;
  commentsCount: number;
  randomAvatar: string;
};

export const ProfileHeader: React.FC<Props> = ({
  userData,
  isOwnProfile,
  commentsCount,
  randomAvatar,
}) => {
  const gamesStats = useMemo(() => {
    const userGames = userData?.userGames || [];

    return {
      backlog: userGames.filter((g) => g.status === 'BACKLOG').length,
      completed: userGames.filter((g) => g.status === 'COMPLETED').length,
    };
  }, [userData?.userGames]);

  const stats = [
    { label: 'In backlog', value: gamesStats.backlog },
    { label: 'Reviews', value: commentsCount },
    { label: 'Completed', value: gamesStats.completed },
  ];

  return (
    <section className={styles.header}>
      <div className={styles.header__top}>
        <img
          src={userData?.avatarUrl || randomAvatar}
          alt='Profile Avatar'
          className={styles.header__avatar}
        />
        <div className={styles.header__info}>
          <h2 className={styles.header__username}>{userData?.profileName}</h2>
          {userData?.location && (
            <div className={styles.header__locationWrapper}>
              <Location className={styles.header__locationIcon} />
              <span className={styles.header__location}>
                {userData?.location || ''}
              </span>
            </div>
          )}
        </div>

        {isOwnProfile && (
          <Link to='/profile/settings' className={styles.header__settings}>
            <Settings className={styles.header__settingsIcon} />
          </Link>
        )}
      </div>

      <h4 className={styles.bio}>{userData?.about || 'No bio yet...'}</h4>

      <div className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stats__item}>
            <h4 className={styles.stats__value}>{stat.value}</h4>
            <span className={styles.stats__label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
