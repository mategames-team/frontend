import styles from './ProfileHeader.module.scss';
import { Link } from 'react-router-dom';
import type { UserData } from '@/types/User';
import userAvatar from '@/assets/avatars-female/female-2.png';
import Location from '@/assets/icons/location.svg?react';
import Settings from '@/assets/icons/settings.svg?react';
import { getUserComments } from '@/api/comments';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  userData: UserData;
};

export const ProfileHeader: React.FC<Props> = ({ userData }) => {
  const [commentsCount, setCommentsCount] = useState<number>(0);

  const gamesStats = useMemo(() => {
    const userGames = userData?.userGames || [];

    return {
      backlog: userGames.filter((g) => g.status === 'BACKLOG').length,
      completed: userGames.filter((g) => g.status === 'COMPLETED').length,
    };
  }, [userData?.userGames]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getUserComments();
        setCommentsCount(comments.length);
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    };
    fetchComments();
  }, []);

  const stats = [
    { label: 'In backlog', value: gamesStats.backlog },
    { label: 'Reviews', value: commentsCount },
    { label: 'Completed', value: gamesStats.completed },
  ];

  return (
    <section className={styles.header}>
      <div className={styles.header__top}>
        <img
          src={userAvatar}
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
        <Link to='/profile/settings' className={styles.header__settings}>
          <Settings className={styles.header__settingsIcon} />
        </Link>
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
