import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Loader } from './components/Loader/Loader';
import { useAppSelector } from './store/hooks';
import { useEffect } from 'react';

export const App = () => {
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);

    // dispatch(fetchCurrentUser());
  }, []);

  return (
    <div className=''>
      {isLoading && <Loader progress={99} />}

      <Header />

      <main className='main'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
