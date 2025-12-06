import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <div className=''>
      <Header />

      <main className=''>
        <Outlet />
      </main>
      {/* 🟣 TODO: Footer */}
    </div>
  );
};
