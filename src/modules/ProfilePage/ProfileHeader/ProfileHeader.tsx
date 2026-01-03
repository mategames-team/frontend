import styles from './ProfileHeader.module.scss';
import userAvatar from '@/assets/avatars-female/female-2.png';
import Location from '@/assets/icons/location.svg?react';
import Settings from '@/assets/icons/settings.svg?react';
import { Link, useNavigate } from 'react-router-dom';

// import type { User } from '@/types/User';
import { logout, type UserData } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/hooks';

type Props = {
  userData: UserData | null;
};

const stats = [
  { label: 'Wishlist', value: 24 },
  { label: 'Reviews', value: 6 },
  { label: 'Passed', value: 10 },
];

export const ProfileHeader: React.FC<Props> = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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
          <div className={styles.header__locationWrapper}>
            <Location className={styles.header__locationIcon} />
            <span className={styles.header__location}>
              {userData?.location || ''}
            </span>
          </div>
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

      <div className={styles.actions}>
        <button className={styles.actions__btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};
