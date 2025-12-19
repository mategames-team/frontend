import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Loader } from './components/Loader/Loader';
import { useAppSelector } from './store/hooks';

export const App = () => {
  const { isLoading } = useAppSelector((state) => state.user);

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
