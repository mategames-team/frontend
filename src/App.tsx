import './styles/main.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Suspense, useEffect, useState } from 'react';
import { setActiveModal } from './store/slices/uiSlice';
import { Loader } from './components/Loader/Loader';
import { PageLoader } from './components/PageLoader/PageLoader';
import { fetchCurrentUser } from './store/slices/user.thunks';
import { AuthPromptModal } from './components/AuthPromptModal/AuthPromptModal';

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.ui);

  const isFirstVisit = !sessionStorage.getItem('hasVisited');
  const [isInitializing, setIsInitializing] = useState(isFirstVisit);

  useEffect(() => {
    if (isFirstVisit) {
      Promise.all([
        dispatch(fetchCurrentUser()),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]).then(() => {
        sessionStorage.setItem('hasVisited', 'true');
        setIsInitializing(false);
      });
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('auth') === 'login') {
      dispatch(setActiveModal('login'));

      const newParams = new URLSearchParams(searchParams);
      newParams.delete('auth');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, dispatch, setSearchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isInitializing) return <Loader />;

  return (
    <div className='app'>
      <Header />

      <Suspense fallback={<PageLoader />}>
        <main className='main'>
          <Outlet />
        </main>
      </Suspense>
      <Footer />

      {activeModal === 'authPrompt' && <AuthPromptModal />}
    </div>
  );
};
