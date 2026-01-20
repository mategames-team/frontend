import styles from './DeleteConfirmationModal.module.scss';
import CloseIcon from '../../assets/icons/close.svg?react';
import { Button } from '../common/Button/Button';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmationModal: React.FC<Props> = ({
  onConfirm,
  onClose,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modal__close} onClick={onClose}>
          <CloseIcon className={styles.modal__closeIcon} />
        </button>

        <div className={styles.modal__content}>
          <h2 className={styles.modal__title}>Do you want to delete review?</h2>

          <div className={styles.actions}>
            <Button
              variant='secondary'
              className={styles.actionBtn}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              variant='primary'
              className={styles.actionBtn}
              onClick={handleConfirm}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
