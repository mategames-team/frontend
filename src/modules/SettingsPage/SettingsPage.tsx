import styles from './SettingsPage.module.scss';
import clsx from 'clsx';
import userAvatarMale1 from '@/assets/avatars-male/male-1.png';
import userAvatarMale2 from '@/assets/avatars-male/male-2.png';
import userAvatarMale3 from '@/assets/avatars-male/male-3.png';
import userAvatarMale4 from '@/assets/avatars-male/male-4.png';
import userAvatarMale5 from '@/assets/avatars-male/male-5.png';
import userAvatarFemale1 from '@/assets/avatars-female/female-1.png';
import userAvatarFemale2 from '@/assets/avatars-female/female-2.png';
import userAvatarFemale3 from '@/assets/avatars-female/female-3.png';
import userAvatarFemale4 from '@/assets/avatars-female/female-4.png';
import userAvatarFemale5 from '@/assets/avatars-female/female-5.png';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import ExitIcon from '@/assets/icons/exit.svg?react';
import { Button } from '@/components/common/Button/Button';

export const SettingsPage = () => {
  return (
    <section className={styles.settings}>
      <div className='container'>
        <div className={styles.settings__grid}>
          {/* About Me */}
          <section className={styles.settings__section}>
            <div className={styles.profileForm}>
              <h2 className={styles.settings__title}>About me</h2>

              <img
                src={userAvatarMale3}
                alt='User avatar'
                className={styles.profileForm__avatar}
              />

              <div className={styles.profileForm__changeAvatar}>
                <h4
                  className={clsx(
                    styles.settings__subtitle,
                    styles.profileForm__subtitle
                  )}
                >
                  Change avatar
                </h4>

                <div className={styles.profileForm__avatarsGrid}>
                  <img
                    src={userAvatarMale1}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarMale2}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarMale3}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarMale4}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarMale5}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarFemale1}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarFemale2}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarFemale3}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarFemale4}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                  <img
                    src={userAvatarFemale5}
                    alt='User avatar'
                    className={styles.profileForm__gridAvatar}
                  />
                </div>
              </div>

              <form
                className={styles.profileForm__form}
                onSubmit={(e) => e.preventDefault()}
              >
                <h4
                  className={clsx(
                    styles.settings__subtitle,
                    styles.profileForm__subtitle
                  )}
                >
                  Personal information
                </h4>

                <div className={styles.profileForm__field}>
                  <label
                    className={clsx(styles.profileForm__label, 'text-small')}
                  >
                    Username
                  </label>
                  <input
                    type='text'
                    placeholder='Username'
                    className={clsx(
                      styles.profileForm__input,
                      'text-secondary'
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
                    className={clsx(
                      styles.profileForm__input,
                      'text-secondary'
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
                    className={clsx(
                      styles.profileForm__textarea,
                      'text-secondary'
                    )}
                  />
                </div>

                <Button type='submit' className={styles.profileForm__submit}>
                  Save changes
                </Button>
              </form>
            </div>
          </section>

          {/* Privacy */}
          <section className={styles.settings__section}>
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
                    'text-secondary'
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
                    'text-secondary'
                  )}
                >
                  Other players can view your saved games/games you are
                  playing...
                </p>
              </div>

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
                    'text-secondary'
                  )}
                >
                  If you have a private account, other users can't see your
                  profile.
                </p>
              </div>
            </div>
          </section>

          {/* Password and Security */}
          <section className={styles.settings__section}>
            <div className={styles.settingsSecurity}>
              <h2 className={styles.settings__title}>Password and security</h2>
              <div className={styles.settingsSecurity__content}>
                <div className={styles.settingsSecurity__action}>
                  <h4 className={styles.settings__subtitle}>Change e-mail</h4>
                  <ArrowRight className={styles.settingsSecurity__arrow} />
                </div>
                <div className={styles.settingsSecurity__action}>
                  <h4 className={styles.settings__subtitle}>Change password</h4>
                  <ArrowRight className={styles.settingsSecurity__arrow} />
                </div>
              </div>
            </div>
          </section>

          {/* Logout */}
          <div className={styles.settings__logoutWrapper}>
            <button className={styles.logoutBtn}>
              <ExitIcon className={styles.logoutBtn__icon} />
              <span>Exit from account</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
