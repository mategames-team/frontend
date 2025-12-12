import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { ProfilePage } from './modules/ProfilePage/ProfilePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { GameDetails } from './modules/GameDetails/GameDetails';
import { App } from './App';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/games/:gameId' element={<GameDetails />} />
      </Route>

      <Route path='/home' element={<Navigate to='/' replace />} />

      {/* 404 page */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
