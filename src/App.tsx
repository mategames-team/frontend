import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Loader } from './components/Loader/Loader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { fetchCurrentUser } from './store/slices/user.thunks';
import { Button } from './components/common/Button/Button';
import { fetchMe } from './api/auth';

export const App = () => {
  const { isLoading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (
    <div className=''>
      <Button variant='primary' onClick={() => fetchMe()}>
        FETCH ME
      </Button>
      {isLoading && <Loader progress={99} />}

      <Header />

      <main className='main'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
