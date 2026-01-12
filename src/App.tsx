import './styles/main.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { setActiveModal } from './store/slices/uiSlice';

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

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

  return (
    <div className=''>
      <Header />

      <main className='main'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
