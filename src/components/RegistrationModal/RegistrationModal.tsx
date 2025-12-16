import React, { useState, useEffect, useRef } from 'react';
import styles from './RegistrationModal.module.scss';
import { Button } from '../common/Button/Button';
import CloseIcon from '../../assets/icons/close.svg?react';
import EyeVisible from '../../assets/icons/eye-outline.svg?react';
import EyeInvisible from '../../assets/icons/eye-off.svg?react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

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

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;
    console.log(email, username, password, confirmPassword, '123');

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
    } else if (password.length < 6) {
      newErrors.password = 'Your password must contain at least 6 characters.';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    console.log('Form submitted:', { username, email, password });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onClose();
    } catch (error) {
      console.log('Error: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
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
        <h2 className={styles.modal__title}>Create an account</h2>

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
            <label htmlFor='username'>Username</label>
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
