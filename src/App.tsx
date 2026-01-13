import './styles/main.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useAppDispatch } from './store/hooks';
import { Suspense, useEffect, useState } from 'react';
import { setActiveModal } from './store/slices/uiSlice';
import { Loader } from './components/Loader/Loader';
import { PageLoader } from './components/PageLoader/PageLoader';

export const App = () => {
  const [firstVisit, setFirstVisit] = useState(
    !sessionStorage.getItem('hasVisited')
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstVisit) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('hasVisited', 'true');
        setFirstVisit(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [firstVisit]);

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

    // dispatch(fetchCurrentUser());
  }, []);

  if (firstVisit) return <Loader />;

  return (
    <div className='app'>
      <Header />

      <Suspense fallback={<PageLoader />}>
        <main className='main'>
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </div>
  );
};
