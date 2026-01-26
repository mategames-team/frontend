import styles from './SettingsPage.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import ExitIcon from '@/assets/icons/exit.svg?react';
import { Button } from '@/components/common/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, setLocalAvatar } from '@/store/slices/userSlice';
import { updateProfile } from '@/store/slices/user.thunks';
import { ChangePassword } from '@/components/ChangePassword/ChangePassword';
import { Breadcrumbs } from '@/components/common/Breadcrumps/Breadcrumps';
import { AVATARS } from '@/utils/avatars';

export const SettingsPage = () => {
  const { data, isLoading } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState<string>(data?.profileName || '');
  const [location, setLocation] = useState<string>(data?.location || '');
  const [about, setAbout] = useState<string>(data?.about || '');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    data?.avatarUrl || 'male-1.png',
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const updateState = () => {
      setUsername(data?.profileName || '');
      setLocation(data?.location || '');
      setAbout(data?.about || '');
      setSelectedAvatar(data?.avatarUrl || 'male-1.png');
    };

    if (data) {
      updateState();
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(setLocalAvatar(selectedAvatar));
      await dispatch(
        updateProfile({
          profileName: username,
          about,
          location,
        }),
      ).unwrap();
    } catch (error) {
      console.log('updateUserData error:', error);
    }
  };

  const isChanged =
    username !== (data?.profileName || '') ||
    location !== (data?.location || '') ||
    about !== (data?.about || '') ||
    selectedAvatar !== (data?.avatarUrl || 'default-avatar.png');

  return (
    <section className={styles.settings}>
      <div className='container'>
        <Breadcrumbs />
        <div className={styles.settings__grid}>
          {/* About Me */}
          <section className={styles.settings__section}>
            <div className={styles.profileForm}>
              <h2 className={styles.settings__title}>About me</h2>

              <img
                src={AVATARS[selectedAvatar] || AVATARS['default-avatar.png']}
                alt='User avatar'
                className={styles.profileForm__avatar}
              />

              <div className={styles.profileForm__changeAvatar}>
                <h4
                  className={clsx(
                    styles.settings__subtitle,
                    styles.profileForm__subtitle,
                  )}
                >
                  Change avatar
                </h4>

                <div className={styles.profileForm__avatarsGrid}>
                  {Object.entries(AVATARS)
                    .slice(1)
                    .map(([name, path]) => (
                      <img
                        key={name}
                        src={path}
                        alt={name}
                        onClick={() => setSelectedAvatar(name)}
                        className={clsx(
                          styles.profileForm__gridAvatar,
                          selectedAvatar === name &&
                            styles.profileForm__gridAvatar_active,
                        )}
                      />
                    ))}
                </div>
              </div>

              <form
                className={styles.profileForm__form}
                onSubmit={handleSubmit}
              >
                <h4
                  className={clsx(
                    styles.settings__subtitle,
                    styles.profileForm__subtitle,
                  )}
                >
                  Personal information
                </h4>

                <div className={styles.profileForm__field}>
                  <label
                    className={clsx(styles.profileForm__label, 'text-small')}
                  >
                    My nickname
                  </label>
                  <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={clsx(
                      styles.profileForm__input,
                      'text-secondary',
                    )}
                  />
                </div>

                <div className={styles.profileForm__field}>
                  <label
                    className={clsx(styles.profileForm__label, 'text-small')}
                  >
                    Location
                  </label>
                  <input
                    type='text'
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={clsx(
                      styles.profileForm__input,
                      'text-secondary',
                    )}
                  />
                </div>

                <div className={styles.profileForm__field}>
                  <label
                    className={clsx(styles.profileForm__label, 'text-small')}
                  >
                    About me
                  </label>
                  <textarea
                    placeholder='Tell something about yourself'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className={clsx(
                      styles.profileForm__textarea,
                      'text-secondary',
                    )}
                  />
                </div>

                <Button
                  type='submit'
                  className={styles.profileForm__submit}
                  disabled={!isChanged || isLoading}
                >
                  Save
                </Button>
              </form>
            </div>
          </section>

          {/* Privacy */}
          {/* <section className={styles.settings__section}>
            <h2 className={styles.settings__title}>Privacy</h2>
            <div className={styles.settingsPrivacy}>
              <div className={styles.settingsPrivacy__item}>
                <div className={styles.settingsPrivacy__header}>
                  <h4 className={styles.settings__subtitle}>Private account</h4>
                  <label className={styles.switch}>
                    <input type='checkbox' />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p
                  className={clsx(
                    styles.settingsPrivacy__description,
                    'text-secondary',
                  )}
                >
                  If you have a private account, other users can't see your
                  profile.
                </p>
              </div>

              <div className={styles.settingsPrivacy__item}>
                <div className={styles.settingsPrivacy__header}>
                  <h4 className={styles.settings__subtitle}>
                    Show game library
                  </h4>
                  <label className={styles.switch}>
                    <input type='checkbox' defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p
                  className={clsx(
                    styles.settingsPrivacy__description,
                    'text-secondary',
                  )}
                >
                  Other players can view your saved games/games you are
                  playing...
                </p>
              </div>

              <div className={styles.settingsPrivacy__item}>
                <div className={styles.settingsPrivacy__header}>
                  <h4 className={styles.settings__subtitle}>Show reviews and ratings</h4>
                  <label className={styles.switch}>
                    <input type='checkbox' />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p
                  className={clsx(
                    styles.settingsPrivacy__description,
                    'text-secondary',
                  )}
                >
                  Other players can view your reviews and ratings in your profile.
                </p>
              </div>
            </div>
          </section> */}

          {/* Password and Security */}
          <section className={styles.settings__section}>
            <div className={styles.settingsSecurity}>
              <h2 className={styles.settings__title}>Password and security</h2>
              <div className={styles.settingsSecurity__content}>
                <div
                  className={styles.settingsSecurity__action}
                  onClick={() => setIsModalOpen(true)}
                >
                  <h4 className={styles.settings__subtitle}>Change password</h4>
                  <ArrowRight className={styles.settingsSecurity__arrow} />
                </div>
              </div>
            </div>
          </section>

          {/* Logout */}
          <div className={styles.settings__logoutWrapper}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <ExitIcon className={styles.logoutBtn__icon} />
              <span>Exit from account</span>
            </button>
          </div>

          <ChangePassword
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </section>
  );
};
