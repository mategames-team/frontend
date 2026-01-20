import styles from './ChangePassword.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../common/Button/Button';
import CloseIcon from '../../assets/icons/close.svg?react';
import EyeVisible from '../../assets/icons/eye-outline.svg?react';
import EyeInvisible from '../../assets/icons/eye-off.svg?react';
import { useAppSelector } from '@/store/hooks';
import { patchUserPassword } from '@/api/user-data';
import { SuccessModal } from '../SuccessModal/SuccessModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export const ChangePassword: React.FC<Props> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatPassword, setIsRepeatPassword] = useState<string>('');

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isNewPassVisible, setIsNewPassVisible] = useState<boolean>(false);
  const [isConfirmPassdVisible, setIsRepeatPasswordVisible] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const { isLoading } = useAppSelector((state) => state.user);

  const handleFullClose = () => {
    setIsSuccess(false);
    setCurrentPassword('');
    setNewPassword('');
    setIsRepeatPassword('');
    onClose();
  };

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
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    };
    let isValid = true;

    if (!currentPassword) {
      newErrors.currentPassword = 'Please enter a current password.';
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = 'Please enter a new password.';
      isValid = false;
    }

    if (newPassword === currentPassword) {
      newErrors.newPassword = 'New password cannot be the same as current.';
      isValid = false;
    }

    if (!repeatPassword) {
      newErrors.repeatPassword = 'Please confirm new password.';
      isValid = false;
    }

    if (newPassword !== repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await patchUserPassword({
        currentPassword,
        newPassword,
        repeatPassword,
      });
      setIsSuccess(true);
    } catch (error) {
      console.log('Login failed', error);
      setErrors({
        currentPassword: 'Invalid password.',
        newPassword: 'Invalid password.',
        repeatPassword: 'Invalid password.',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={handleOverlayMouseDown}
      role='dialog'
    >
      {isSuccess ? (
        <SuccessModal
          message='Your password has been successfully changed.'
          buttonText='OK'
          onButtonClick={handleFullClose}
          onClose={handleFullClose}
        />
      ) : (
        <div className={styles.modal} ref={modalRef}>
          <button className={styles.modal__close} onClick={handleFullClose}>
            <CloseIcon className={styles.modal__closeIcon} />
          </button>
          <h2 className={styles.modal__title}>Change password</h2>

          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.form__inputGroup}>
                <label htmlFor='password'>Password</label>
                <div className={styles.form__inputWrapper}>
                  <input
                    id='password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    minLength={8}
                    className={`${styles.form__input} ${
                      errors.currentPassword ? styles.form__inputError : ''
                    }`}
                    placeholder='Current password'
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
                {errors.currentPassword && (
                  <p className={styles.form__error}>{errors.currentPassword}</p>
                )}
              </div>

              <div className={styles.form__inputGroup}>
                <label htmlFor='newPassword'>New password</label>
                <div className={styles.form__inputWrapper}>
                  <input
                    id='newPassword'
                    type={isNewPassVisible ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    minLength={8}
                    className={`${styles.form__input} ${
                      errors.newPassword ? styles.form__inputError : ''
                    }`}
                    placeholder='Enter your new password'
                  />
                  <button
                    type='button'
                    className={styles.form__inputToggle}
                    onClick={() => setIsNewPassVisible((prev) => !prev)}
                  >
                    {isNewPassVisible ? (
                      <EyeInvisible className={styles.form__inputIcon} />
                    ) : (
                      <EyeVisible className={styles.form__inputIcon} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className={styles.form__error}>{errors.newPassword}</p>
                )}
              </div>

              <div className={styles.form__inputGroup}>
                <label htmlFor='confirmPassword'>Confirm password</label>
                <div className={styles.form__inputWrapper}>
                  <input
                    id='confirmPassword'
                    type={isConfirmPassdVisible ? 'text' : 'password'}
                    value={repeatPassword}
                    onChange={(e) => {
                      setIsRepeatPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    minLength={8}
                    className={`${styles.form__input} ${
                      errors.repeatPassword ? styles.form__inputError : ''
                    }`}
                    placeholder='Confirm your password'
                  />
                  <button
                    type='button'
                    className={styles.form__inputToggle}
                    onClick={() => setIsRepeatPasswordVisible((prev) => !prev)}
                  >
                    {isConfirmPassdVisible ? (
                      <EyeInvisible className={styles.form__inputIcon} />
                    ) : (
                      <EyeVisible className={styles.form__inputIcon} />
                    )}
                  </button>
                </div>
                {errors.repeatPassword && (
                  <p className={styles.form__error}>{errors.repeatPassword}</p>
                )}
              </div>

              <div className={styles.form__buttonsGroup}>
                <Button
                  className={styles.form__button}
                  type='button'
                  variant='secondary'
                  size='large'
                  fullWidth={true}
                  onClick={handleFullClose}
                >
                  Cancel
                </Button>
                <Button
                  className={styles.form__button}
                  type='submit'
                  variant='primary'
                  size='large'
                  fullWidth={true}
                  isLoading={isLoading}
                >
                  Save password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
