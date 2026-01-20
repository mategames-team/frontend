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

  const validateForm = () => {
    const newErrors: FormErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    // Email
    if (!email) {
      newErrors.email = 'Please enter an email.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail is not valid.';
      isValid = false;
    }

    // Password
    if (!password) {
      newErrors.password = 'Please enter a password.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(loginUser({ email, password })).unwrap();

      await dispatch(fetchCurrentUser());
      onClose();
    } catch (error) {
      console.log('Login failed', error);
      const serverErrors: FormErrors = {
        email: '',
        password: '',
      };

      if (Array.isArray(error)) {
        error.forEach((err: string) => {
          if (err.includes(': ')) {
            const [field, message] = err.split(': ');
            if (field === 'email') serverErrors.email = message;
            if (field === 'password') serverErrors.password = message;
          } else {
            serverErrors.email = err;
            serverErrors.password = err;
          }
        });

        setErrors(serverErrors);
      } else {
        setErrors({
          email: 'An error occurred. Please try again.',
          password: 'An error occurred. Please try again.',
        });
      }
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
