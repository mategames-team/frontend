import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => {
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
