import { useEffect, useRef, useState } from 'react';
import { Button } from '../common/Button/Button';
import styles from './LoginModal.module.scss';
import CloseIcon from '../../assets/icons/close.svg?react';
import EyeVisible from '../../assets/icons/eye-outline.svg?react';
import EyeInvisible from '../../assets/icons/eye-off.svg?react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCurrentUser, loginUser } from '@/store/slices/user.thunks';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegistration: () => void;
}

interface FormErrors {
  email: string;
  password: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegistration,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  // Close the modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', { email, password });

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      console.log(result);
      dispatch(fetchCurrentUser());
      onClose();
    } catch (error) {
      console.log('Registration failed', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={handleOverlayMouseDown}
      role='dialog'
    >
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.modal__close} onClick={onClose}>
          <CloseIcon className={styles.modal__closeIcon} />
        </button>
        <h2 className={styles.modal__title}>Log in</h2>

        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.form__inputGroup}>
              <label htmlFor='email'>E-mail</label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={`${styles.form__input} ${
                  errors.email ? styles.form__inputError : ''
                }`}
                placeholder='Enter your e-mail'
              />
              {errors.email && (
                <p className={styles.form__error}>{errors.email}</p>
              )}
            </div>

            <div className={styles.form__inputGroup}>
              <label htmlFor='password'>Password</label>
              <div className={styles.form__inputWrapper}>
                <input
                  id='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  minLength={6}
                  className={`${styles.form__input} ${
                    errors.password ? styles.form__inputError : ''
                  }`}
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  className={styles.form__inputToggle}
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? (
                    <EyeInvisible className={styles.form__inputIcon} />
                  ) : (
                    <EyeVisible className={styles.form__inputIcon} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={styles.form__error}>{errors.password}</p>
              )}
            </div>

            <Button
              className={styles.form__button}
              type='submit'
              variant='primary'
              size='large'
              fullWidth={true}
              isLoading={isLoading}
            >
              Log in
            </Button>
          </form>
          <div className={styles.switchLink}>
            Do you not have an account?
            <button
              type='button'
              onClick={onSwitchToRegistration}
              className={styles.linkButton}
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
