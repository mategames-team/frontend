import './styles/main.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { RegistrationModal } from './components/RegistrationModal/RegistrationModal';
import { LoginModal } from './components/LoginModal/LoginModal';
import { useEffect, useRef, useState } from 'react';

type ActiveModal = 'registration' | 'login' | null;

const getInitialModalState = (): ActiveModal => {
  const path = window.location.pathname;

  if (path === '/registration') {
    return 'registration';
  }
  if (path === '/login') {
    return 'login';
  }
  return null;
};

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocationRef = useRef<string>('/');

  const [activeModal, setActiveModal] =
    useState<ActiveModal>(getInitialModalState);

  useEffect(() => {
    const path = location.pathname;

    if (!path.endsWith('/registration') && !path.endsWith('/login')) {
      backgroundLocationRef.current = path + location.search;
    }
  }, [location.pathname, location.search, activeModal]);

  const openModal = (modalType: ActiveModal) => {
    setActiveModal(modalType);

    if (modalType) {
      navigate(`/${modalType}`, { replace: true });
    }
  };

  const closeModal = () => {
    setActiveModal(null);

    const pathToReturn = backgroundLocationRef.current;

    navigate(pathToReturn, { replace: true });
  };

  return (
    <div className=''>
      <Header
        onOpenRegistration={() => openModal('registration')}
        onOpenLogin={() => openModal('login')}
      />

      <main className='main'>
        <Outlet />
      </main>

      <RegistrationModal
        isOpen={activeModal === 'registration'}
        onClose={closeModal}
        onSwitchToLogin={() => openModal('login')}
      />
      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={closeModal}
        onSwitchToRegistration={() => openModal('registration')}
      />

      {/* 🟣 TODO: Footer */}
    </div>
  );
};
