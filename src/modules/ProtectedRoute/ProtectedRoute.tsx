import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to='/?auth=login' replace />;
  }

  return <Outlet />;
};
