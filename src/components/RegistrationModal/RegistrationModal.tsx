import React, { useState, useEffect, useRef } from 'react';
import styles from './RegistrationModal.module.scss';
import { Button } from '../common/Button/Button';
import CloseIcon from '../../assets/icons/close.svg?react';
import EyeVisible from '../../assets/icons/eye-outline.svg?react';
import EyeInvisible from '../../assets/icons/eye-off.svg?react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/slices/user.thunks';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { setActiveModal } from '@/store/slices/uiSlice';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

interface FormErrors {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

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
  // Close the modal
  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
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

    // Username
    if (!username) {
      newErrors.username = 'Please enter a username.';
      isValid = false;
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
      isValid = false;
    }

    // Password
    if (!password) {
      newErrors.password = 'Please enter a password.';
      isValid = false;
    } else if (password.length < 8 && password.length > 25) {
      newErrors.password = 'Password must be between 8 and 25 digits';
      isValid = false;
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm a password.';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Password visibility
  const togglePasswordVisibility = (field: 'password' | 'confirm') => {
    if (field === 'password') {
      setIsPasswordVisible((prev) => !prev);
    } else {
      setIsConfirmPasswordVisible((prev) => !prev);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(
        registerUser({
          email,
          profileName: username,
          password,
          repeatPassword: confirmPassword,
        }),
      ).unwrap();

      setIsRegistered(true);
      dispatch(setActiveModal('success'));
    } catch (error) {
      console.log('Registration failed', error);
      const serverErrors: FormErrors = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      };

      if (Array.isArray(error)) {
        error.forEach((err: string) => {
          const lowerErr = err.toLowerCase();

          if (lowerErr.includes('email')) {
            serverErrors.email = err;
          } else if (
            lowerErr.includes('username') ||
            lowerErr.includes('profile')
          ) {
            serverErrors.username = err;
          } else if (lowerErr.includes('password')) {
            if (
              lowerErr.includes('repeat') ||
              lowerErr.includes('confirm') ||
              lowerErr.includes('match')
            ) {
              serverErrors.confirmPassword = err;
            } else {
              serverErrors.password = err;
            }
          }
        });

        setErrors(serverErrors);
      }
    }
  };

  if (!isOpen) return null;

  if (isRegistered) {
    return (
      <SuccessModal
        message='You have successfully registered'
        buttonText='Go to login'
        onButtonClick={onSwitchToLogin}
        onClose={onClose}
      />
    );
  }

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
        <h2 className={styles.modal__title}>Create account</h2>

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
            <label htmlFor='username'>Nickname</label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: '' }));
              }}
              className={`${styles.form__input} ${
                errors.username ? styles.form__inputError : ''
              }`}
              placeholder='Enter your username'
            />
            {errors.username && (
              <p className={styles.form__error}>{errors.username}</p>
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
                onClick={() => togglePasswordVisibility('password')}
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

          <div className={styles.form__inputGroup}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <div className={styles.form__inputWrapper}>
              <input
                id='confirmPassword'
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                minLength={6}
                className={`${styles.form__input} ${
                  errors.confirmPassword ? styles.form__inputError : ''
                }`}
                placeholder='Confirm your password'
              />
              <button
                type='button'
                className={styles.form__inputToggle}
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {isConfirmPasswordVisible ? (
                  <EyeInvisible className={styles.form__inputIcon} />
                ) : (
                  <EyeVisible className={styles.form__inputIcon} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={styles.form__error}>{errors.confirmPassword}</p>
            )}
          </div>

          <p className={styles.form__info}>
            By clicking "Create account", you agree to our terms of use and
            privacy policy.
          </p>

          <Button
            className={styles.form__button}
            type='submit'
            variant='primary'
            size='large'
            fullWidth={true}
            isLoading={isLoading}
          >
            Create account
          </Button>
        </form>

        <div className={styles.switchLink}>
          Do you have an account?
          <button
            type='button'
            onClick={onSwitchToLogin}
            className={styles.linkButton}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
