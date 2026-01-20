import styles from './AuthPromptModal.module.scss';
import CloseIcon from '@/assets/icons/close.svg?react';
import { Button } from '../common/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeAllModals, setActiveModal } from '@/store/slices/uiSlice';

export const AuthPromptModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector((state) => state.ui.activeModal);

  if (activeModal !== 'authPrompt') return null;

  return (
    <div className={styles.overlay} onClick={() => dispatch(closeAllModals())}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modal__close}
          onClick={() => dispatch(closeAllModals())}
        >
          <CloseIcon className={styles.modal__closeIcon} />
        </button>

        <div className={styles.modal__content}>
          <h2 className={styles.modal__title}>
            To open the portal in your library, log into the system.
          </h2>
          <div className={styles.actions}>
            <Button
              variant='secondary'
              className={styles.actionBtn}
              onClick={() => dispatch(setActiveModal('login'))}
            >
              Log in
            </Button>
            <Button
              variant='primary'
              className={styles.actionBtn}
              onClick={() => dispatch(setActiveModal('registration'))}
            >
              Create account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
