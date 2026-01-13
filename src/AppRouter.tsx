import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './modules/NotFoundPage';
import { SettingsPage } from './modules/SettingsPage/SettingsPage';
import { ProtectedRoute } from './modules/ProtectedRoute/ProtectedRoute';

const HomePage = lazy(() => import('@/modules/HomePage/HomePage'));
const CatalogPage = lazy(() => import('@/modules/CatalogPage/CatalogPage'));
const GameDetails = lazy(() => import('@/modules/GameDetails/GameDetails'));
const ProfilePage = lazy(() => import('@/modules/ProfilePage/ProfilePage'));

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/catalogue' element={<CatalogPage />} />
        <Route path='/games/:gameId' element={<GameDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/settings' element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path='/home' element={<Navigate to='/' replace />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
