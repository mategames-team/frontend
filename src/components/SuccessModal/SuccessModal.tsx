import styles from './SuccessModal.module.scss';
import CloseIcon from '../../assets/icons/close.svg?react';
import Checkmark from '../../assets/icons/checkmark-succes.svg?react';
import { Button } from '../common/Button/Button';
import clsx from 'clsx';

interface SuccessModalProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  onClose: () => void;
}

export const SuccessModal = ({
  message,
  buttonText,
  onButtonClick,
  onClose,
}: SuccessModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modal__close} onClick={onClose}>
          <CloseIcon className={styles.modal__closeIcon} />
        </button>

        <div className={styles.modal__content}>
          <div className={styles.iconWrapper}>
            <Checkmark />
          </div>

          <p className={clsx(styles.text, 'text-main')}>{message}</p>

          <Button className={styles.actionBtn} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
