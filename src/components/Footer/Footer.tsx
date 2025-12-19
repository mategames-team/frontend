import styles from './Footer.module.scss';
import { NavLinks } from '../common/NavLinks/NavLinks';
import { Logo } from '../common/Logo/Logo';
import { Button } from '../common/Button/Button';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footer__content}>
          <div className={styles.footer__top}>
            <div className={styles.footer__navigation}>
              <Logo />
              <NavLinks links={['catalogue', 'profile']} />
            </div>
            <div className={styles.footer__newsletter}>
              <h4 className={styles.footer__newsletterTitle}>
                Follow our news
              </h4>
              <form className={styles.footer__newsletterForm} action=''>
                <input
                  type='email'
                  placeholder='Your email'
                  className={styles.input}
                />
                <Button variant='primary'>Send</Button>
              </form>
            </div>
          </div>
          <div className={styles.footer__policy}>
            <NavLinks links={['Cookies policy', 'Privacy policy']} />
          </div>
        </div>
      </div>
    </footer>
  );
};
